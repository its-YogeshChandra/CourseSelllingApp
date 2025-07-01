import React, { useState } from "react";
import { CourseForm } from "./course-form";
import { LessonManager } from "./lesson-manager";
import { PublishCourse } from "./publish-course.jsx";
import { ProgressIndicator } from "./progress-indicator";
import { toast } from "sonner";
import {
  addData,
  deleteData,
  getData,
} from "../../../services/indexed.db/db.js";
import { nanoid } from "@reduxjs/toolkit";

export function UploadNewCourse() {
  const [step, setStep] = useState("course");
  const [course, setCourse] = useState({
    item: "center",
    lessons: [],
  });
 
console.log(course)

  const handleCourseSubmit = (courseData) => {
    if (!courseData.title || !courseData.description || !courseData.category) {
      toast.error("course Data is missing", { description: "Missing data" });
      return;
    }
    debugger
    setCourse((prev) => ({ ...prev, ...courseData }));
    // console.log(course)
    setStep("lessons");
    toast.success("Course Created", {
      description: "Now you can start adding lessons to your course.",
    });
  };

  const handleLessonsComplete = async (data) => {
    console.log(data);
     
    if (course.lessons.length === 0) {
      toast.error("No lesson", {
        description: "please add atleast one course",
      });

      console.log(` lessons are : ${data}`);
      debugger;
      if (data) {
        course.id = nanoid();
        setCourse((prev) => (
          {
          ...prev,
          lessons: [...prev.lessons, data],
        }));


        const dbrequest = await addData(course);
        console.log(dbrequest);

        const courdata = await getData(course.id);
        console.log(courdata);
        setStep("publish");

        toast("Lessons Ready", {
          description:
            "Your lessons are ready. You can now publish your course.",
        });
      }
    }
  };

  const handlePublishCourse = () => {
    // toast
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setCourse({
      title: "",
      description: "",
      category: "",
      lessons: [],
    });
    setStep("course");
    toast;
  };

  const goBackToStep = (targetStep) => {
    setStep(targetStep);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProgressIndicator step={step} hasLessons={course.lessons.length > 0} />

      {step === "course" && (
        <CourseForm
          course={course}
          onSubmit={handleCourseSubmit}
          onReset={resetForm}
        />
      )}

      {step === "lessons" && (
        <LessonManager
          course={course}
          onBackToCourse={() => goBackToStep("course")}
          onContinueToPublish={handleLessonsComplete}
        />
      )}

      {step === "publish" && (
        <PublishCourse
          course={course}
          onBackToLessons={() => goBackToStep("lessons")}
          onBackToCourse={() => goBackToStep("course")}
          onPublish={handlePublishCourse}
        />
      )}
    </div>
  );
}
