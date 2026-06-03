import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

// Unified JWT middleware — works for all roles (student, instructor, admin).
// No separate Instructor model needed; the User model's `role` field handles it.
const jwtVerify = asyncHandler(async (req, _, next) => {
  const token = req.cookies?.accessToken || req.cookies?.refreshToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const mongoUser = await User.findById(decodedUser.id).select(
    "-password -refreshToken"
  );

  if (!mongoUser) {
    throw new ApiError(401, "Invalid Access Token");
  }

  req.user = mongoUser;
  next();
});

export { jwtVerify };
