import { useState } from "react";
import { Play, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function CoursePlayerComp({ selectedDataType }) {
  const [isDescriptionClicked, setisDescriptionClicked] = useState(false);

  if (selectedDataType.dataType !== null) {
    return (
      <div className="w-full space-y-1 font-inter">
        {/* player component*/}
        <div className="overflow-hidden w-full h-max mt-10 ">
          <div className="relative aspect-video mt-6 bg-gray-900">
            {/* can use map */}

            {/* things should render accordingly */}
            {selectedDataType.dataType === "image" && (
              <div className="w-full h-full bg-black flex item-center justify-center">
                <img
                  src={selectedDataType.url}
                  alt="Course introduction video thumbnail showing people in a meeting around a table"
                  className="object-cover"
                />
              </div>
            )}
            {selectedDataType.dataType === "notes" && (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div className="object-cover max-[490px]:h-[450px] overflow-auto">
                  <Viewer fileUrl={selectedDataType.url} />
                </div>
              </Worker>
            )}
            {selectedDataType.dataType === "video" && (
              <img
                src="https://images.unsplash.com/photo-1749576502498-9841e9867d96?q=80&w=2122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Course introduction video thumbnail showing people in a meeting around a table"
                className="object-cover max-[490px]:h-[450px] "
              />
            )}
          </div>
        </div>

        {/* Course Description */}

        <Card className="bg-green-50 border-green-200 rounded-sm max-md:hidden">
          <CardContent className="">
            <div className="flex items-center gap-2 ">
              <FileText className="w-5 h-5 text-green-600" />
              <button
                className="text-lg font-semibold text-green-800"
                onClick={() => {
                  setisDescriptionClicked((prev) => !prev);
                }}
              >
                Course Description
              </button>
            </div>
            {isDescriptionClicked ? <CourseDescrip /> : null}
          </CardContent>
        </Card>
      </div>
    );
  }
}

function CourseDescrip() {
  return (
    <div className="space-y-4 text-gray-700">
      <p>
        Welcome to the Modern Web Development course! In this introduction,
        we'll cover the fundamental concepts and technologies you'll be learning
        throughout this comprehensive program.
      </p>
      <p>
        This course is designed for beginners and intermediate developers who
        want to build modern, responsive web applications using the latest
        technologies and best practices.
      </p>
    </div>
  );
}
