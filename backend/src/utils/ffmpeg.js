import fs from 'fs-extra';
import path from "path";
import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";



ffmpeg.setFfmpegPath(ffmpegStatic);

// Wrap in a Promise for proper async handling
function convertToHLS(videoPath, outputDir) {
  return new Promise((resolve, reject) => {
    // Ensure output directory exists
    fs.ensureDirSync(outputDir);
    
    // Check if input file exists
    if (!fs.existsSync(videoPath)) {
      reject(new Error(`Input video file not found: ${videoPath}`));
      return;
    }

    console.log("Starting HLS conversion...");
    console.log("Input:", videoPath);
    console.log("Output:", outputDir);

    ffmpeg()
      .input(videoPath)
      .videoCodec('libx264')
      .audioCodec('aac')
     .outputOptions([
        '-preset medium',
        '-crf 24',
        '-vf scale=-2:720',     // Scale to 720p height, maintain aspect ratio
        '-b:v 2500k',           // Video bitrate for 720p
        '-maxrate 2500k',       // Maximum bitrate
        '-bufsize 5000k',       // Buffer size
        '-b:a 128k',            // Audio bitrate
        '-ar 44100',            // Audio sample rate
        '-start_number 0',
        '-hls_time 4',
        '-hls_list_size 0',
        '-hls_playlist_type vod',
        '-f hls'
      ])
      .output(path.join(outputDir, 'index.m3u8'))
      .on('start', (commandLine) => {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('progress', (progress) => {
        console.log('Processing: ' + progress.percent + '% done');
      })
      .on('end', () => {
        console.log('HLS conversion completed successfully');
        resolve("Data has been successfully transformed");
      })
      .on('error', (err, stdout, stderr) => {
        console.error('Error during video processing:', err.message);
        console.error('FFmpeg stdout:', stdout);
        console.error('FFmpeg stderr:', stderr);
        reject(err);
      })
      .run();
  });
}

// Usage

export { convertToHLS };






