import { useState } from "react";
import { Play, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function CoursePlayerComp({ selectedDataType }) {
  const [isDescriptionClicked, setisDescriptionClicked] = useState(true);

  if (selectedDataType.dataType !== null) {
    return (
      <div className="w-full space-y-6 font-inter animate-fade-in">
        {/* Player Container */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800 ring-1 ring-white/10 relative group">
          <div className="relative aspect-video w-full flex items-center justify-center bg-black">
            {selectedDataType.dataType === "image" && (
              <img
                src={selectedDataType.url}
                alt="Course Content"
                className="w-full h-full object-contain"
              />
            )}
            {selectedDataType.dataType === "notes" && (
              <div className="w-full h-full overflow-auto bg-gray-100">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer fileUrl={selectedDataType.url} />
                </Worker>
              </div>
            )}
            {selectedDataType.dataType === "video" && (
              <>
                <img
                  src="https://images.unsplash.com/photo-1749576502498-9841e9867d96?q=80&w=2122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Course Video Thumbnail"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/30 transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1 fill-white" />
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Subtle progress bar at bottom of video (decorative) */}
          {selectedDataType.dataType === "video" && (
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-700">
              <div className="h-full bg-indigo-500 w-1/3 rounded-r-full" />
            </div>
          )}
        </div>

        {/* Course Description Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
          <button
            onClick={() => setisDescriptionClicked(!isDescriptionClicked)}
            className="w-full flex items-center justify-between p-5 lg:p-6 bg-white hover:bg-gray-50 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm border border-indigo-100/50">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">About This Lesson</h2>
            </div>
            <div className={`p-2 rounded-full transition-colors ${isDescriptionClicked ? 'bg-gray-100' : 'bg-transparent'}`}>
              {isDescriptionClicked ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out ${
              isDescriptionClicked ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-5 lg:p-6 pt-0 border-t border-gray-50">
              <CourseDescrip />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state if nothing is selected
  return (
    <div className="w-full mt-4 lg:mt-8 aspect-video rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50 shadow-inner">
      <div className="p-4 bg-white rounded-full shadow-sm mb-4">
        <Play className="w-8 h-8 text-indigo-300 ml-1 fill-indigo-100" />
      </div>
      <p className="font-semibold text-gray-500 text-lg">Select a lesson to begin learning</p>
      <p className="text-sm text-gray-400 mt-2">Choose an item from the playlist on the right</p>
    </div>
  );
}

function CourseDescrip() {
  return (
    <div className="space-y-4 text-gray-600 leading-relaxed text-sm lg:text-base font-medium">
      <p>
        Welcome to the Modern Web Development course! In this introduction,
        we'll cover the fundamental concepts and technologies you'll be learning
        throughout this comprehensive program.
      </p>
      <p className="text-gray-500">
        This course is designed for beginners and intermediate developers who
        want to build modern, responsive web applications using the latest
        technologies and best practices. Prepare to unlock a whole new dimension of creativity.
      </p>
    </div>
  );
}
