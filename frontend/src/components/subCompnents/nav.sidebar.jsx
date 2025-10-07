import React from "react";
import logo from "../../assets/logo.png";
import { DivideCircle } from "lucide-react";

function NavSidebar({clickHandler}) {
  const navArr = ["Home", "Courses", "About Us", "Contact Us"];
 
  return (
    <div className="w-full h-[780px] px-10 py-10 bg-black  text-white font-inter">
      <div className="w-full h-full flex flex-col flex-wrap gap-y-5">
        <div className="w-full h-[20%]  flex flex-row flex-wrap items-center ">
          <div className="w-[50%] h-[55%] flex flex-row items-center">
            <img
              src={logo}
              className="w-[40%] h-full max-[550px]:w-[35%] max-[550px]:h-[75%] "
              alt=""
            />
            <p className="text-2xl">LearnVerge</p>
          </div>

          <button
            className="w-[50%] h-[55%]  flex items-center place-content-end"
            onClick={() => {
              clickHandler((prev) => {
                return !prev;
              });
            }}
          >
            <i className="bx  bx-x bg-red-500 p-1 text-white text-2xl"></i>
          </button>
        </div>
        <div className="w-full h-max flex flex-col gap-y-2">
          {navArr.map((e) => (
            <button
              key={e}
              className="flex flex-row justify-between  pb-3 border-b border-white text-lg font-medium text-white font-inter">
              <p className="ml-1">{e}</p>
              <div className="w-max h-max px-2 border-2 border-slate-400">
                <p className="text-white"> {">"}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="w-full h-max  font-inter pb-10  mt-5 border-b border-white ">
          <p className="text-2xl font-medium ml-1">Get In Touch</p>
          <div className="w-max h-max flex flex-col flex-wrap gap-y-3 mt-5">
            <div className="w-full h-max flex items-center flex-row gap-x-3">
              <div className="w-max h-max p-3 bg-red-500 rounded-full flex items-center">
                <i className="bx bx-envelope text-2xl font-light "></i>
              </div>
              <button className="w-max h-max ">
                <p className="flex align-baseline">Email</p>
                <p>info@gmail.com</p>
              </button>
            </div>
            <div className="w-full h-max flex items-center flex-row gap-x-3">
              <div className="w-max h-max p-3 bg-red-500 rounded-full flex items-center">
                <i className="bxr bx-phone text-2xl font-light " />
              </div>
              <button className="w-max h-max ">
                <p className="flex align-baseline">Phone</p>
                <p>{"(00)45611227890"}</p>
              </button>
            </div>
            <div className="w-full h-max flex items-center flex-row gap-x-3">
              <div className="w-max h-max p-3 bg-red-500 rounded-full flex items-center">
                <i className="bx  bx-location-alt-2 text-2xl font-light"></i>
              </div>
              <button className="w-max h-max">
                <p className="flex align-baseline">Location</p>
                <p>132 Village Dr, State College</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavSidebar;
