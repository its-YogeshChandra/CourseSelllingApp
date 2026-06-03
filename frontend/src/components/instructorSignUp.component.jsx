import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import illustration from "../assets/teacher_2 copy.jpg";

const regexCheck = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
);

const schema = z
  .object({
    instructorName: z
      .string()
      .min(3, "Instructor name must be at least 3 characters")
      .max(50, "Instructor name must be at most 50 characters"),
    workEmail: z.string().email("Please enter a valid work email address"),
    profilePassword: z
      .string()
      .regex(
        regexCheck,
        "Password must contain at least one uppercase, one lowercase, one number and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((val) => val.profilePassword === val.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function InstructorSignup() {
  const [checkbox, setCheckbox] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const navigatetoLogin = () => {
    navigate("/instructor/login");
  };

  const signup = async (data) => {
    try {
      // TODO: Add actual API calling logic here
      // For now, leaving space where functions should be called
      // const response = await instructorAuthService.signup(data);
      // if (response.success) {
      //   const loginResponse = await instructorAuthService.login({ email: data.workEmail, password: data.profilePassword });
      //   if (loginResponse.success) {

      // On successful signup and login, redirect to instructor dashboard
      navigate("/instructor/dashboard");

      //   }
      // }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#19171E] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-[#211f34] overflow-hidden shadow-2xl rounded-lg">
        <div className="flex flex-col lg:flex-row-reverse min-h-[700px]">
          {/* Input section */}
          <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:px-10 lg:pt-10 text-white font-inter flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left">
                Instructor Sign Up
              </h1>

              <form onSubmit={handleSubmit(signup)} className="space-y-4">
                {/* Instructor Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Instructor Name"
                    {...register("instructorName")}
                    className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.instructorName && (
                    <p className="text-red-400 text-xs mt-1 px-4">
                      {errors.instructorName.message}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Work Email"
                    {...register("workEmail")}
                    className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.workEmail && (
                    <p className="text-red-400 text-xs mt-1 px-4">
                      {errors.workEmail.message}
                    </p>
                  )}
                </div>

                {/* Profile Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Profile Password"
                    {...register("profilePassword")}
                    className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.profilePassword && (
                    <p className="text-red-400 text-xs mt-1 px-4">
                      {errors.profilePassword.message}
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
                  className={`w-full h-11 text-lg font-semibold bg-[#fd3556] text-white rounded-full hover:bg-[#e52e4a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:ring-offset-2 focus:ring-offset-[#1e1d2a] mt-6 ${
                    checkbox ? "bg-red-500" : "bg-red-300"
                  }`}
                  disabled={!checkbox}
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={navigatetoLogin}
                  className="w-full h-11 text-lg font-semibold border-2 border-[#fd3556] text-[#fd3556] bg-transparent rounded-full hover:bg-[#fd3556] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:ring-offset-2 focus:ring-offset-[#1e1d2a]"
                >
                  Go to Instructor Login
                </button>
              </div>
            </div>
          </div>

          {/* Illustration section */}
          <div className="w-full lg:w-3/5 bg-gradient-to-bl from-[#2a2831] to-[#1e1d2a] flex items-center justify-center p-6 lg:p-8 order-first lg:order-none">
            <div className="w-full h-full max-w-lg flex items-center justify-center">
              <img
                src={illustration}
                alt="Instructor Signup illustration"
                className="w-full h-auto object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSignup;
