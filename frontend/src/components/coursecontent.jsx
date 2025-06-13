"use client";

import { useState } from "react";
import { ChevronUp, ChevronRight, Play, HelpCircle, Lock } from "lucide-react";

export default function CourseContent() {
  const [expandedSections, setExpandedSections] = useState({
    "what-is-php": true, // Initially expanded as shown in the image
    "environment-setup": false,
  });

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const courseData = {
    "what-is-php": {
      title: "What is PHP ?",
      topicCount: 3,
      topics: [
        {
          id: 1,
          title: "PHP Class One",
          duration: "01:02:10",
          type: "video",
          locked: true,
        },
        {
          id: 2,
          title: "PHP Fundamental",
          duration: "02:00:00",
          type: "video",
          locked: true,
        },
        {
          id: 3,
          title: "What is php ?",
          duration: null,
          type: "quiz",
          locked: true,
        },
      ],
    },
    "environment-setup": {
      title: "Environment Setup",
      topicCount: 2,
      topics: [
        {
          id: 4,
          title: "Installing XAMPP",
          duration: "15:30:00",
          type: "video",
          locked: true,
        },
        {
          id: 5,
          title: "Setting up VS Code",
          duration: "08:45:00",
          type: "video",
          locked: true,
        },
      ],
    },
  };

  return (
    <div className="lg:w-[868px] md:w-full sm:w-full max-[640px]:w-full mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h1>

      <div className="space-y-4">
        {Object.entries(courseData).map(([sectionId, section]) => (
          <div
            key={sectionId}
            className="bg-gray-50 rounded-lg overflow-hidden"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between p-4 bg-gray-100">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium text-red-500">
                  {section.title}
                </h3>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {section.topicCount} Topics
                </span>
                <button
                  onClick={() => toggleSection(sectionId)}
                  className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  {expandedSections[sectionId] ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Section Content */}
            {expandedSections[sectionId] && (
              <div className="p-4 space-y-3">
                {section.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      {topic.type === "video" ? (
                        <Play className="w-5 h-5 text-gray-400" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="text-gray-700">{topic.title}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {topic.duration && (
                        <span className="text-sm text-gray-500">
                          {topic.duration}
                        </span>
                      )}
                      {topic.locked && (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View Full Course Button */}
      <div className="mt-8 text-center">
        <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-colors">
          View Full Course
        </button>
      </div>
    </div>
  );
}
