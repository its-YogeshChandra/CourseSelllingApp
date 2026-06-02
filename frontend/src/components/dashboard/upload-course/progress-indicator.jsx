"use client";

import { Check } from "lucide-react";
import React from "react";

export function ProgressIndicator({ step, hasLessons }) {
  const steps = [
    { key: "course", label: "Course Details", number: 1 },
    { key: "lessons", label: "Add Lessons", number: 2 },
    { key: "publish", label: "Publish", number: 3 },
  ];

  const getStepStyle = (s) => {
    if (s.key === "publish" && hasLessons) return "bg-green-600 text-white";
    if (s.key === step || (s.key === "course" && hasLessons))
      return "bg-blue-600 text-white";
    return "bg-gray-200 text-gray-600";
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-4 mb-6 sm:mb-8">
      {steps.map((s, index) => (
        <React.Fragment key={s.key}>
          <div className="flex items-center min-w-0">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0 ${getStepStyle(s)}`}
            >
              {s.key === "publish" && hasLessons ? (
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                s.number
              )}
            </div>
            <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium truncate hidden xs:inline sm:inline">
              {s.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-gray-200 min-w-[16px]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
