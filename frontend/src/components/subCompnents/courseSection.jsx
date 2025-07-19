import { useEffect } from "react";
import CourseSectionCard from "./courseSection.card.jsx";
import { courseServices } from "../../services/courseService.js";
import { useSelector, useDispatch } from "react-redux";
import {
  addCourse,
  deleteCourse,
} from "../../services/redux.store/courseData.slice.js";

export default function CourseSection() {
  const dispatch = useDispatch();
  const filterTabs = [
    { label: "See All", active: true },
    { label: "Data Science", count: "03" },
    { label: "Marketing", count: "09" },
    { label: "Lifestyle", count: "05" },
  ];
  const cardArr = [1, 2, 3, 4, 5, 6];
  const courseData = () => {
    useSelector((state) => {
      return state.courseData.allcourses;
    });
  };
  //calling api service and getting data
  useEffect(() => {
    const handlerfunction = async () => {
      const response = await courseServices.getCourseData();
      if (response) {
        //append data to redux store
        dispatch(addCourse(response.data));
      }
    };
    handlerfunction();
  }, []);

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
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tab.active
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
        {cardArr.map((e) => {
          return <CourseSectionCard key={e} />;
        })}
      </div>
    </div>
  );
}
