import { Course } from "../models/course.model.js";
import { Lesson } from "../models/courseData.model.js";
import { ApiError } from "../utils/apiError.js";
import { connectDb } from "../db/dbase.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const fetchAndUpload = asyncHandler(async (req, res) => {
  const { start } = req.params;

  // Fetch the course by ID
  const course = await Course.find({});
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  console.log(course);
  console.log(course.length);

  // Fetch lessons associated with the course

  // const lessons = await Lesson.find({ courseRef: course._id });
  // if (!lessons) {
  //     throw new ApiError(404, "Lessons not found for this course");
  // }
  // console.log(lessons)
});

export { fetchAndUpload };
