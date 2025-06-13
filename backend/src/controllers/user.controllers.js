import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";

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

  const Dbuser = await User.findById(createUser._id).select(
    "-password -refreshToken"
  );

  if (!Dbuser) {
    throw new ApiError(500, "Error occured during creating user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Dbuser, "User successfully registered"));
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && email)) {
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
  }).select("-password -refreshtoken");

  const options = {
    httpOnly: true,
    secured: true,
  };

  res
    .status(200)
    .cookie(accessToken, options)
    .cookie(accessToken, options)
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
  const { credential } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, given_name } = ticket.payload;

  const alreadyDbuser = await User.findOne({
    $or: [{ email }, { given_name }],
  });

  if (alreadyDbuser) {
    throw new ApiResponse(200, "User already exists", alreadyDbuser);
  }

  const newDbuser = User.create({
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

  const googleLoggedUser = User.findById(newDbuser._id).select(
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
  }
});

export { signupUser, loginUser, googleLogin };
