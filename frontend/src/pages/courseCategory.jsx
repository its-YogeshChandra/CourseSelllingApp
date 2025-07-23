import React, { useState } from "react";
import CourseFilteringNavbar from "../components/course.category.navbar";
import CourseSectionCard from "../components/subCompnents/courseSection.card.jsx";
import TopCategoriesSection from "../components/course.category.top-category.jsx";
import Footer from "../components/footer.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { courseServices } from "../services/courseService.js";
import {
  addCourse,
  deleteCourse,
} from "../services/redux.store/courseData.slice.js";

export default function CourseCategory() {
  const [courseData, setCourseData] = useState([]);
  const [dataNeeded, setDataNeeded] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const dispatch = useDispatch();
  const courseArr = [
    "See All",
    "Programming",
    "Art & Design",
    "Business & Finance",
    "Health & Fitness",
  ];

  //calling api service and getting data
  useEffect(() => {
    const handlerfunction = async () => {
      const response = await courseServices.getCourseData();
      if (response) {
        //append data to redux store
        dispatch(addCourse(response.data));
        setTimeout(() => {
          setDataNeeded((prev) => !prev);
        }, 200);
      }
    };
    handlerfunction();
  }, []);

  //for displaying value on every page reload
  const value = useSelector((state) => {
    return state.courseData.allcourses;
  });
  useEffect(() => {
    setCourseData(value);
  }, [dataNeeded]);

  //function for changing courses according to the selection
  const data = useSelector((state) => {
    return state.courseData.allcourses;
  });

  useEffect(() => {
    if (activeTab === "See All") {
      setCourseData(value);
    } else {
      //update the value of the courseData
      const meta = activeTab.toLowerCase();
      const neededval = data.filter((e) => {
        return e.category === meta;
      });
      setCourseData(neededval);
    }
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen relative font-inter overflow-x-hidden">
      {/* Hero Section */}
      <div className="w-full h-[400px] max-md:h-[320px] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1590059192860-8a218d1d1934?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTA1fHxjb3Vyc2VzfGVufDB8MHwwfHx8Mg%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-800/70 flex items-center lg:pl-20 justify-center lg:justify-start">
          <p className="text-4xl md:text-5xl font-extrabold text-white">
            Courses
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full mt-2 px-4 sm:px-6 lg:px-10">
        {/* Filtering Navbar */}
        <div className="w-full py-6 flex justify-center">
          <CourseFilteringNavbar />
        </div>

        {/* Grid Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[0.35fr_1fr] gap-6">
          {/* Sidebar */}
          <div className="w-full lg:border-r-2 lg:border-gray-200 lg:pr-2">
            <div className="w-full p-4 border border-gray-200 shadow-sm rounded-md">
              <div className="bg-red-100 border border-red-200 text-gray-900 text-sm font-medium px-4 py-2 rounded-sm mb-4">
                Category
              </div>
              <div className="flex flex-col text-gray-700 text-sm gap-y-3">
                {courseArr.map((e) => (
                  <div
                    key={e}
                    className="flex items-center gap-x-3  text-gray-800"
                  >
                    {/* <input
                      type="checkbox"
                      className="w-4 h-4"
                      
                      }}
                    /> */}
                    <button
                    onClick ={()=>{
                      setActiveTab(e)
                    }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === e
                          ? "text-red-500 bg-red-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {e}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courseData.map((e) => (
              <CourseSectionCard key={e._id} data={e} />
            ))}
          </div>
        </div>
      </div>

      <TopCategoriesSection />
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
}
