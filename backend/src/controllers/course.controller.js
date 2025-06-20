import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Course } from "../models/course.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { pathfinder } from "../utils/path.finder.js";

const createcourse = asyncHandler(async (req, res) => {
  const { courseName, category, instructor } = req.body;
  const files = req.files;
  console.log(files);
  const { path } = files.thumbnail[0];

  // upload data on cloudinary

  const data = await uploadonCloudinary(path);
  const { url } = data;

  //inserting data in db
  const insertinDb = await Course.create({
    courseName,
    category,
    instructor,
    thumbnail: url,
  });

  if (!insertinDb) {
    throw new ApiError(500, "failed to create course");
  }
  const createdCourse = await Course.findById(insertinDb._id);
  if (!createdCourse) {
    throw new ApiError(500, "no such course found");
  }

  //sending response to user
  res
    .status(200)
    .json(
      new ApiResponse(200, "successfully created the course", createdCourse)
    );
});

const uploadlessons = asyncHandler(async (req, res) => {
  //fetching data from body
  //fetching data from files
  //creating data in the db
  //checking for edge cases
  //sending data back to the user/client
  const { title, courseRef } = req.body;
  console.log(`${title}, ${courseRef}`)
  const { videos, images, notes} = req.files;

  const videosPath = pathfinder(videos)
  
 const imagesPath = pathfinder(videos)
  
  const notesPath = pathfinder(notes)
  


  



  const uploadedData = uploadonCloudinary();





});

export { createcourse, uploadlessons };
