import { useState, useMemo, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  PlayCircle,
  FileImage,
  BookOpen,
  Trophy,
  CheckCircle2,
  Clock,
  Play
} from "lucide-react";

export default function CoursePlaylist({
  coursefullData,
  lessonData,
  setSelectedDataType,
}) {
  const [isExpanded, setIsExpanded] = useState([]);
  const [courseValues, setCourseValues] = useState(null);
  const [lessons, setLesson] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  
  // Dummy completed items for visual effect, in a real app this would come from props/backend
  const [completedItems, setCompletedItems] = useState({});

  useEffect(() => {
    if (coursefullData && lessonData) {
      setCourseValues(coursefullData);
      setLesson(lessonData);
      
      // Auto-expand first chapter by default
      if (lessonData.length > 0 && isExpanded.length === 0) {
        setIsExpanded([lessonData[0]._id]);
      }
    }
  }, [coursefullData, lessonData]);

  const { totalItems, completedCount, progressPercentage } = useMemo(() => {
    let totalItems = 0;
    let completedCount = 0;

    if (lessons) {
      lessons.forEach((chapter) => {
        totalItems += (chapter.video?.length || 0) + (chapter.image?.length || 0) + (chapter.notes?.length || 0);
      });
      // Mocking some progress for UI demonstration if there's no actual completed data
      completedCount = Math.floor(totalItems * 0.3); // 30% complete mockup
    }

    const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    return {
      totalItems,
      completedCount,
      progressPercentage,
    };
  }, [lessons, completedItems]);

  const toggleChapter = (chapterId) => {
    setIsExpanded((prev) => {
      if (prev.includes(chapterId)) {
        return prev.filter((id) => id !== chapterId);
      } else {
        return [...prev, chapterId];
      }
    });
  };

  const handleSelectItem = (dataType, url, id) => {
    setSelectedDataType({ dataType, url, id });
    setActiveItemId(id);
  };

  if (!courseValues || !lessons) return null;

  return (
    <div className="w-full bg-white shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden font-inter rounded-3xl flex flex-col xl:max-h-[85vh]">
      {/* Course Header */}
      <div className="p-6 border-b border-gray-100 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-xl font-extrabold text-gray-900 leading-tight mb-4">
            {courseValues.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm font-medium text-gray-500 mb-3">
            <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>~ 12h 30m</span>
            </div>
            <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              <Trophy className="w-4 h-4" />
              <span>{progressPercentage}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent to-white/30"></div>
            </div>
          </div>
          <div className="text-xs text-gray-400 font-medium mt-2 flex justify-between">
            <span>{completedCount} lessons completed</span>
            <span>{totalItems} total</span>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50/30">
        {lessons.map((chapter, index) => {
          const isOpen = isExpanded.includes(chapter._id);
          
          return (
            <div key={chapter._id} className="border-b border-gray-100 last:border-b-0">
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(chapter._id)}
                className={`w-full flex items-center justify-between p-5 transition-all duration-200 ${
                  isOpen ? "bg-white" : "hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                    isOpen ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400"
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className={`font-semibold text-left transition-colors ${
                    isOpen ? "text-gray-900" : "text-gray-600"
                  }`}>
                    {chapter.title}
                  </span>
                </div>
                <div className={`p-1 rounded-full transition-all duration-200 ${
                  isOpen ? "rotate-180 text-indigo-500" : "text-gray-400"
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Sub-chapters */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden bg-white ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-3 pb-4 space-y-1">
                  
                  {/* Videos */}
                  {chapter.video?.map((subChapter) => {
                    const isActive = activeItemId === subChapter._id;
                    return (
                      <button
                        key={subChapter._id}
                        onClick={() => handleSelectItem("video", subChapter.url, subChapter._id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                          isActive 
                            ? "bg-indigo-50 border border-indigo-100 shadow-sm" 
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${
                            isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                          }`}>
                            <PlayCircle className="w-4 h-4" />
                          </div>
                          <span className={`text-sm font-medium text-left ${
                            isActive ? "text-indigo-900" : "text-gray-600 group-hover:text-gray-900"
                          }`}>
                            {subChapter.title}
                          </span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></div>}
                      </button>
                    );
                  })}

                  {/* Images */}
                  {chapter.image?.map((subChapter) => {
                    const isActive = activeItemId === subChapter._id;
                    return (
                      <button
                        key={subChapter._id}
                        onClick={() => handleSelectItem("image", subChapter.url, subChapter._id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                          isActive 
                            ? "bg-emerald-50 border border-emerald-100 shadow-sm" 
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${
                            isActive ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "bg-emerald-50 text-emerald-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                          }`}>
                            <FileImage className="w-4 h-4" />
                          </div>
                          <span className={`text-sm font-medium text-left ${
                            isActive ? "text-emerald-900" : "text-gray-600 group-hover:text-gray-900"
                          }`}>
                            {subChapter.title}
                          </span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>}
                      </button>
                    );
                  })}

                  {/* Notes */}
                  {chapter.notes?.map((subChapter) => {
                    const isActive = activeItemId === subChapter._id;
                    return (
                      <button
                        key={subChapter._id}
                        onClick={() => handleSelectItem("notes", subChapter.url, subChapter._id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                          isActive 
                            ? "bg-amber-50 border border-amber-100 shadow-sm" 
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${
                            isActive ? "bg-amber-500 text-white shadow-md shadow-amber-200" : "bg-amber-50 text-amber-500 group-hover:bg-amber-100 group-hover:text-amber-600"
                          }`}>
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <span className={`text-sm font-medium text-left ${
                            isActive ? "text-amber-900" : "text-gray-600 group-hover:text-gray-900"
                          }`}>
                            {subChapter.title}
                          </span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse"></div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
