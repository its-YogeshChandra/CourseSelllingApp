import { Router } from "express";
import { zodAuth } from "../middlewares/zod.middleware.js";
import {
  signupUser,
  loginUser,
  googleLogin,
  logoutUser,
} from "../controllers/user.controllers.js";
import {
  createcourse,
  getCourses,
  uploadlessons,
  getCourseAndLessons
} from "../controllers/course.controller.js";
import { uploadMiddleware } from "../middlewares/multer.middleware.js";
import {
  instructorLogin,
  instructorSignup,
  instructorlogout,
} from "../controllers/instructor.controller.js";
import { jwtVerify } from "../middlewares/jwtverify.middleware.js";

const router = Router();
const courseRouter = Router();
const insturctorRouter = Router();

//signup Route
router.route("/signup").post(zodAuth, signupUser);

// login Route
router.route("/login").post(loginUser);

//googleLogin Route
router.route("/googleLogin").post(googleLogin);

//logout user
router.route("/logout").post(jwtVerify, logoutUser);

//routes of course

// #1 for creating course
courseRouter.route("/createcourse").post(uploadMiddleware, createcourse);

//#2 for uploading lessons
courseRouter.route("/uploadlessons").post(uploadMiddleware, uploadlessons);

//#3 for getting course data
courseRouter.route("/getCourseData").get(getCourses)

//#4  for getting course and lesson data both
courseRouter.route("/getCourse&lessonData").get(getCourseAndLessons)

//routes for instructor
// #1 for registering instructor
insturctorRouter.route("/insSignup").post(instructorSignup);

// #2 for logging instructor
insturctorRouter.route("/insLogin").post(instructorLogin);

// #3 for logging out instructor
insturctorRouter.route("/insLogout").post(jwtVerify, instructorlogout);
export { router, courseRouter, insturctorRouter };
