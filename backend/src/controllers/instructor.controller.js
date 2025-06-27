import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Instructor } from "../models/instructor.model.js";



const instructorSignup = asyncHandler(async (req, res) => {
    //simple signup same as user
    const { username, email, password } = req.body;

    const dbUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (dbUser) {
      throw new ApiError(400, "User already exists");
    }

    const createUser = await Instructor.create({
      username: username,
      email: email,
      password: password,
    });

    const Dbuser = await Instructor.findById(createUser._id).select("-refreshToken");

    if (!Dbuser) {
      throw new ApiError(500, "Error occured during creating user");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "User successfully registered", Dbuser));

})


// login user
const instructorLogin = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body.data;

  if (!(username || email)) {
    throw new ApiError(400, "Email or username is missing");
  }

  const Dbuser = await Instructor.findOne({
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

  const loggedUser = await Instructor.findByIdAndUpdate(Dbuser._id, {
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
    .cookie("type", "teacher", options)
    .json(new ApiResponse(200, "User successfully logged In", loggedUser));
});


const instructorlogout = asyncHandler(async (req, res) => {
  //get data from req.user
  //find user with data in db
  //clear refresh token form db
  //clear refresh token from cookies
  // send back response to the user

  const data = req.user
  
  const mongoUser = Instructor.findById(data._id)
  if (!mongoUser) {
    throw new ApiError(500, "Error while finding user")
  }
 
  mongoUser.refreshToken = undefined
  await mongoUser.save({ validateBeforeSave: false })
  
  const option = {
    httpOnly: true,
    secured: true
  }
 res.status(200).clearCookie("accessToken",option).clearCookie("refreshToken",option).json(new ApiResponse(200,"User successfully logout"))
 
})




export { instructorSignup, instructorLogin, instructorlogout };