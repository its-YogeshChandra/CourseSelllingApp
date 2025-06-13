import React from "react";
import CourseFilteringNavbar from "../components/course.category.navbar";

export default function CourseCategory() {
  const courseArr = [
    "Web Development",
    "Mobile App Development",
    "Game Development",
    "Data Science",
    "Machine Learning / AI",
    "Cloud Computing (AWS, Azure, GCP)",
    "Cybersecurity",
    "DevOps & SRE",
    "Blockchain & Web3",
    "IT & Networking",
  ];
  return (
    <div className="w-full min-h-screen relative font-inter  overflow-x-hidden">
      <div className="w-full h-[400px]  max-md:h-[320px] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1590059192860-8a218d1d1934?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTA1fHxjb3Vyc2VzfGVufDB8MHwwfHx8Mg%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-800/70 flex items-center lg:pl-20 max-lg:justify-center">
          <p className="text-5xl font-extrabold text-white">Courses</p>
        </div>
      </div>

      <div className="w-full min-h-[800px] h-auto mt-2 overflow-x-hidden">
        <div className="w-screen px-10 h-auto flex place-content-center">
          <CourseFilteringNavbar />
        </div>
        <div className="w-full h-[500px] bg-red-400 grid grid-rows-1 grid-cols-[0.35fr_1fr] px-10 ">
          <div className="w-full h-full bg-green-300">
            <div className="w-full max-w-sm p-4 bg-white  shadow-sm border border-gray-200">
              <div className="bg-red-50 border border-red-200 text-gray-900 text-sm font-medium px-4 py-2 rounded-md mb-4">
                Category
              </div>
              <div className="flex flex-col items-center space-x-2 text-gray-500 text-sm">
                { 
                  courseArr.map((e) => {
                    return (
                      <div
                        className="w-full flex flex-row ">
                        <div className="w-auto h-auto flex flex-col ">
                          {" "}
                          <input
                           
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-indigo-600"
                          />
                        </div>

                        <button >{e}</button>
                      </div>
                    );    
                  })
                }
                
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
}
