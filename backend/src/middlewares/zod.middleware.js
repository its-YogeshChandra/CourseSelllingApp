import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const check = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
);

const user = z.object({
  username: z
    .string()
    .min(3, "username must be min 3 char long")
    .max(15, "username shouldn't be more then 15 char"),
  firstName: z.string().max(20, "firstName shouldn't be more then 20 char"),
  lastName: z.string().max(20, "lastName shouldn't be more then 20 char"),
  email: z.string().email("should be a valid email"),
  password: z
    .string()
    .regex(
      check,
      "Password must contain at least one uppercase, one lowercase,one number and one special character"
    ),
});

const zodAuth = asyncHandler(async (req, res, next) => {
  const data = req.body;
  const validation = user.safeParse(data);

  if (validation.success) {
    req.body = validation.data;
    next();
  } else {
    throw new ApiError(200, validation.error, "invalid credentials");
  }
});

export { zodAuth };
