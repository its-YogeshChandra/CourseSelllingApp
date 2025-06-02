import { z } from "zod"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const check = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
);
  

const user = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().regex(check)
})

const zodAuth = asyncHandler(async (req,res,next) => {
    const data = req.body
    const validation = user.safeParse(data)

    if (validation.success) {
        req.body = validation.data
        next()
    } else 
      { throw new ApiError(200, validation.error, "invalid credentials")}
  
})

export { zodAuth };