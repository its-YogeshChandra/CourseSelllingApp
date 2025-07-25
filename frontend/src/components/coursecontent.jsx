import { useState, useEffect } from "react";
import { ChevronUp, ChevronRight, Play, HelpCircle, Lock } from "lucide-react";
import slugify from "slugify"; // Optional but useful for key naming

export default function CourseContent({ lessonData }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [courseData, setCourseData] = useState({});

  // 🧠 Transform lessonData → courseData format
  useEffect(() => {
    if (lessonData !== undefined) {
      setCourseData(prev => {
        const newCourseData = {};

        lessonData.forEach((lesson, index) => {
          const sectionId = slugify(lesson.title, { lower: true }); // e.g., "writing-your-first-cpp-program"

          newCourseData[sectionId] = {
            title: lesson.title,
            topicCount: 1,
            topics: [
              {
                id: index + 1,
                title: lesson.title,
                duration: "00:10:00", // You can extract duration from video if available
                type: "video",
                locked: true,
              },
            ],
          };
        });

        return {
          ...prev,
          ...newCourseData,
        };
      });

      // 🔁 Expand all sections by default
      const defaultExpanded = {};
      lessonData.forEach(lesson => {
        const sectionId = slugify(lesson.title, { lower: true });
        defaultExpanded[sectionId] = true;
      });
      setExpandedSections(defaultExpanded);
    }
  }, [lessonData]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="lg:w-[868px] md:w-full sm:w-full max-[640px]:w-full mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h1>

      <div className="space-y-4">
        {Object.entries(courseData).map(([sectionId, section]) => (
          <div key={sectionId} className="bg-gray-50 rounded-lg overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center justify-between p-4 bg-gray-100">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-medium font">
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
