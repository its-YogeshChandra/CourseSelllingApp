import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

//for registering user
const signupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
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

// login user
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
    secured: true,
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
      secured: true,
    };

    const access_Token = alreadyDbuser.generateAccessToken;
    const refresh_Token = alreadyDbuser.generateRefreshToken;

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
      secured: true,
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
    secured: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "User successfully logout"));
});

const authMe = asyncHandler(async (req, res) => {
  //check for the cookies and get the data
  //send error if there is no user
  //send data if there is a user and also remove refresh token and password from that
  const values = req.cookies;
  console.log(values);
  const token = req.cookies?.accessToken;
  console.log(token);

  if (!token) {
    throw new ApiError(400, "Unauthorized request");
  }
  //decode the user out of token
  const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedUser);

  const mongoUser = User.find({ _id: decodedUser.id }).select(
    "-password -refreshToken"
  );
  console.log(mongoUser);
  if (!mongoUser) {
    throw new ApiError(401, "Invalid Access Token");
  }

  // send data back to the frontend
  res.status(200).json(new ApiResponse(200, "User is Authorized", mongoUser));
});

export { signupUser, loginUser, googleLogin, logoutUser, authMe };
