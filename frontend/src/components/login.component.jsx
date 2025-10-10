import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logpage from "../assets/askin.png";
import GoogleLogin from "./googleSignin.jsx";
import { Link, useNavigate } from "react-router";
import authService from "../services/auth.js";
import validator from "validator";
import { useSearchParams } from "react-router";
import { Button } from "../components/ui/button.js";

function Login() {
  const [logsendData, setLogSendData] = useState(null);
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const values = searchParams.get("data");
  console.log(location);
  console.log(values);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  {
    /* Login logic , navigation, user data parsing */
  }

  const Login = async (data) => {
    const isEmail = validator.isEmail(data.usernameORemail);
    if (isEmail) {
      setLogSendData({
        username: null,
        email: data.usernameORemail,
        password: data.password,
      });
    } else {
      setLogSendData({
        username: data.usernameORemail,
        email: null,
        password: data.password,
      });
    }

    const loginVal = await authService.login(logsendData);

    if (loginVal) {
      if (location) {
        const path = "/" + location;
        console.log(location);
        switch (location) {
          case "coursedisplay":
            navigate(`${path}?id=${values}`);
            break;
          case "home":
            navigate("/");
            break;
          default:
            navigate(`${path}`);
            break;
        }
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#19171E] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-[#1e1d2a] rounded-lg overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Input section */}
          <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 text-white font-inter flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center lg:text-left">
                Log In
              </h1>

              <form onSubmit={handleSubmit(Login)} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Username or Email"
                    {...register("usernameORemail", {
                      required: "Username or email is required",
                    })}
                    className="w-full h-12 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors["username/email"] && (
                    <p className="text-red-400 text-sm mt-1 px-4">
                      {errors["username/email"].message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full h-12 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all"
                  />
                  {errors.firstPassword && (
                    <p className="text-red-400 text-sm mt-1 px-4">
                      {errors.firstPassword.message}
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

              <div className="mt-8">
                <p className="text-center text-lg mb-4">Or Sign In with</p>
                <div className="flex justify-center">
                  <GoogleLogin />
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="inline text-gray-300">Don't have an account? </p>
                <Link
                  to="/auth/signup"
                  className="text-[#fd3556] hover:text-[#e52e4a] transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Illustration section */}
          <div className="w-full lg:w-3/5 bg-gradient-to-br from-[#2a2831] to-[#1e1d2a] flex items-center justify-center p-6 lg:p-8">
            <div className="max-w-lg w-full">
              <img
                src={logpage}
                alt="Login illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
