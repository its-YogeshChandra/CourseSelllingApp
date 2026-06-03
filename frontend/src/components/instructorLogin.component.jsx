import React from "react";
import { useForm } from "react-hook-form";
import illustration from "../assets/teacher_2 copy.jpg";
import { useNavigate } from "react-router";

function InstructorLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      // TODO: Add actual API calling logic here
      // For now, leaving space where functions should be called
      // const loginResponse = await instructorAuthService.login(data);
      // if (loginResponse.success) {

      // On successful login, redirect to instructor dashboard
      navigate("/instructor/dashboard");

      // }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const navigateToSignup = () => {
    navigate("/instructor/signup");
  };

  return (
    <div className="min-h-screen w-full bg-[#19171E] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-[#1e1d2a] rounded-lg overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Input section */}
          <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 text-white font-inter flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center lg:text-left">
                Instructor Log In
              </h1>

              <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Work Email"
                    {...register("workEmail", {
                      required: "Work email is required",
                    })}
                    className="w-full h-12 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.workEmail && (
                    <p className="text-red-400 text-sm mt-1 px-4">
                      {errors.workEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Profile Password"
                    {...register("profilePassword", {
                      required: "Password is required",
                    })}
                    className="w-full h-12 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors?.profilePassword && (
                    <p className="text-red-400 text-sm mt-1 px-4">
                      {errors.profilePassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-[#fd3556] text-white rounded-full hover:bg-[#e52e4a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:ring-offset-2 focus:ring-offset-[#1e1d2a]"
                >
                  Log In
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={navigateToSignup}
                  className="w-full h-11 text-lg font-semibold border-2 border-[#fd3556] text-[#fd3556] bg-transparent rounded-full hover:bg-[#fd3556] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:ring-offset-2 focus:ring-offset-[#1e1d2a]"
                >
                  Go to Instructor Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Illustration section */}
          <div className="w-full lg:w-3/5 bg-gradient-to-br from-[#2a2831] to-[#1e1d2a] flex items-center justify-center p-6 lg:p-8">
            <div className="w-full h-full max-w-lg flex items-center justify-center">
              <img
                src={illustration}
                alt="Instructor Login illustration"
                className="w-full h-auto object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorLogin;
