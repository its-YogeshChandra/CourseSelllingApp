"use client";

import { Check } from "lucide-react";
import React from "react";

export function ProgressIndicator({ step, hasLessons }) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === "course" || hasLessons
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          1
        </div>
        <span className="ml-2 text-sm font-medium">Course Details</span>
      </div>

      <div className="flex-1 h-px bg-gray-200" />

      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === "lessons"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          2
        </div>
        <span className="ml-2 text-sm font-medium">Add Lessons</span>
      </div>

      <div className="flex-1 h-px bg-gray-200" />

      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            hasLessons ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          {hasLessons ? <Check className="h-4 w-4" /> : 3}
        </div>
        <span className="ml-2 text-sm font-medium">Publish</span>
      </div>
    </div>
  );
}
