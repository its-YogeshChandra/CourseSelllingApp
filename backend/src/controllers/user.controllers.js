import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { Lesson } from "../models/courseData.model.js";
import { CompletionData } from "../models/completion.model.js";
import mongoose from "mongoose";

//for registering user
const signupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const dbUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (dbUser) {
    throw new ApiError(400, "User already exists");
  }

  const createUser = await User.create({
    username: username,
    email: email,
    password: password,
  });

  const Dbuser = await User.findById(createUser._id).select("-refreshToken");

  if (!Dbuser) {
    throw new ApiError(500, "Error occured during creating user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User successfully registered", Dbuser));
});

// controller for login user
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Email or username is missing");
  }

  const Dbuser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!Dbuser) {
    throw new ApiError(400, "Invalid credentials user doesn't exists");
  }

  const isPasswordValid = await Dbuser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  const accessToken = Dbuser.generateAccessToken();
  const refreshToken = Dbuser.generateRefreshToken();

  const loggedUser = await User.findByIdAndUpdate(Dbuser._id, {
    refreshToken,
  }).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: false,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "User successfully logged In", loggedUser));
});

//google Login user
const googleLogin = asyncHandler(async (req, res) => {
  //setting up client
  // getting data
  //decrypt data using Oauth
  //make a query in database
  //create access and refresh token
  //return user

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const Token = req.body.data;

  const ticket = await client.verifyIdToken({
    idToken: Token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, given_name } = ticket.payload;

  const alreadyDbuser = await User.findOne({
    email,
  });

  //if user already exists....
  if (alreadyDbuser) {
    const option = {
      httpOnly: true,
      secure: false,
    };

    const access_Token = alreadyDbuser.generateAccessToken();
    const refresh_Token = alreadyDbuser.generateRefreshToken();

    alreadyDbuser.refreshToken = refresh_Token;
    await alreadyDbuser.save({ validateBeforeSave: false });

    const googleLoggedUser = await User.findById(alreadyDbuser._id).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .cookie("accessToken", access_Token, option)
      .cookie("refreshToken", refresh_Token, option)
      .json(new ApiResponse(200, "User already exists", googleLoggedUser));

    return;
  }

  //if user doesn't exists....
  const newDbuser = await User.create({
    username: given_name,
    email: email,
  });

  if (!newDbuser) {
    throw new ApiError(500, "Error while creating user");
  }

  const access_Token = newDbuser.generateAccessToken();
  const refresh_Token = newDbuser.generateRefreshToken();

  newDbuser.refreshToken = refresh_Token;
  await newDbuser.save({ validateBeforeSave: false });

  const googleLoggedUser = await User.findById(newDbuser._id).select(
    "-password -refreshToken"
  );
  if (googleLoggedUser) {
    const option = {
      httpOnly: true,
      secure: false,
    };
    res
      .status(200)
      .cookie(access_Token, option)
      .cookie(refresh_Token, option)
      .json(
        new ApiResponse(
          200,
          "user successfully created and loggedIn",
          googleLoggedUser
        )
      );
    return;
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  //get data from req.user
  //find user with data in db
  //clear refresh token form db
  //clear refresh token from cookies
  // send back response to the user

  const data = req.user;

  const mongoUser = User.findById(data._id);
  if (!mongoUser) {
    throw new ApiError(500, "Error while finding user");
  }
  mongoUser.refreshToken = "";
  await mongoUser.save({ validateBeforeSave: false });

  const option = {
    httpOnly: true,
    secure: false,
  };
  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "User successfully logout"));
});

//authMe route for checking user auth
const authMe = asyncHandler(async (req, res) => {
  //check for the cookies and get the data
  //send error if there is no user
  //send data if there is a user and also remove refresh token and password from that
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(400, "Unauthorized request");
  }
  //decode the user out of token
  const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const id = decodedUser.id;
  const mongoUser = await User.findById(id).select("-password -refreshToken");
  if (!mongoUser) {
    throw new ApiError(401, "Invalid Access Token");
  }

  // send data back to the frontend
  res
    .status(200)
    .json(new ApiResponse(200, "User is authenticated", mongoUser));
});

