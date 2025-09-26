import { Play, Clock, Users, Calendar, BarChart3 } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import authService from "../services/auth";
import { useNavigate } from "react-router";
import { courseServices } from "../services/courseService.js";
export default function CourseBuyCard({ courseData }) {
  const [course, setCourse] = useState({
    title: "",
    category: "",
    thumbnail: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (courseData != undefined) {
      const pricekeyArr = [
        { currency: "GBP", icon: "£" },
        { currency: "USD", icon: "$" },
        { currency: "INR", icon: "₹" },
        { currency: "EUR", icon: "€" },
      ];
      pricekeyArr.map((e) => {
        if (e.currency == courseData.price.currency) {
          const displayPrice = e.icon + courseData.price.price;
          setCourse((prev) => ({
            ...prev,
            title: courseData.title,
            category: courseData.category,
            thumbnail: courseData.thumbnail,
            price: displayPrice,
          }));
        }
      });
    }
  }, [courseData]);

  //check for user signup or not
  const checker = async () => {
    const data = await authService.authMehandler();

    if (data.success == true) {
      //check if user has subscribed to the course
      const studentId = data.data._id;
      const val = await courseServices.isSubscribed(courseData._id, studentId);
      if (val.success == true) {
      } else {
        const meta = {
          location: "coursedisplay",
          data: courseData._id || "",
          studentId: studentId || ""
        };
        const query = new URLSearchParams(meta).toString();
        navigate(`/app/cart?${query}`);
      }
    } else {
      const meta = {
        location: "coursedisplay",
        data: courseData._id || "",
      };
      const query = new URLSearchParams(meta).toString();
      navigate(`/app/auth/signup?${query}`);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto md:max-w-none max-[640px]:max-w-none sm:max-w-none lg:max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg border border-gray-200 ">
      {/* Thumbnail Section */}
      <div className="relative group cursor-pointer">
        <img
          src={course.thumbnail || "/placeholder.svg?height=200&width=400"}
          alt="CSS Flexbox Course Thumbnail"
          className="w-full h-48 object-cover"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
          <div className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" />
          </div>
        </div>
        {/* Course Category Badge */}
        <span className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
          {course.category || "Web Design"}
        </span>
      </div>

      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {course.title || "CSS Flexbox Part-10"}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 mb-4">
          C++ Tutorial by Tech Vander
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {" "}
              {course.price || "$100.00"}{" "}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          onClick={() => {
            checker();
          }}
        >
          Add to Cart
        </button>

        {/* Meta Information */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            {/* Difficulty & Enrolled */}
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-orange-500" />
              <span>Beginner</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-500" />
              <span>1 student</span>
            </div>

            {/* Duration & Last Updated */}
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>50 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-xs">May 3, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
