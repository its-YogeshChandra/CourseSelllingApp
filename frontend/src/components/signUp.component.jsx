import React from "react";
import illustration from "../assets/illustration.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { check } from "zod/v4";

const regexCheck = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
);

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string().min(3).max(15),
    email: z.string().email(),
    firstPassword: z
      .string()
      .regex(
        regexCheck,
        "Password must contain at least one uppercase, one lowercase, and one number"
      ),
    confirmPassword: z
      .string()
      .regex(
        regexCheck,
        "Password must contain at least one uppercase, one lowercase, and one number"
      ),
  })
  .refine((val) => val.firstPassword === val.confirmPassword, {
    message: "pasword doesn't match",
    path: ["confirmPassword"],
  });

function Signup() {
  const [checkbox, setCheckbox] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const signup = (data) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-screen bg-[#19171E] flex flex-wrap justify-center">
      <div className="w-[80%] h-[80%] bg-[#1e1d2a] my-auto flex flex-wrap flex-row">
        {/* illustration section */}
        <div className="w-[60%] h-auto min-h-20 pt-10">
          <img src={illustration} alt="" />
        </div>

        {/*input section */}
        <div className="w-[40%] h-auto min-h-20 text-white px-10 font-inter ">
          <p className="text-3xl mt-5 font-inter font-bold ">Sign Up</p>
          <form
            onSubmit={handleSubmit(signup)}
            className="w-full h-auto max-h-full mt-7 flex flex-wrap flex-col gap-y-5 text-white"
          >
            <div className="w-auto h-auto flex flex-wrap flex-row justify-between">
              <input
                type="text"
                placeholder="firstName"
                {...register("firstName", {
                  required: true,
                })}
                className=" w-[48%] h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
              />

              <input
                type="text"
                placeholder="lastName"
                {...register("lastName", { required: true })}
                className="w-[48%] h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
              />
            </div>

            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: true,
              })}
              className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
            />
            {errors?.username && (
              <div className="text-red-500 text-sm">
                {errors.username.message}
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
            />
            {errors?.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("firstPassword", {
                required: true,
              })}
              className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
            />

            {errors?.firstPassword && (
              <div className="text-red-500 text-sm">
                {errors.firstPassword.message}
              </div>
            )}

            <input
              type="password"
              placeholder=" Confirm Password"
              {...register("confirmPassword", { required: true })}
              className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
            />
            {errors?.confirmPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </div>
            )}

            <div className=" w-full h-auto px-2 flex flex-wrap flex-row gap-x-3 ">
              <input
                type="checkbox"
                checked={checkbox}
                onClick={(e) => setCheckbox(e.target.checked)}
                {...register("checkbox", { required: true })}
                className="w-[16px] h-[16px] mt-1"
              />

              <p className="text-[18px] text-white ">
                I Agree with privacy and policy
              </p>
            </div>

            {checkbox ? (
              <button className="w-full h-auto text-[18px] py-1 rounded-3xl font-semibold bg-[#fd3556]">
                Sign Up
              </button>
            ) : null}
          </form>
          <div className="w-full h-auto max-h-full flex flex-wrap flex-row justify-center gap-x-4">
            <p className=" mt-5"> Already have an account ? </p>
            <button type="submit" className="text-[#fd3556] mt-5">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
