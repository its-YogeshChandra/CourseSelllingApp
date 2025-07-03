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
  addlesson,
  updatelesson
} from "../../../services/indexed.db/db.js";
import { nanoid } from "@reduxjs/toolkit";

export function UploadNewCourse() {
  const [step, setStep] = useState("course");
  const [course, setCourse] = useState({
    item: "center",
    lessons: [],
  });

  console.log(course);

  const handleCourseSubmit = async (courseData) => {
    if (!courseData.title || !courseData.description || !courseData.category) {
      toast.error("course Data is missing", { description: "Missing data" });
      return;
    }

    //add data to course model in indexedDb
    const addData = await addData(courseData);
    console.log(addData);
    const collectedData = await getData(courseData.id);
    console.log(collectedData);
    if (getData) {
      setCourse((prev) => ({
        ...prev,
        collectedData,
      }));
    }
    //check for data and send toast success or error
    if (course.keys.length > 0) {
      setStep("lessons");
      toast.success("Course Created", {
        description: "Now you can start adding lessons to your course.",
      });
    } else {
      toast.error("error", {
        description: "course creating failed.",
      });
    }
  };


  const handleLessonsComplete = async (data) => {
    console.log(data);
  //checking for data has lessons
    if (!data) {
      toast.error("No lesson", {
        description: "please add atleast one course",
      });
    }
   //addlesson and update the courseobject id 
    const addlesson = await addlesson(data, course.id)
    console.log(addlesson);
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
