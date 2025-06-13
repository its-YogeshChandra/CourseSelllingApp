import React from "react";

export default function CourseSectionCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-red-900 to-red-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-6xl font-bold text-yellow-400 mb-2"
              style={{ fontFamily: "serif" }}
            >
              PODCAST
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-4 flex gap-2">
          <span className="bg-[#151522] text-white px-2 py-1 rounded-full text-sm">
            Business & Finance
          </span>
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Online Course
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-500 text-sm">📚 4 Lessons</span>
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium ml-1">5.0(01)</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          The power of podcast for storytelling
        </h3>
        <div className="flex items-center mb-6">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Richard David"
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-gray-600">Richard David</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-500">$100.00</span>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg">
            Enroll Course →
          </button>
        </div>
      </div>
    </div>
  );
}
