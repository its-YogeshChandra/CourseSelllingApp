"use client";

import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

// Sample course data
const courseData = {
  title: "Advanced Web Development with React & Next.js",
  chapters: [
    {
      id: "chapter-1",
      title: "Getting Started with React",
      subChapters: [
        {
          id: "1-1",
          title: "Introduction to React",
          type: "video",
          duration: "12:45",
          completed: true,
        },
        {
          id: "1-2",
          title: "Setting Up Your Development Environment",
          type: "video",
          duration: "08:30",
          completed: true,
        },
        {
          id: "1-3",
          title: "React Components and Props",
          type: "video",
          duration: "15:20",
          completed: false,
        },
        {
          id: "1-4",
          title: "Essential React Concepts",
          type: "note",
          duration: "05:00",
          completed: false,
        },
      ],
    },
    {
      id: "chapter-2",
      title: "State Management in React",
      subChapters: [
        {
          id: "2-1",
          title: "Understanding React State",
          type: "video",
          duration: "14:15",
          completed: false,
        },
        {
          id: "2-2",
          title: "Working with Forms and Events",
          type: "video",
          duration: "18:30",
          completed: false,
        },
        {
          id: "2-3",
          title: "State Management Best Practices",
          type: "note",
          duration: "04:30",
          completed: false,
        },
      ],
    },
    {
      id: "chapter-3",
      title: "Next.js Fundamentals",
      subChapters: [
        {
          id: "3-1",
          title: "Introduction to Next.js",
          type: "video",
          duration: "16:40",
          completed: false,
        },
        {
          id: "3-2",
          title: "Routing in Next.js",
          type: "video",
          duration: "12:55",
          completed: false,
        },
        {
          id: "3-3",
          title: "Data Fetching Methods",
          type: "video",
          duration: "20:10",
          completed: false,
        },
        {
          id: "3-4",
          title: "Next.js API Routes",
          type: "note",
          duration: "06:15",
          completed: false,
        },
        {
          id: "3-5",
          title: "Deployment Strategies",
          type: "note",
          duration: "07:30",
          completed: false,
        },
      ],
    },
    {
      id: "chapter-4",
      title: "Advanced React Patterns",
      subChapters: [
        {
          id: "4-1",
          title: "Context API and useContext",
          type: "video",
          duration: "17:25",
          completed: false,
        },
        {
          id: "4-2",
          title: "Custom Hooks",
          type: "video",
          duration: "15:50",
          completed: false,
        },
        {
          id: "4-3",
          title: "Render Props and Higher-Order Components",
          type: "video",
          duration: "19:05",
          completed: false,
        },
        {
          id: "4-4",
          title: "Performance Optimization",
          type: "note",
          duration: "08:20",
          completed: false,
        },
      ],
    },
  ],
};

