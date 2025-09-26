import { useState, useEffect } from "react";

export default function CourseDisplayCard({ courseData }) {
  const [data, setData] = useState({
    title: "no value",
    description: "value",
    thumbnail: "",
  });
  useEffect(() => {
    if (courseData != undefined) {
      const substr = courseData.courseDescription.substr(0, 99);

      setData((prev) => ({
        ...prev,
        title: courseData.title,
        description: substr,
        thumbnail: courseData.thumbnail,
      }));
    }
  }, [courseData]);

  return (
    <div className="relative h-[400px] sm:h-[458px] md:h-[548px] lg:h-[400px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={
            data.thumbnail ||
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Woman doing strength training"
          fill
          className="w-full h-auto"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:pl-40">
          <div className="max-w-4xl space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {data.title || "Ten Moments Basically Gym Gym Experience"}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl">
              {data.description || "random user one"}
            </p>

            {/* Author Info */}
            {/* <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Sridam Ray"
                  fill
                  className="rounded-full object-cover border border-white/20"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="text-white font-medium text-sm sm:text-base">Sridam Ray</span>
                <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
                <span className="text-gray-300 text-xs sm:text-sm">June 3, 2025</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