const findCourseCompletion = asyncHandler(async (req, res) => {
  // userId and  course id from frontend
  const { userId, courseId } = req.body;

  // query the completoindb to get the whole data
  const isPresent = await CompletionData.find({
    userRef: userId,
    courseRef: courseId,
  });

  // check on for that data into the completionmodels in db
  if (!isPresent) {
    throw new ApiError(400, "no data found");
  }

  // if present then query the lessonModel for full data
  const lessonData = await Lesson.find({
    courseRef: courseId,
  });

  //query the lessonData and query the completionmodel
  let subData = {
    lessonRef: [],
    video: [],
    image: [],
    notes: [],
  };
  lessonData.map((element) => {
    subData.lessonRef.push(element._id);

    // for in loop to access the data
    for (const key in element) {
      if (key === "video" || key === "image" || key === "notes") {
        element[key].map((items) => {
          subData[`${key}`].push(items._id);
        });
      }
    }
  });

  //query the completion data and add the data into sending data
  const dataPresent = [];
  for (const key in isPresent) {
    if (
      key === "video" ||
      key === "image" ||
      key === "notes" ||
      key === "lessonRef"
    ) {
      subData[`${key}`].map((value) => {
        if (isPresent[key].includes(value)) {
          dataPresent.push(value);
        }
      });
    }
  }

  // send data to the frontend
  res
    .status(200)
    .json(
      new ApiResponse(200, "completionData extraction successfull", dataPresent)
    );
});

const addtoCourseCompletion = asyncHandler(async (req, res) => {
  //get the userId and courseId from backend
  const { courseId, userId, subData } = req.body;

  // query the db to get the whole data
  const isPresent = await CompletionData.find({
    userRef: userId,
    courseRef: courseId,
  });

  // check if the data present or not
  if (isPresent.length === 0) {
    console.log("readching here");
    //if not present then create a new entry
    const newCompletionData = await CompletionData.create({
      userRef: userId,
      courseRef: courseId,
    });

    //add the subdata into the new entry
    for (const key in subData) {
      subData[key].map((value) => {
        newCompletionData[`${key}`].push(value);
      });
    }
    await newCompletionData.save({ validateBeforeSave: false });

    res.status(200).json(new ApiResponse(200, "data successfully added"));
    return;
  }

  // if present then update the entry
  for (const key in subData) {
    subData[key].map((value) => {
      if (!isPresent[0][`${key}`].includes(value)) {
        isPresent[0][`${key}`].push(value);
      } else {
        throw new ApiError(400, "data already present");
      }
    });
  }

  // save the data into db
  await isPresent[0].save({ validateBeforeSave: false });

  // send the response to the user
  res.status(200).json(new ApiResponse(200, "data successfully added"));
});

const findUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (mongoose.isValidObjectId(userId)) {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(404, "No user found");
    }
    res.status(200).json(new ApiResponse(200, "User found", user));
  }
});

const updateProfileInformation = asyncHandler(async (req, res) => {
  const data = req.body;

  //loop the object
  for (const key in data) {
    if (data[key] === "" || data[key] === null || data[key] === undefined) {
      throw new ApiError(400, `${key} is empty`);
    }

    // extract the key with value id and query the database
    if (key === "userId" && mongoose.isValidObjectId(data[key])) {
      const user = await User.findById(data[key]);
      if (!user) {
        throw new ApiError(404, "No user found");
      }

      // update the user
      
    }
  }
});

export {
  signupUser,
  loginUser,
  googleLogin,
  logoutUser,
  authMe,
  findCourseCompletion,
  addtoCourseCompletion,
  findUser,
  updateProfileInformation,
};
