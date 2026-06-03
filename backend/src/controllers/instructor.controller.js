import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Instructor } from "../models/instructor.model.js";
import { User } from "../models/user.model.js";


const instructorSignup = asyncHandler(async (req, res) => {
    //simple signup same as user
    const userId = req.user._id; 

    const dbUser = await User.findById(userId).select("password -refreshToken");

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
       const Dbuser = await User.findById(saveddata._id).select("-refreshToken");
       
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


// login user
const instructorLogin = asyncHandler(async (req, res) => {

   const userId = req.user._id;
   const dbUser = await User.findById(userId).select("-password -refreshToken")

   if (!dbUser) {
    throw new ApiError(400, "User doesn't exists")
   }

   if (dbUser.role !== "instructor") {
    throw new ApiError(400, "User is not an instructor")
   }
  
   res
    .status(200)
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