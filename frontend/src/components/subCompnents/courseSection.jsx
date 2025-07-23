import { useEffect, useState } from "react";
import CourseSectionCard from "./courseSection.card.jsx";
import { courseServices } from "../../services/courseService.js";
import { useSelector, useDispatch } from "react-redux";
import {
  addCourse,
  deleteCourse,
} from "../../services/redux.store/courseData.slice.js";
import { useRandomCourses } from "../../services/customHooks/useRandomCourse.js";

export default function CourseSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [courseData, setCourseData] = useState([]);
  const [dataNeeded, setDataNeeded] = useState(false);
  const dispatch = useDispatch();
  const filterTabs = [
    { label: "See All", active: true },
    { label: "Programming", count: "03" },
    { label: "Business & Finance", count: "09" },
    { label: "Health & Fitness", count: "05" },
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
  const value = useRandomCourses();
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
    <div className="max-w-7xl mx-auto px-4 py-8 mt-4 font-inter">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Find The Right
          <br />
          Online Course For You
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          You don't have to struggle alone, you've got our assistance and help.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4">
          {filterTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(tab.label);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.label
                  ? "text-red-500 bg-red-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {tab.count && <span className="ml-1">({tab.count})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((e) => {
          return <CourseSectionCard key={e._id} data={e} />;
        })}
      </div>
    </div>
  );
}
