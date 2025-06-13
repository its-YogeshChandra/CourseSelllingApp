import React, { useState } from "react";
import CoursePlaylist from "../components/course.playlist ";
import CoursePlayerComp from "../components/course.player.jsx";

export default function CoursePlayer() {
  const [isVideo, setisVideo] = useState(true);

  return (
    <div className=" w-screen max-w-screen overflow-x-hidden h-max grid grid-cols-[1fr_0.5fr] grid-rows-1 bg-gray-600 max-lg:grid max-lg:grid-cols-1 max-lg:grid-rows-[1fr_1fr]">
      {" "}
      {/* change color for better quality*/}
      <div className=" bg-green-400 flex flex-col py-3 pl-2 max-md:p-1 gap-y-2 ">
        {" "}
        {/* change color for better quality*/}
        <div className="w-full h-max ">
          {" "}
          {/* change color for better quality*/}
          {isVideo ? <CoursePlayerComp /> : null}
        </div>
      </div>
      <div className=" w-full">
        {" "}
        {/* change color for better quality*/}
        <div className="w-full h-full bg-red-500 lg:pt-18 ">
          <CoursePlaylist />
        </div>
      </div>
    </div>
  );
}
