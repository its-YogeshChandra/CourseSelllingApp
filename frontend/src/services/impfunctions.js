import { nanoid } from "@reduxjs/toolkit";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from "@ffmpeg/util";

const modifiedObject = async (obj, keyfromobjects) => {
  const newobj = { ...obj };
  keyfromobjects.forEach((key) => {
    if (Array.isArray(newobj[key])) {
      newobj[key] = newobj[key].map((e) => ({
        id: nanoid(),
        files: e,
      }));
    }
  });


  //check the highest quality of data check 
  const ffmpeg = new FFmpeg;
  await ffmpeg.load()

  await ffmpeg.writeFile("input.mp4", await fetchFile(obj))
  await ffmpeg.ffprobe([
    '-v', 'error',                     
    '-select_streams', 'v:0',          
    '-show_entries', 'stream=width,height,bit_rate,max_bit_rate', 
    '-of', 'json',                     
    'input.mp4',                       
    '-o', 'output.json'                
  ]);
  
   const data = ffmpeg.readFile("output.json")
   const jsonString = new TextDecoder().decode(data);
   const metadata = JSON.parse(jsonString);
   const video_stream = metadata.streams[0];
   const max_bitrate = video_stream.max_bitrate ? video_stream.max_bitrate : "2800k";

   await ffmpeg.exec([
    '-i', 'input.mp4',
    '-vf', "scale='min(1280,iw)':'min(720,ih)'",
    '-c:v', 'libx264',
    '-b:v', `${max_bitrate}`,
    '-c:a', 'aac',
    '-b:a', '128k',
    '-f', 'hls',
    '-hls_time', '4',
    '-hls_playlist_type', 'vod',
    '-hls_segment_filename', 'chunk_%03d.ts', // Creates chunk_001.ts, chunk_002.ts...
    'playlist.m3u8'                            // The master playlist file
  ]);

  //
  
  
};


export { modifiedObject };
