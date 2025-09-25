import React, { useState } from "react";
import CoursePlaylist from "../components/course.playlist ";
import CoursePlayerComp from "../components/course.player.jsx";
import { useEffect } from "react";
import { courseServices } from "../services/courseService.js";

export default function CoursePlayer() {
  const [isVideo, setisVideo] = useState(true);
  const courseId = "68773d54730e38b196734fb3";
  const [courseData, setCourseData] = useState();
  const [lessonData, setlessonData] = useState();
  const [selectedDataType, setSelectedDataType] = useState({
    dataType: null,
    url: null,
    id: null,
  });

  useEffect(() => {
    // downlod the course content with the data
    const func = async () => {
      const response = await courseServices.getCourseandLessonData(courseId);
      //set the course and lesson data
      setCourseData(response.data.course);
      setlessonData(response.data.lessons);
    };
    func();
  }, []);

  return (
    <div className=" w-screen max-w-screen overflow-x-hidden h-max grid grid-cols-[1fr_0.5fr] grid-rows-1  max-lg:grid max-lg:grid-cols-1 max-lg:grid-rows-[1fr_1fr]">
      {" "}
      {/* change color for better quality*/}
      <div className="  flex flex-col py-3 pl-2 max-md:p-1 gap-y-2 ">
        {" "}
        {/* change color for better quality*/}
        <div className="w-full h-max pr-[8px] ">
          {" "}
          <CoursePlayerComp selectedDataType={selectedDataType} />
        </div>
      </div>
      <div className=" w-full">
        {/* change color for better quality*/}
        <div className="w-full h-full  lg:pt-18 pl-[8px] pr-[16px] ">
          <CoursePlaylist
            coursefullData={courseData}
            lessonData={lessonData}
            setSelectedDataType={setSelectedDataType}
          />
        </div>
      </div>
    </div>
  );
}
