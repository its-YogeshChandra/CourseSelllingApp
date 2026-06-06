use std::path::Path;
use mongodb::bson::{doc, Document};
use mongodb::Collection;
use reqwest::Client;
use tracing::{info, warn};

use crate::cloudinary::upload_to_cloudinary;
use crate::config::Config;
use crate::models::{JobPayload, VideoProcessingResult};

/// Process a single video job:
///   1. Download the source video from Cloudinary URL
///   2. Run FFmpeg to produce HLS (fMP4 segments)
///   3. Upload each segment + rewritten playlist to Cloudinary
///   4. Update the Lesson document in MongoDB
pub async fn process_video(
    job: &JobPayload,
    config: &Config,
    http: &Client,
    lessons_col: &Collection<Document>,
) -> Result<VideoProcessingResult, Box<dyn std::error::Error + Send + Sync>> {
    info!(title = %job.title, lesson_id = %job.lesson_id, "Starting video processing");

    // Create a temp directory for this job (auto-cleaned on drop)
    let tmp_dir = tempfile::tempdir()?;
    let input_path = tmp_dir.path().join("input.mp4");

    // ── 1. Download source video ──
    info!("Downloading source video from: {}", job.url);
    download_file(http, &job.url, &input_path).await?;
    info!("Downloaded to {:?} ✓", input_path);

    // ── 2. FFmpeg → HLS (fMP4 segments) ──
    let hls_dir = tmp_dir.path().join("hls");
    tokio::fs::create_dir_all(&hls_dir).await?;

    run_ffmpeg_hls(&input_path, &hls_dir).await?;
    info!("FFmpeg HLS conversion complete ✓");

    // ── 3. Collect output files and upload to Cloudinary ──
    let base_name = job.title.replace(|c: char| !c.is_alphanumeric() && c != '_' && c != '-', "_");
    let cloud_folder = format!("courses/hls/{}", base_name);

    let mut segment_urls: Vec<String> = Vec::new();
    let mut name_to_url: std::collections::HashMap<String, String> = std::collections::HashMap::new();

    // Read all files in hls_dir
    let mut entries = tokio::fs::read_dir(&hls_dir).await?;
    let mut file_names: Vec<String> = Vec::new();

    while let Some(entry) = entries.next_entry().await? {
        let fname = entry.file_name().to_string_lossy().to_string();
        if fname.ends_with(".m4s") || fname == "init.mp4" {
            file_names.push(fname);
        }
    }

    // Sort: init.mp4 first, then chunks in order
    file_names.sort_by(|a, b| {
        if a == "init.mp4" { return std::cmp::Ordering::Less; }
        if b == "init.mp4" { return std::cmp::Ordering::Greater; }
        a.cmp(b)
    });

    // Upload segments
    for fname in &file_names {
        let file_path = hls_dir.join(fname);
        let public_id = format!("{}/{}", cloud_folder, fname.replace('.', "_"));

        info!("Uploading segment: {} → {}", fname, public_id);
        let url = upload_to_cloudinary(http, config, &file_path, &public_id, "raw").await?;

        segment_urls.push(url.clone());
        name_to_url.insert(fname.clone(), url);
    }

    info!("All {} segments uploaded ✓", segment_urls.len());

    // ── 4. Rewrite m3u8 playlist with Cloudinary URLs and upload ──
    let playlist_path = hls_dir.join("playlist.m3u8");
    let mut playlist_content = tokio::fs::read_to_string(&playlist_path).await?;

    for (local_name, cloud_url) in &name_to_url {
        playlist_content = playlist_content.replace(local_name, cloud_url);
    }

    // Write rewritten playlist to disk, then upload
    let rewritten_path = hls_dir.join("playlist_rewritten.m3u8");
    tokio::fs::write(&rewritten_path, &playlist_content).await?;

    let playlist_public_id = format!("{}/playlist", cloud_folder);
    let playlist_url = upload_to_cloudinary(
        http, config, &rewritten_path, &playlist_public_id, "raw"
    ).await?;

    info!("Playlist uploaded ✓ → {}", playlist_url);

    // ── 5. Update MongoDB — push into the lesson's videoChunks array ──
    let lesson_oid = mongodb::bson::oid::ObjectId::parse_str(&job.lesson_id)?;

    let chunk_doc = doc! {
        "title": &job.title,
        "playlist": &playlist_url,
        "url": &segment_urls,
    };

    lessons_col
        .update_one(
            doc! { "_id": lesson_oid },
            doc! { "$push": { "videoChunks": &chunk_doc } },
        )
        .await?;

    info!(lesson_id = %job.lesson_id, "MongoDB lesson updated with HLS data ✓");

    // tmp_dir drops here → all temp files cleaned up automatically

    Ok(VideoProcessingResult {
        title: job.title.clone(),
        playlist_url,
        segment_urls,
    })
}

