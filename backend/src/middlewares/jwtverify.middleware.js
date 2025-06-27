import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Instructor } from "../models/instructor.model.js";
import { User} from "../models/user.model.js"

//use as middleware to check on access and refresh token
// if user then only send to the other routes
const jwtVerify = asyncHandler(async (req, _, next) => {
    const type = req.cookies?.type
    const token = req.cookies?.accessToken || req.cookies?.refreshToken
    if (!token) {
    throw new ApiError("Unauthorized request")        
    }
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (type == "teacher") {
        const mongoUser = Instructor.findById(decodedUser._id)
        if (!mongoUser) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = mongoUser
        next()
    }
    const mongoUser = User.findById(decodedUser._id)
    if (!mongoUser) {
        throw new ApiError(401,"Invalid Access Token")
    }
    req.user = mongoUser
    next()
});


export { jwtVerify };