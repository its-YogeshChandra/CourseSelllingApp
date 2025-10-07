import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function CourseSectionCard({ data }) {
  const navigate = useNavigate();
  const [isEnrollCourse, setisEnrollCourse] = useState(false);

  useEffect(() => {
    //send data through id into the coursedisplay section
    if (isEnrollCourse == true) {
      navigate(`/coursedisplay?id=${data._id}`);
    }
  }, [isEnrollCourse]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden font-inter">
      <div className="relative h-50 bg-gradient-to-r from-red-900 to-red-700">
        <img
          src={data.thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-4 flex gap-2">
          <span className="bg-[#151522] text-white px-2 py-1 rounded-full text-sm ">
            {data.category || Business & Finance}
          </span>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Online Course
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{data.title}</h3>
        {/* <div className="flex items-center mb-6">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Richard David"
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-gray-600">Richard David</span>
        </div> */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-red-500">
              {data.price.currency}{" "}
            </span>
            <span className="text-2xl font-bold text-red-500">
              {data.price.price}{" "}
            </span>
          </div>

          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg"
            onClick={() => {
              setisEnrollCourse((prev) => !prev);
            }}
          >
            Enroll Course →
          </button>
        </div>
      </div>
    </div>
  );
}
