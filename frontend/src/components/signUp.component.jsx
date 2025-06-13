// import React from "react";
// import illustration from "../assets/illustration.png";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { check } from "zod/v4";
// import { Link } from "react-router";

// const regexCheck = new RegExp(
//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
// );

// const schema = z
//   .object({
//     firstName: z.string(),
//     lastName: z.string(),
//     username: z.string().min(3).max(15),
//     email: z.string().email(),
//     firstPassword: z
//       .string()
//       .regex(
//         regexCheck,
//         "Password must contain at least one uppercase, one lowercase,one number and one special character"
//       ),
//     confirmPassword: z
//       .string()
//       .regex(
//         regexCheck,
//         "Password must contain at least one uppercase, one lowercase, and one number"
//       ),
//   })
//   .refine((val) => val.firstPassword === val.confirmPassword, {
//     message: "pasword doesn't match",
//     path: ["confirmPassword"],
//   });

// function Signup() {
//   const [checkbox, setCheckbox] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(schema) });

//   const signup = (data) => {
//     console.log(data);
//   };

//   return (
//     <div className="w-screen h-screen bg-[#19171E] flex flex-wrap justify-center">
//       <div className="w-[80%] h-[80%] bg-[#1e1d2a] my-auto flex flex-wrap flex-row">
//         {/* illustration section */}
//         <div className="w-[60%] h-auto min-h-20 pt-10">
//           <img src={illustration} alt="" />
//         </div>

//         {/*input section */}
//         <div className="w-[40%] h-auto min-h-20 text-white px-10 font-inter ">
//           <p className="text-3xl mt-5 font-inter font-bold ">Sign Up</p>
//           <form
//             onSubmit={handleSubmit(signup)}
//             className="w-full h-auto max-h-full mt-7 flex flex-wrap flex-col gap-y-5 text-white"
//           >
//             <div className="w-auto h-auto flex flex-wrap flex-row justify-between">
//               <input
//                 type="text"
//                 placeholder="firstName"
//                 {...register("firstName", {
//                   required: true,
//                 })}
//                 className=" w-[48%] h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
//               />

//               <input
//                 type="text"
//                 placeholder="lastName"
//                 {...register("lastName", { required: true })}
//                 className="w-[48%] h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
//               />
//             </div>

//             <input
//               type="text"
//               placeholder="Username"
//               {...register("username", {
//                 required: true,
//               })}
//               className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
//             />
//             {errors?.username && (
//               <div className="text-red-500 text-sm">
//                 {errors.username.message}
//               </div>
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", { required: true })}
//               className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
//             />
//             {errors?.email && (
//               <div className="text-red-500 text-sm">{errors.email.message}</div>
//             )}

//             <input
//               type="password"
//               placeholder="Password"
//               {...register("firstPassword", {
//                 required: true,
//               })}
//               className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
//             />

//             {errors?.firstPassword && (
//               <div className="text-red-500 text-sm">
//                 {errors.firstPassword.message}
//               </div>
//             )}

//             <input
//               type="password"
//               placeholder=" Confirm Password"
//               {...register("confirmPassword", { required: true })}
//               className="w-full h-auto border-2 border-[#fd3556] pl-2 py-1 rounded-3xl"
//             />
//             {errors?.confirmPassword && (
//               <div className="text-red-500 text-sm">
//                 {errors.confirmPassword.message}
//               </div>
//             )}

//             <div className=" w-full h-auto px-2 flex flex-wrap flex-row gap-x-3 ">
//               <input
//                 type="checkbox"
//                 checked={checkbox}
//                 onClick={(e) => setCheckbox(e.target.checked)}
//                 {...register("checkbox", { required: true })}
//                 className="w-[16px] h-[16px] mt-1"
//               />

//               <p className="text-[18px] text-white ">
//                 I Agree with privacy and policy
//               </p>
//             </div>

//             {checkbox ? (
//               <button className="w-full h-auto text-[18px] py-1 rounded-3xl font-semibold bg-[#fd3556]">
//                 Sign Up
//               </button>
//             ) : null}
//           </form>
//           <div className="w-full h-auto max-h-full flex flex-wrap flex-row justify-center gap-x-4">
//             <p className=" mt-5"> Already have an account ? </p>
//             <Link to="/app/auth/login" className="text-[#fd3556] mt-5">
//               SignIn
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;


import React from "react";
import illustration from "../assets/illustration.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router";

const regexCheck = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,20}$"
);

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
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
    confirmPassword: z
      .string()
      .regex(
        regexCheck,
        "Password must contain at least one uppercase, one lowercase, one number and one special character"
      ),
    checkbox: z.boolean().refine((val) => val === true, {
      message: "You must agree to the privacy policy",
    }),
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
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const signup = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full bg-[#19171E] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-[#1e1d2a]  overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row-reverse min-h-[700px]">
          {/* Input section */}
          <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 text-white font-inter flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left">
                Sign Up
              </h1>

              <form onSubmit={handleSubmit(signup)} className="space-y-4">
                {/* Name fields */}
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="First Name"
                      {...register("firstName")}
                      className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all text-sm"
                    />
                    {errors?.firstName && (
                      <p className="text-red-400 text-xs mt-1 px-4">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName")}
                      className="w-full h-11 border-2 border-[#fd3556] bg-transparent text-white placeholder-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:border-transparent transition-all text-sm"
                    />
                    {errors?.lastName && (
                      <p className="text-red-400 text-xs mt-1 px-4">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

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
                    // {...register("checkbox")}
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
                {checkbox? (
                  <button
                    type="submit"
                    className="w-full h-11 text-lg font-semibold bg-[#fd3556] text-white rounded-full hover:bg-[#e52e4a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#fd3556] focus:ring-offset-2 focus:ring-offset-[#1e1d2a] mt-6"
                  >
                    Sign Up
                  </button>
                ) : null}
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