import { Router } from "express";
import { zodAuth } from "../middlewares/zod.middleware.js";
import { signupUser, loginUser } from "../controllers/user.controllers.js";


const router = Router();

//signup Route
router.route("/signup").post(zodAuth, signupUser)

// login Route
router.route("/login").post(zodAuth, loginUser)


export { router };
