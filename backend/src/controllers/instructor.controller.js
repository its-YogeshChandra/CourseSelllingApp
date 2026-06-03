import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";


const instructorSignup = asyncHandler(async (req, res) => {
    //simple signup same as user
    const userId = req.user._id; 

    const dbUser = await User.findById(userId).select("-refreshToken");

    if (!dbUser) {
      throw new ApiError(400, "User doesn't exists");
    }

    if (dbUser.role === "instructor") {
      throw new ApiError(400, "User is already an instructor")
    }

    //update the role in the user object 
    dbUser.role = "instructor"
    await dbUser.save({ validateBeforeSave: false })
      .then(async (saveddata) => {
       const Dbuser = await User.findById(saveddata._id).select("-refreshToken -password");
       
       if (Dbuser.role !== "instructor") {
        throw new ApiError(500, "Error occured during updating role")
       } else {
        return res.status(200).json(new ApiResponse(200, "Instructor creation successfull", Dbuser))
       }

      })
      .catch((err) => {
        throw new ApiError(500, "Error occured during updating role")
      })

})


// verify instructor role — user is already authenticated via jwtVerify
const instructorLogin = asyncHandler(async (req, res) => {

   const userId = req.user._id;
   const dbUser = await User.findById(userId).select("-password -refreshToken")

   if (!dbUser) {
    throw new ApiError(400, "User doesn't exists")
   }

   if (dbUser.role !== "instructor") {
    throw new ApiError(403, "User is not an instructor")
   }
  
   res
    .status(200)
    .json(new ApiResponse(200, "Instructor verified", dbUser));
});


const instructorlogout = asyncHandler(async (req, res) => {
  const data = req.user;
  
  const mongoUser = await User.findById(data._id);
  if (!mongoUser) {
    throw new ApiError(500, "Error while finding user");
  }
 
  mongoUser.refreshToken = undefined;
  await mongoUser.save({ validateBeforeSave: false });
  
  const option = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "User successfully logout"));
});




export { instructorSignup, instructorLogin, instructorlogout };