/// Download a file from a URL to a local path.
async fn download_file(
    client: &Client,
    url: &str,
    dest: &Path,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let resp = client.get(url).send().await?;

    if !resp.status().is_success() {
        return Err(format!("Download failed ({}): {}", resp.status(), url).into());
    }

    let bytes = resp.bytes().await?;
    tokio::fs::write(dest, &bytes).await?;
    Ok(())
}

/// Run FFmpeg to convert input video → HLS with fMP4 segments.
/// Tries VP9 first, falls back to H.264, then passthrough (copy).
async fn run_ffmpeg_hls(
    input: &Path,
    output_dir: &Path,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let playlist = output_dir.join("playlist.m3u8");
    let segment_pattern = output_dir.join("chunk_%03d.m4s");

    let hls_args = |codec_args: Vec<&str>| -> Vec<String> {
        let mut args: Vec<String> = vec![
            "-i".into(), input.to_string_lossy().into(),
        ];
        args.extend(codec_args.into_iter().map(String::from));
        args.extend([
            "-f".into(), "hls".into(),
            "-hls_time".into(), "4".into(),
            "-hls_playlist_type".into(), "vod".into(),
            "-hls_segment_type".into(), "fmp4".into(),
            "-hls_segment_filename".into(), segment_pattern.to_string_lossy().into(),
            playlist.to_string_lossy().into(),
        ]);
        args
    };

    // ── Attempt 1: VP9 ──
    info!("FFmpeg attempt 1: VP9 (libvpx-vp9)");
    let vp9_args = hls_args(vec![
        "-vf", "scale='min(1280,iw)':'min(720,ih)'",
        "-c:v", "libvpx-vp9", "-b:v", "2800k",
        "-c:a", "aac", "-b:a", "128k",
    ]);

    if run_ffmpeg_cmd(&vp9_args).await? {
        info!("VP9 succeeded ✓");
        return Ok(());
    }
    warn!("VP9 failed, cleaning output and trying H.264...");
    clean_dir(output_dir).await?;

    // ── Attempt 2: H.264 ──
    info!("FFmpeg attempt 2: H.264 (libx264)");
    let h264_args = hls_args(vec![
        "-vf", "scale='min(1280,iw)':'min(720,ih)'",
        "-c:v", "libx264", "-b:v", "2800k",
        "-c:a", "aac", "-b:a", "128k",
    ]);

    if run_ffmpeg_cmd(&h264_args).await? {
        info!("H.264 succeeded ✓");
        return Ok(());
    }
    warn!("H.264 failed, cleaning output and trying passthrough...");
    clean_dir(output_dir).await?;

    // ── Attempt 3: Passthrough ──
    info!("FFmpeg attempt 3: Passthrough (copy)");
    let copy_args = hls_args(vec![
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "128k",
    ]);

    if run_ffmpeg_cmd(&copy_args).await? {
        info!("Passthrough succeeded ✓");
        return Ok(());
    }

    Err("All FFmpeg encoding attempts failed".into())
}

/// Execute an ffmpeg command. Returns true if exit code == 0.
async fn run_ffmpeg_cmd(args: &[String]) -> Result<bool, Box<dyn std::error::Error + Send + Sync>> {
    let output = tokio::process::Command::new("ffmpeg")
        .args(["-y", "-hide_banner", "-loglevel", "warning"])
        .args(args)
        .output()
        .await?;

    if !output.stderr.is_empty() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        for line in stderr.lines() {
            warn!("[ffmpeg] {}", line);
        }
    }

    Ok(output.status.success())
}

/// Remove all files inside a directory (but keep the directory).
async fn clean_dir(dir: &Path) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let mut entries = tokio::fs::read_dir(dir).await?;
    while let Some(entry) = entries.next_entry().await? {
        if entry.file_type().await?.is_file() {
            tokio::fs::remove_file(entry.path()).await?;
        }
    }
    Ok(())
}
