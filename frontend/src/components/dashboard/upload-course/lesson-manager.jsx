import React, { useState, useEffect } from "react";
import {
  Edit,
  FileText,
  FileVideo,
  GripVertical,
  ImageIcon,
  Link,
  Play,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { getData } from "../../../services/indexed.db/db.js";
import { nanoid } from "@reduxjs/toolkit";
import localStorageService from "../../../services/localStorage.js";
import UpdateLessonWithPreview from "./lessonManagerComp/upload.lesson.jsx";
import { modifiedObject } from "../../../services/impfunctions.js";

export function LessonManager({
  course,
  onBackToCourse,
  onContinueToPublish,
  onDeletingLesson,
  onClosingPage,
}) {
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [updateModelOpen, setupdateModelOpen] = useState(false);
  const [updLessonid, setupdLessonid] = useState(null);
  const [lessonData, setLessonData] = useState();
  const [lessonNeeded, setlessonNeeded] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [draggedLesson, setDraggedLesson] = useState(null);
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    videoType: "upload",
    videoLink: "",
    notesFile: undefined,
    imageFiles: [],
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});

  const addtheLesson = (data) => {
    data.id = nanoid();
    const keysArr = [];
    //clear the non-existent keys and make keysout of array value keys
    for (let key in data) {
      if (data[key] == undefined) {
        delete data[key];
      } else {
        if (Array.isArray(data[key])) {
          keysArr.push(key);
        }
      }
    }
    const lessonObj = modifiedObject(data, keysArr);
    const courseVal = localStorageService.getfromStorage("courseData")[0];
    onContinueToPublish(lessonObj, courseVal.id);
    setIsLessonModalOpen(false);
  };

  const editlesson = (lessonid) => {
    //collect data from parameter and add it into state
    if (lessonid !== "") {
      setupdLessonid(lessonid);
      setupdateModelOpen((prev) => !prev);
    }
  };

  const handleAddLesson = () => {
    if (!newLesson.title) {
      toast.error("Please enter a lesson title.", {
        description: "Missing Title",
      });
      return;
    }

    if (newLesson.videoType === "link" && !newLesson.videoLink) {
      toast.error("Please enter a video link.", {
        description: "Missing Video Link",
      });
      return;
    }

    // const lesson = {
    //   // id: Date.now().toString(),
    //   // title: newLesson.title,
    //   // description: newLesson.description,
    //   // videoType: newLesson.videoType,
    //   // videoFile: newLesson.videoFile,
    //   // videoLink: newLesson.videoLink,
    //   // notesFile: newLesson.notesFile,
    //   // imageFiles: newLesson.imageFiles,
    //   // duration: "5:30",
    //   order: course.lessons.length,
    // };

    setNewLesson({
      title: "",
      description: "",
      videoType: "upload",
      videoLink: "",
      notesFile: undefined,
      imageFiles: [],
    });

    toast.success(`"${lesson.title}" has been added to your course.`, {
      description: "Lesson Added",
    });
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      title: lesson.title,
      description: lesson.description,
      videoType: lesson.videoType,
      videoLink: lesson.videoLink,
      notesFile: lesson.notesFile,
      imageFiles: lesson.imageFiles || [],
    });
    setIsLessonModalOpen(true);
  };

  const closeModal = () => {
    setIsLessonModalOpen(false);
    setEditingLesson(null);
    setNewLesson({
      title: "",
      description: "",
      videoType: "upload",
      videoLink: "",
      notesFile: undefined,
      imageFiles: [],
    });
  };

  const getLessonAttachments = (lesson) => {
    const attachments = [];
    if (lesson.notesFile) attachments.push("Notes");
    if (lesson.imageFiles && lesson.imageFiles.length > 0) {
      attachments.push(
        `${lesson.imageFiles.length} Image${
          lesson.imageFiles.length > 1 ? "s" : ""
        }`
      );
    }
    return attachments;
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Course Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Play className="mr-2 h-5 w-5" />
              {course.title}
            </div>
            <Button variant="outline" size="sm" onClick={onBackToCourse}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Course Details
            </Button>
          </CardTitle>
          <CardDescription>{course.description}</CardDescription>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <Badge variant="secondary">{course.category}</Badge>
            <span>{course.lessons.length} lessons</span>
          </div>
        </CardHeader>
      </Card>

      {/* Lessons Management Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Course Lessons</span>
            <Button onClick={() => setIsLessonModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </CardTitle>
          <CardDescription>
            Add lessons to your course. You can reorder them by dragging and
            dropping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {course.lessons.length === 0 ? (
            <div className="text-center py-12">
              <Play className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No lessons yet
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Get started by adding your first lesson.
              </p>
              <Button
                className="mt-4"
                onClick={() => setIsLessonModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Lesson
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {course.lessons.map((e, index) => {
                return (
                  <div
                    key={e.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-move transition-colors"
                  >
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium text-blue-600 dark:text-blue-300">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {e.title}
                      </h4>
                      {e.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                          {e.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editlesson(e.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onDeletingLesson(course.id, e.id);
                        }}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button variant="outline" onClick={onBackToCourse}>
              Back to Course Details
            </Button>
            <Button
              onClick={() => {
                onClosingPage();
              }}
              disabled={course.lessons.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue to Publish
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Lesson Modal */}

      <Dialog open={isLessonModalOpen} onOpenChange={setIsLessonModalOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit(addtheLesson)}>
            <DialogHeader>
              <DialogTitle>
                {editingLesson ? "Edit Lesson" : "Add New Lesson"}
              </DialogTitle>
              <DialogDescription>
                {editingLesson
                  ? "Update the lesson details below."
                  : "Fill in the details for your new lesson."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Basic Information
                </h4>
                <div>
                  <Label htmlFor="lesson-title">Lesson Title *</Label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          id="lesson-title"
                          placeholder="Enter lesson title"
                          className="mt-1"
                        />
                      );
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="lesson-description">Description</Label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Textarea
                          {...field}
                          id="lesson-description"
                          placeholder="Add notes or description for this lesson"
                          rows={3}
                        />
                      );
                    }}
                  />
                </div>
              </div>

              {/* Video Content */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Video Content *
                </h4>
                <div className="flex space-x-2">
                  <Label htmlFor="lesson-videos"> Upload Video</Label>
                </div>
                <div>
                  <Controller
                    name="videos"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          name={field.name}
                          onChange={(e) => {
                            field.onChange([...e.target.files]);
                          }}
                          type="file"
                          accept="video/*"
                          multiple
                          id="lesson-videos"
                        />
                      );
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Supported formats: MP4, MOV, AVI, WMV (Max size: 500MB)
                  </p>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Lesson Notes (Optional)
                </h4>
                <div>
                  <Label htmlFor="notes-file">Upload Notes File</Label>
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          name={field.name}
                          multiple
                          onChange={(e) => {
                            field.onChange([...e.target.files]);
                          }}
                          id="notes-file"
                          type="file"
                          accept=".pdf,.doc,.docx,.txt,.md"
                          className="mt-1"
                        />
                      );
                    }}
                  />

                  <p className="text-sm text-gray-500 mt-1">
                    Upload study materials, PDFs, documents, or text files (Max
                    size: 10MB)
                  </p>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Lesson Images (Optional)
                </h4>
                <div>
                  <Label htmlFor="image-files">Upload Images</Label>
                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Input
                          name={field.name}
                          id="image-files"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            field.onChange([...e.target.files]);
                          }}
                        />
                      );
                    }}
                  />

                  <p className="text-sm text-gray-500 mt-1">
                    Upload diagrams, screenshots, or reference images (Max 5
                    files, 5MB each)
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              {/* <Button variant="outline">Cancel</Button> */}
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {editingLesson ? "Update Lesson" : "Add Lesson"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {updateModelOpen && updLessonid && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative z-60 w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl">
              <UpdateLessonWithPreview
                setupdateModelOpen={setupdateModelOpen}
                lessonId={updLessonid}
                courseId={course.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
