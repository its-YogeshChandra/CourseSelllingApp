import React, { useState, useEffect } from "react";
import CoursePlaylist from "../components/course.playlist ";
import CoursePlayerComp from "../components/course.player.jsx";
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
    <div className="min-h-screen bg-gray-50/50 w-full overflow-x-hidden font-inter pt-20 lg:pt-24">
      {/* 
        Grid layout: 
        1 column on mobile (player stacks on top of playlist)
        2 columns on large screens with fixed width for playlist 
      */}
      <div className="max-w-[1600px] mx-auto p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-[1fr_450px] lg:grid-cols-[1fr_350px] gap-6 lg:gap-8 items-start">
        
        {/* Left Side: Player Area */}
        <div className="w-full flex flex-col">
          <CoursePlayerComp selectedDataType={selectedDataType} />
        </div>
        
        {/* Right Side: Playlist Area (Sticky on Desktop) */}
        <div className="w-full xl:sticky xl:top-24 mt-2 xl:mt-0">
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
