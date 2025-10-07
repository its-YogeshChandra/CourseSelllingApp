import illustration from "../assets/illustration.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import authService from "../services/auth.js";
import GoogleLogin from "./googleSignin.jsx";
import { useSearchParams } from "react-router";

const regexCheck = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
);

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must be at most 15 characters"),
    email: z.string().email("Please enter a valid email address"),
    firstPassword: z
      .string()
      .regex(
        regexCheck,
        "Password must contain at least one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((val) => val.firstPassword === val.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function Signup() {
  const [checkbox, setCheckbox] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const values = searchParams.get("data");

  const navigate = useNavigate();

  const signup = async (data) => {
    try {
      const val = await authService.signup(data);
      if (val.success) {
        val.data.password = data.firstPassword;
        const newVal = val;
        const loginVal = await authService.login(newVal.data);

        if (loginVal) {
          //check for navigation options (if courselocation display send id too)
          if (location) {
            const path = "/" + location;
            console.log(location)
            switch (location) {
              case "coursedisplay":
              navigate(`${path}?id=${values}`);
                break;
              case "home":
                navigate("")
                break;
              default:
                navigate(`${path}`);
                break;
            }
          } else {
            navigate("");
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#19171E] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-[#211f34]  overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row-reverse min-h-[700px]">
          {/* Input section */}
          <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:px-10 lg:pt-10  text-white font-inter flex flex-col justify-start">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left">
                Sign Up
              </h1>

              <div className="w-full h-max my-5">
                <GoogleLogin />
              </div>

              <div className="text-2xl font-inter flex justify-center mb-3">
                <p>Or</p>
              </div>

              <form onSubmit={handleSubmit(signup)} className="space-y-4">
                {/* Username */}
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                    className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.username && (
                    <p className="text-red-400 text-xs mt-1 px-4">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.email && (
                    <p className="text-red-400 text-xs mt-1 px-4">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("firstPassword")}
                    className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.firstPassword && (
                    <p className="text-red-400 text-xs mt-1 px-4">
                      {errors.firstPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword")}
                    className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 px-4">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    checked={checkbox}
                    onChange={(e) => setCheckbox(e.target.checked)}
                    className="w-4 h-4 mt-1 accent-[#fd3556] focus:ring-2 focus:ring-[#fd3556]"
                  />
                  <p className="text-sm text-gray-300 leading-relaxed">
                    I agree with the privacy policy and terms of service
                  </p>
                </div>
                {errors?.checkbox && (
                  <p className="text-red-400 text-xs px-4">
                    {errors.checkbox.message}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full h-11 text-lg font-semibold bg-[#fd3556]   text-white rounded-full hover:bg-[#e52e4a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:ring-offset-2 focus:ring-offset-[#1e1d2a] mt-6 ${
                    checkbox ? "bg-red-500" : "bg-red-300"
                  }`}
                  disabled={!checkbox}
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="inline text-gray-300">
                  Already have an account?{" "}
                </p>
                <Link
                  to="/app/auth/login"
                  className="text-[#fd3556] hover:text-[#e52e4a] transition-colors font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Illustration section */}
          <div className="w-full lg:w-3/5 bg-gradient-to-bl from-[#2a2831] to-[#1e1d2a] flex items-center justify-center p-6 lg:p-8 order-first lg:order-none">
            <div className="max-w-lg w-full">
              <img
                src={illustration}
                alt="Signup illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
