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
  updatelesson,
  deleteLesson,
} from "../../../services/indexed.db/db.js";
import { nanoid } from "@reduxjs/toolkit";
import { object } from "zod";
import localStorageService from "../../../services/localStorage.js";

export function UploadNewCourse() {
  const [step, setStep] = useState("course");
  const [course, setCourse] = useState({
    lessons: [],
  });

  console.log(course);
  console.log(course.lessons.length);

  const handleCourseSubmit = async (courseData) => {
    if (!courseData.title || !courseData.description || !courseData.category) {
      toast.error("course Data is missing", { description: "Missing data" });
      return;
    }

    //add data to course model in indexedDb
    if (Object.keys(course).length < 3) {
      toast.error("course Data is missing", { description: "Missing data" });
    }
    const dataval = { ...courseData };
    const addcourseData = await addData(dataval);
    const collectedData = await getData();

    if (collectedData) {
      const reqCourse = collectedData.filter((e) => e.id === courseData.id);
      setCourse(reqCourse[0]);
      //set course in localStorage
      localStorageService.setinStorage("courseData", reqCourse);
    }
    //check for data and send toast success or error
    if (Object.keys(course).length > 0) {
      //setting step
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

  //for adding lessons
  const handleLessonsComplete = async (data, courseId) => {
    console.log(data);
    //checking for data has lessons
    if (!data) {
      toast.error("No lesson", {
        description: "please add atleast one course",
      });
    }
    //addlesson and update the courseobject id
    const addthelesson = await addlesson(data, courseId);
    //get course and update the course state
    const valfromdb = await getData();
    const neededVal = valfromdb.filter((e) => e.id === courseId);
    console.log(neededVal[0]);
    setCourse(neededVal[0]);
  };

  //delete lessons
  const delLesson = async (courseId, lessonId) => {
    //checking for data has lessons
    if (!courseId || !lessonId) {
      toast.error("missing data", {
        description: "Internal service error",
      });
    }
    //deletelesson and update the courseobject id
    const deletetheLesson = await deleteLesson(courseId, lessonId);
    console.log(deletetheLesson);
    //get course and update the course state
    const valfromdb = await getData();
    const neededVal = valfromdb.filter((e) => e.id === courseId);
    console.log(neededVal);
    localStorageService.setinStorage("courseData", neededVal[0]);
    setCourse(neededVal[0]);
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
  const onPageClose = () => {
    setStep("publish");
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
          onDeletingLesson={delLesson}
          onClosingPage={onPageClose}
        />
      )}

      {step === "publish" && (
        <PublishCourse
          course={course}
          onBackToLessons={() => goBackToStep("lessons")}
          onBackToCourse={() => goBackToStep("course")}
          setCourse={setCourse}
          setStep = {setStep}
        />
      )}
    </div>
  );
}
