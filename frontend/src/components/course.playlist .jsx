import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  Clock,
  CheckCircle,
  FileImage,
  NotebookText,
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

export default function CoursePlaylist({
  coursefullData,
  lessonData,
  setSelectedDataType,
}) {
  // State for expanded chapters
  const [isExpanded, setIsExpanded] = useState([]);

  // state  for course
  const [courseValues, setCourseValues] = useState(null);
  const [lessons, setLesson] = useState(null);

  // for updating the data with the course and lesson values
  useEffect(() => {
    if (coursefullData && lessonData) {
      setCourseValues(coursefullData);
      setLesson(lessonData);
    }
  }, [coursefullData, lessonData]);

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
    setIsExpanded((prev) => {
      if (prev.includes(chapterId)) {
        return prev.filter((id) => id !== chapterId);
      } else {
        return [...prev, chapterId];
      }
    });
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

  if (courseValues && lessons) {
    console.log(lessons);
    return (
      <div className="w-full bg-white  shadow-md overflow-hidden font-inter rounded-2xl">
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
        <div className="h-auto overflow-y-auto">
          {lessons.map((chapter) => (
            <div key={chapter._id} className="border-b border-gray-200">
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(chapter._id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  {isExpanded.includes(chapter._id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500 mr-2" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500 mr-2" />
                  )}
                  <span className="font-medium text-left">{chapter.title}</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  {/* <span className="mr-2">
                  {getChapterCompletionCount(chapter)}/
                  {chapter.subChapters.length}
                </span> */}
                  {/* <span>{getChapterDuration(chapter)}</span> */}
                </div>
              </button>

              {/* Sub-chapters */}
              {isExpanded.includes(chapter._id) && (
                <div className="pl-6 pr-2 pb-2">
                  {chapter.video.length > 0 &&
                    chapter.video.map((subChapter) => (
                      <div
                        key={subChapter._id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg mb-1"
                      >
                        <button
                          className=""
                          onClick={() =>
                            setSelectedDataType((prev) => {
                              return {
                                dataType: "video",
                                url: subChapter.url,
                                id: subChapter._id,
                              };
                            })
                          }
                        >
                          <div className="flex justify-evenly gap-x-2">
                            <Play />
                            <p>{subChapter.title}</p>
                          </div>
                        </button>
                      </div>
                    ))}

                  {chapter.image.length > 0 &&
                    chapter.image.map((subChapter) => (
                      <div
                        key={subChapter._id}
                        className="flex items-center  justify-between p-2 hover:bg-gray-50 rounded-lg mb-1"
                      >
                        <button
                          className=""
                          onClick={() =>
                            setSelectedDataType((prev) => {
                              return { dataType: "image", url: subChapter.url };
                            })
                          }
                        >
                          <div className="flex justify-evenly gap-x-2">
                            <FileImage />
                            <p>{subChapter.title}</p>
                          </div>
                        </button>
                      </div>
                    ))}

                  {chapter.notes.length > 0 &&
                    chapter.notes.map((subChapter) => (
                      <div
                        key={subChapter._id}
                        className="flex items-center  justify-between p-2 hover:bg-gray-50 rounded-lg mb-1"
                      >
                        <button
                          className=""
                          onClick={() =>
                            setSelectedDataType((prev) => {
                              return { dataType: "notes", url: subChapter.url };
                            })
                          }
                        >
                          <div className="flex justify-evenly gap-x-2">
                            <NotebookText />
                            <p>{subChapter.title}</p>
                          </div>
                        </button>
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
