import { Router } from "express";
import { zodAuth } from "../middlewares/zod.middleware.js";
import { signupUser, loginUser, googleLogin } from "../controllers/user.controllers.js";


const router = Router();

//signup Route
router.route("/signup").post(zodAuth, signupUser)

// login Route
router.route("/login").post(zodAuth, loginUser)

//googleLogin Route
router.route("/googleLogin").post(googleLogin)

export { router };