export default function CoursePlaylist({coursefullData, lessonData}) {
  // State for expanded chapters
  const [isExpanded, setIsExpanded] = useState({
    expanded: false,
    chapterId : null
  });


// state  for course
const [courseValues, setCourseValues] = useState(null)
const [lessons, setLesson] = useState(null)

// for updating the data with the course and lesson values
useEffect(()=>{
  if(coursefullData && lessonData){
   setCourseValues(coursefullData)
   setLesson(lessonData)
  }
},[coursefullData, lessonData])



  // State for completed items
  const [completedItems, setCompletedItems] = useState(
    // better thinking of using localstorage or indexedDB
    // Initialize with completed items from the data
    courseData.chapters.reduce((acc, chapter) => {
      chapter.subChapters.forEach((subChapter) => {
        if (subChapter.completed) {
          acc[subChapter.id] = true;
        }
      });
      return acc;
    }, {})
  );

  // Calculate total course duration and progress
  const { totalDuration, totalItems, completedCount, progressPercentage } =
    useMemo(() => {
      let totalMinutes = 0;
      let totalSeconds = 0;
      let totalItems = 0;
      let completedCount = 0;

      courseData.chapters.forEach((chapter) => {
        chapter.subChapters.forEach((subChapter) => {
          totalItems++;
          const [minutes, seconds] = subChapter.duration.split(":").map(Number);
          totalMinutes += minutes;
          totalSeconds += seconds;

          if (completedItems[subChapter.id]) {
            completedCount++;
          }
        });
      });

      // Adjust seconds to minutes
      totalMinutes += Math.floor(totalSeconds / 60);
      totalSeconds = totalSeconds % 60;

      const formattedDuration = `${totalMinutes}h ${totalSeconds}m`;
      const progressPercentage =
        totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

      return {
        totalDuration: formattedDuration,
        totalItems,
        completedCount,
        progressPercentage,
      };
    }, [completedItems]);

  // Toggle chapter expansion
  const toggleChapter = (chapterId) => {
    isExpanded((prev) => ({
      ...prev,
       expanded : !(prev.expnded),
       chapterId : chapterId
      
    }));
  };

  // Toggle completion status
  const toggleCompletion = (subChapterId) => {
    setCompletedItems((prev) => ({
      ...prev,
      [subChapterId]: !prev[subChapterId],
    }));
  };

  // Get chapter duration
  const getChapterDuration = (chapter) => {
    let totalMinutes = 0;
    let totalSeconds = 0;

    chapter.subChapters.forEach((subChapter) => {
      const [minutes, seconds] = subChapter.duration.split(":").map(Number);
      totalMinutes += minutes;
      totalSeconds += seconds;
    });

    // Adjust seconds to minutes
    totalMinutes += Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    return `${totalMinutes}:${totalSeconds.toString().padStart(2, "0")}`;
  };

  // Get chapter completion count
  const getChapterCompletionCount = (chapter) => {
    return chapter.subChapters.filter(
      (subChapter) => completedItems[subChapter.id]
    ).length;
  };
 
  if(courseValues && lessons){
    console.log(Object.entries(lessons[0]))
  return (
    <div className="w-full bg-white shadow-md overflow-hidden font-inter rounded-2xl">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
        <h1 className="text-xl font-bold">{courseValues.title}</h1>
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" /> 
            <span>200 min</span>
          </div>
          <div>
            {completedCount} of {totalItems} completed
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-right text-xs mt-1">
          {progressPercentage}% complete
        </div>
      </div>

      {/* Chapters List */}
      <div className="max-h-96 overflow-y-auto">
        {lessons.map((chapter) => (
          <div key={chapter._id} className="border-b border-gray-200">
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter._id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                {isExpanded.chapterId ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 mr-2" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
                )}
                <span className="font-medium text-left">{chapter.title}</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="mr-2">
                  {getChapterCompletionCount(chapter)}/
                  {chapter.subChapters.length}
                </span>
                <span>{getChapterDuration(chapter)}</span>
              </div>
            </button>

            {/* Sub-chapters */}
            {isExpanded.chapterId && (
              <div className="pl-6 pr-2 pb-2">
                {Object.entries(chapter).map((element) => (
                  <div
                    key={element._id}
                    className={cn(
                      "flex items-center p-3 rounded-lg mb-1 transition-all",
                      completedItems[subChapter.id] && "bg-gray-50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                        element === "video"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-100 text-green-500"
                      )}
                    >
                      {subChapter.type === "video" ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">
                          {subChapter.title}
                        </h3>
                        <button
                          onClick={() => toggleCompletion(subChapter.id)}
                          className={cn(
                            "ml-2 p-1 rounded-full transition-colors",
                            completedItems[subChapter.id]
                              ? "text-green-500 hover:bg-green-50"
                              : "text-gray-300 hover:text-green-500 hover:bg-green-50"
                          )}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span
                          className={cn(
                            "mr-2 px-1.5 py-0.5 rounded text-xs",
                            subChapter.type === "video"
                              ? "bg-red-50 text-red-700"
                              : "bg-green-50 text-green-700"
                          )}
                        >
                          {subChapter.type === "video" ? "Video" : "Note"}
                        </span>
                        <Clock className="w-3 h-3 mr-1" />
                        {/* <span>{subChapter.duration}</span> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
}




