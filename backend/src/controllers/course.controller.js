import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Course } from "../models/course.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { Lesson } from "../models/courseData.model.js";
import { uploadOnRedis } from "../utils/redis_utility.js";
import {connectToRabbitMQ , sendMessageToQueue} from "../utils/message_broker.js"

const createcourse = asyncHandler(async (req, res) => {
  const { courseName, category, instructor, description, price, title } =
    req.body;
  
    const files = req.files.thumbnail;
  const { path } = files[0];

  // upload data on cloudinary
  const data = await uploadonCloudinary(path);
  const { url } = data;

  //inserting data in db
  const insertinDb = await Course.create({
    title,
    courseName,
    category,
    instructor,
    courseDescription: description,
    price,
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
  // Frontend uploads files directly to Cloudinary and sends us JSON metadata.
  // Expected req.body shape:
  // {
  //   title: "Lesson Title",
  //   description: "...",
  //   courseRef: "mongoObjectId",
  //   videos: [{ title: "file.mp4", url: ["https://..."] }],
  //   images: [{ title: "img.png", url: ["https://..."] }],
  //   notes:  [{ title: "doc.pdf", url: ["https://..."] }]
  // }

  const { title, courseRef, description, videos, images, notes } = req.body;

  if (!title || !courseRef) {
    throw new ApiError(400, "title and courseRef are required");
  }

  // Build arrays matching the Lesson schema ({title, url} per item)
  const videosArr = [];
  const imagesArr = [];
  const notesArr = [];

  if (Array.isArray(videos)) {
    for (let i = 0; i < videos.length; i++) {
      const v = videos[i];
      videosArr.push({
        title: v.title || `video_${i}`,
        url: Array.isArray(v.url) ? v.url[0] : v.url,
      });
    }
  }

  if (Array.isArray(images)) {
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      imagesArr.push({
        title: img.title || `image_${i}`,
        url: Array.isArray(img.url) ? img.url[0] : img.url,
      });
    }
  }

  if (Array.isArray(notes)) {
    for (let i = 0; i < notes.length; i++) {
      const n = notes[i];
      notesArr.push({
        title: n.title || `note_${i}`,
        url: Array.isArray(n.url) ? n.url[0] : n.url,
      });
    }
  }

  // Create the lesson document in DB
  const createLesson = await Lesson.create({
    title,
    courseRef,
    description,
    video: videosArr,
    image: imagesArr,
    notes: notesArr,
  });

  if (!createLesson) {
    throw new ApiError(500, "Error while creating database document");
  }

  // Queue video jobs for the Rust worker
  const { connection, channel } = await connectToRabbitMQ();

  for (let i = 0; i < videosArr.length; i++) {
    const item = videosArr[i];
    const message = {
      title: item.title,
      url: item.url,
      lesson_id: createLesson._id.toString(),
    };
    const job = await sendMessageToQueue(channel, "videoProcessing", message);
    console.log("job details : ", job);
    if (job) {
      console.log(`[RabbitMQ] Job queued for video: ${item.title}`);
    } else {
      console.error(`[RabbitMQ] Failed to queue job for video: ${item.title}`);
      throw new ApiError(500, "Error while queuing job");
    }
  }

  res
    .status(200)
    .json(new ApiResponse(200, "lesson successfully created", createLesson));
});

const updatelessons = asyncHandler(async (req, res) => {});

//controller for getting courses
const getCourses = asyncHandler(async (req, res) => {
  //query coursemodel in db and send all the course data to frontend(will check on the choice though)
  const token = req.cookies?.accessToken;

  const data = await Course.find({});

  if (!data) {
    throw new ApiError(500, "Error while fetching data");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "data successfully received", data));
});

//controller for getting both course and lessons
const getCourseAndLessons = asyncHandler(async (req, res) => {
  //get query data from queries
  const val = JSON.parse(JSON.stringify(req.query));

  // check for the valid id  it exists or not
  if (val) {
    const data = await Course.findById(val.id);

    if (!data) {
      throw new ApiError(400, "invalid courseId");
    }

    //get data from lesson model
    const dataLessson = await Lesson.find({ courseRef: val.id });

    if (!dataLessson) {
      throw new ApiError(500, "error while fetching lesson data");
    }

    // make object out of both the data from course and lesson
    const datatoSend = {
      course: data,
      lessons: dataLessson,
    };

    // sending this data to the frontend
    res
      .status(200)
      .json(new ApiResponse(200, "data successfully received", datatoSend));
  }
});

const isSubscribed = asyncHandler(async (req, res) => {
  //fetch the student id and courseId from the frontend
  const { studentId, courseId } = req.body;

  //query the model and check for the studentId
  const isPresent = await Course.findOne({
    _id: courseId,
    students: studentId,
  });

  if (!isPresent) {
    throw new ApiError(400, "student not found");
  }

  //send data to the frontend
  res.status(200).json(new ApiResponse(200, "Student is present", isPresent));
});


// controller for adding student to the course
const addStudentToCourse = asyncHandler(async (req, res) => {
  const { courseId, studentId } = req.body;

  // check if the course exists
  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  // check if the student is already enrolled
  if (course.students.includes(studentId)) {
    throw new ApiError(400, "already enrolled in this course");
  }
  // add student to the course
  course.students.push(studentId);
  await course.save();

  //send response to the user
  res
    .status(200)
    .json(new ApiResponse(200, "Student added to course successfully"));
});

//controller for getting metadata , saving pubic id and sending data to the frontend
const courseDataForPlayer = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  if (!courseId) {
    throw new ApiError(400, "courseId is required");
  }

  const courseData = await Course.findById(courseId);
  if (!courseData) {
    throw new ApiError(404, "Course not found");
  }

  const lessonData = await Lesson.find({ courseRef: courseId });

  const playerData = lessonData.map((lesson) => {
    return {
      lessonId: lesson._id,
      title: lesson.title,
      description: lesson.description,
      videos: lesson.video || [],
    };
  });

  res.status(200).json(
    new ApiResponse(200, "Player data fetched", {
      course: courseData,
      lessons: playerData,
    })
  );
});
export {
  createcourse,
  uploadlessons,
  updatelessons,
  getCourses,
  getCourseAndLessons,
  isSubscribed,
  addStudentToCourse,
  courseDataForPlayer,
};
