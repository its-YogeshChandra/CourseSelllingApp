import React from "react";
import { useForm } from "react-hook-form";
import logpage from "../assets/askin.png";
import GoogleLogin from "./googleSignin.jsx";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();
  const Login = (data) => {};

  return (
    <div className="w-screen h-screen bg-[#19171E] flex flex-wrap justify-center">
      <div className="w-[80%] h-[80%] bg-[#1e1d2a] my-auto flex flex-wrap flex-row">
        {/*input section */}
        <div className="w-[40%] h-auto min-h-20 text-white px-10 font-inter ">
          <p className="text-3xl mt-5 font-inter font-bold ">Log In</p>
          <form
            onSubmit={handleSubmit(Login)}
            className="w-full h-auto max-h-full mt-7 flex flex-wrap flex-col gap-y-5 text-white"
          >
            <input
              type="text"
              placeholder="Username"
              {...register("username/email", {
                required: true,
              })}
              className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
            />

            <input
              type="password"
              placeholder="Password"
              {...register("firstPassword", {
                required: true,
              })}
              className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
            />

            <button className="w-full h-auto text-[18px] py-1 rounded-3xl font-semibold bg-[#fd3556]">
              Log In
            </button>
          </form>

          <p className="mt-10 text-[18px] flex justify-center ">
            {" "}
            Or Sign In with{" "}
          </p>
          <div className="mt-5">
            <GoogleLogin />
          </div>
        </div>

        {/* illustration section */}
        <div className="w-[60%] h-full flex justify-center py-5 ">
          <img src={logpage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
