"use client";

import React, { useState } from "react";
import { CourseForm } from "./course-form";
import LessonManager from "./lesson-manager.jsx";
import { ProgressIndicator } from "./progress-indicator";
import { toast } from "sonner";

export function UploadNewCourse() {
  const [step, setStep] = useState("course");
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    lessons: [],
  });

  const handleCourseSubmit = (courseData) => {
    if (!courseData.title || !courseData.description || !courseData.category) {
      toast.error("Missing Information", {
        description: "Please fill in all required course details.",
        
      });
      return;
    }

    setCourse((prev) => ({ ...prev, ...courseData }));
    setStep("lessons");
    toast("Course Created", {
      description: "Now you can start adding lessons to your course.",
    });
  };

  const handlePublishCourse = () => {
    if (course.lessons.length === 0) {
      toast.error("No Lessons", {
        description: "Please add at least one lesson before publishing.",
      });
      return;
    }

    toast.success("Course Published!", {
      description: `"${course.title}" has been successfully published and is now live.`,
    });
  };

  const resetForm = () => {
    setCourse({
      title: "",
      description: "",
      category: "",
      lessons: [],
    });
    setStep("course");
    toast("Form Reset", {
      description: "Course form has been reset.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProgressIndicator step={step} hasLessons={course.lessons.length > 0} />

      {step === "course" ? (
        <CourseForm
          course={course}
          onSubmit={handleCourseSubmit}
          onReset={resetForm}
        />
      ) : (
        <LessonManager
          course={course}
          setCourse={setCourse}
          onBackToCourse={() => setStep("course")}
          onPublish={handlePublishCourse}
        />
      )}
    </div>
  );
}
