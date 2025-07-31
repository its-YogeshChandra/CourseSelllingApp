import { useState } from "react";
import { Play, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CoursePlayerComp() {
  const [isDescriptionClicked, setisDescriptionClicked] = useState(false)
  return (
    <div className="w-full  space-y-1 font-inter">
      {/* Course Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Play className="w-6 h-6 text-red-600 fill-current" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Course Introduction
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">25 minutes</span>
            </div>
            <Badge variant="destructive" className="bg-red-600">
              Video
            </Badge>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="overflow-hidden w-full h-max py-2 rounded-3xl">
        <div className="relative aspect-video bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1749576502498-9841e9867d96?q=80&w=2122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Course introduction video thumbnail showing people in a meeting around a table"
            className="object-cover max-[490px]:h-[450px] "
          />{" "}
          {/*has to use real player */}
          <div className="absolute inset-0 bg-black/20" />
          <Button
            size="lg"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white hover:bg-gray-100 text-gray-900"
          >
            <Play className="w-8 h-8 fill-current" />
          </Button>
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

 function CourseDescrip() {
  return (
    <div className="space-y-4 text-gray-700">
            <p>
              Welcome to the Modern Web Development course! In this
              introduction, we'll cover the fundamental concepts and
              technologies you'll be learning throughout this comprehensive
              program.
            </p>
            <p>
              This course is designed for beginners and intermediate
              developers who want to build modern, responsive web applications
              using the latest technologies and best practices.
            </p>
          </div>
  )
}