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
      const videoUrl = lesson.video[i].url;

      // Download only this video into rootDir
      await downloadVideo(videoUrl);

      // Find newly downloaded video file
      const files = listMp4FilesInDir(rootDir);
      console.log("Files found:", files);
      const fileName = files[0]; // assuming root is cleaned or only one mp4
      console.log("filename", fileName);
      const fullPathToVideo = path.join(rootDir, fileName);
      console.log("Full path to video:", fullPathToVideo);

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
      console.log("Files in output directory:", filesInOutputDir);

      // Optional: delete the downloaded file to avoid interference with next
      await fs.remove(fullPathToVideo);

      console.log(`Finished processing ${fileName}`);
    }
  }

  res.json({ success: true, message: "Finished processing all videos." });
});
export { fetchAndUpload };
