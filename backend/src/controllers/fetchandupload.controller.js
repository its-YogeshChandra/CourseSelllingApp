import { Course } from "../models/course.model.js";
import { Lesson } from "../models/courseData.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { exec } from "child_process";
import { generateVideoSegments } from "../utils/ffmpeg.js";
import { downloadVideo } from "../utils/downloadFunction.js";

const fetchAndUpload = asyncHandler(async (req, res) => {
  // Fetch the course by ID
  const course = await Course.find({});
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // Fetch lessons for the course
  course.map(async (courseItem) => {
    const lessonData = await Lesson.find({ courseRef: courseItem._id });

    if (!lessonData || lessonData.length === 0) {
      throw new ApiError(404, "Lessons not found for the course");
    }

    // fetch video form each lesson
    lessonData.map((lesson) => {
      lesson.video.map(async (e) => {
        try {
           console.log(e.url)
          // wget command to download the video
          const videoDownloaded = await downloadVideo(
            e.url,
           "../../public/temp"
          );
          console.log(`Video downloaded successfully: ${videoDownloaded}`);

      
        } catch (error) {
          console.error("Error during video processing:", error);
        }
      });
    });
  });
});

export { fetchAndUpload };
