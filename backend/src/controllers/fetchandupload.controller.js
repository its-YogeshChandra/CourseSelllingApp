import { Lesson } from "../models/courseData.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { downloadVideo } from "../utils/downloadFunction.js";
import { listMp4FilesInDir } from "../utils/locatefile.js";
import { convertToHLS } from "../utils/ffmpeg.js";
import path from "path";
import fs from "fs-extra";
import { videoUploadToCloudinary } from "../utils/video.cloudinary.js";

const fetchAndUpload = asyncHandler(async (req, res) => {
  const rootDir = process.cwd(); // where you want to download temporarily
  const lessons = await Lesson.find();

  for (const lesson of lessons) {
    if (!lesson.video || lesson.video.length === 0) continue;

    for (let i = 0; i < lesson.video.length; i++) {
      const videoTitle = lesson.video[i].title;
      const videoUrl = lesson.video[i].url;

      // Download only this video into rootDir
      await downloadVideo(videoUrl);

      // Find newly downloaded video file
      const files = listMp4FilesInDir(rootDir);
      const fileName = files[0]; // assuming root is cleaned or only one mp4
      const fullPathToVideo = path.join(rootDir, fileName);

      // Run FFmpeg on that file
      const outputDir =
        "/home/crusty/Documents/fullstack/CourseSelllingApp/backend/public/chunkPlaylist"; // existing folder
      await convertToHLS(fullPathToVideo, outputDir)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error("Conversion failed:", error.message);
        });

      // list of all the files present in the outputDir
      const filesInOutputDir = fs.readdirSync(outputDir);

      // filter the array and remove the gitkeep and index.m3u8 files
      const filteredFiles = filesInOutputDir
        .filter((file) => file !== ".gitkeep" && file !== "index.m3u8")
        .sort((a, b) => {
          // Extract number part from "indexX.ts"
          const numA = parseInt(a.replace(/[^0-9]/g, ""));
          const numB = parseInt(b.replace(/[^0-9]/g, ""));
          return numA - numB;
        });

      const videoChunkArray = [];
      const videolinks = [];
      for (let index = 0; index <= filteredFiles.length - 1; index++) {
        
        // Upload each file to Cloudinary
        const filePath = path.join(outputDir, filteredFiles[index]);
        const uplodedVideo = await videoUploadToCloudinary(filePath);
        console.log("Uploaded video URL:", uplodedVideo);

        console.log(uplodedVideo);
        videolinks.push(uplodedVideo.playback_url);
        fs.unlinkSync(filePath);  // delete the file after uploading
      }

      // Create videoChunks array
      videoChunkArray.push({
        title: videoTitle,
        url: videolinks,
      });
     
      // Update the lesson with videoChunks
      await Lesson.findByIdAndUpdate(
        lesson._id,
        {
          videoChunks: videoChunkArray
        }
      )

      // Optional: delete the downloaded file to avoid interference with next
      await fs.remove(fullPathToVideo);
      console.log(`Finished processing ${fileName}`);
    }
  }

  res.json({ success: true, message: "Finished processing all videos." });
});
export { fetchAndUpload };
