import ffmpeg from "ffmpeg";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import fs from "fs-extra";    // Use fs-extra for additional file system methods

async function generateVideoSegments(filePath, outputDir, title, res) {
  return new Promise((resolve, reject) => {
    ffmpeg(filePath)
      .on('filenames', function (title) {
        console.log('Generating Video Segments:', title);
      })
      .outputOptions([
        '-c:v libx264',  // Specifies the H.264 video codec.
        '-c:a aac',  // Specifies the AAC audio codec.
        '-preset medium',  // Compression preset
        '-crf 24',  // CRF for quality control (lower is better quality)
      ])
      .output(`${outputDir}/index.m3u8`)
      .outputOptions([ 
        '-start_number 0',  // Sets the starting number for the HLS segments.
        '-hls_time 4',  // Duration of each HLS segment in seconds.
        '-hls_list_size 0',  // Ensures all segments are included in the playlist.
        '-hls_playlist_type vod',  // Designates the playlist as VOD and includes the EXT-X-ENDLIST tag.
        '-f hls',  // Specifies the output format as HLS (HTTP Live Streaming).
      ])
      .on('end', async () => {
        await fs.remove(filePath);
        resolve("data has been successfully transformed");
      })
  }).catch((error) => {
    console.error("Error generating video segments:", error)});
}

export { generateVideoSegments };