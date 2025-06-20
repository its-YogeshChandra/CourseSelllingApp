import { Router } from "express";
import { zodAuth } from "../middlewares/zod.middleware.js";
import { signupUser, loginUser, googleLogin } from "../controllers/user.controllers.js";
import { createcourse, uploadlessons } from "../controllers/course.controller.js";
import { uploadMiddleware } from "../middlewares/multer.middleware.js";

const router = Router();
const courseRouter = Router();


//signup Route
router.route("/signup").post(zodAuth, signupUser)

// login Route
router.route("/login").post(loginUser)

//googleLogin Route
router.route("/googleLogin").post(googleLogin)


//routes of course

// #1 for creating course
courseRouter.route("/createcourse").post(uploadMiddleware, createcourse)
courseRouter.route("/uploadlessons").post(uploadMiddleware, uploadlessons)


export { router, courseRouter };
