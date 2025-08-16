import { Course } from "../models/course.model.js";
import { Lesson } from "../models/courseData.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateVideoSegments } from "../utils/ffmpeg.js";
import { downloadVideo } from "../utils/downloadFunction.js";
import { listMp4FilesInDir } from "../utils/locatefile.js";
import path from "path";
import fs from "fs-extra"; // to create temp folders

const fetchAndUpload = asyncHandler(async (req, res) => {
  const lessons = await Lesson.find({});

  if (!lessons) {
    throw new ApiError(404, "No lessons found");
  }

  // Loop one lesson at a time
  for (const lesson of lessons) {
    if (!lesson.video || lesson.video.length === 0) continue;

    // Each lesson can have multiple video URLs
    for (let i = 0; i < lesson.video.length; i++) {
      const videoObj = lesson.video[i];
      const url = videoObj.url;

      // Create a temporary folder for THIS video
      const tempFolder = path.resolve("temp", `${lesson._id}-${i}`);
      await fs.ensureDir(tempFolder);

      // Download 1 video into that temp folder
      await downloadVideo(url, tempFolder);

      // get that mp4 file name
      const files = listMp4FilesInDir(tempFolder);
      const mp4File = files[0];  // should be only one because folder is empty initially

      const fullFilePath = path.join(tempFolder, mp4File);
      console.log("Processing file:", fullFilePath);

      // Output folder for chunks
      const outputDir = path.resolve("public", "chunkPlaylist", `${lesson._id}-${i}`);
      await fs.ensureDir(outputDir);

      // Generate segments
      await generateVideoSegments(fullFilePath, outputDir);

      console.log(`Done processing lesson ${lesson._id}, video index ${i}`);

      // Optional: cleanup temp file
      await fs.remove(tempFolder);
    }
  }

  res.status(200).json({
    success: true,
    message: "Processing completed successfully"
  });
});

export { fetchAndUpload };
