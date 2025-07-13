import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, Save, ImageIcon, Video, FileText, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import localStorageService from "../../../../services/localStorage";
import { nanoid } from "@reduxjs/toolkit";
import { getData, updatelesson } from "../../../../services/indexed.db/db";

const UpdateLessonWithPreview = ({
  courseId,
  lessonId,
  setupdateModelOpen,
}) => {
  const [prevData, setprevData] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      const neededVal = data.filter((e) => e.id === courseId)[0];
      console.log(neededVal);
      const lessonData = neededVal.lessons.filter((e) => e.id == lessonId)[0];
      setprevData(lessonData);
      setTitle(lessonData.title);
      setDescription(lessonData.description);
    };
    fetchData();
  }, [lessonId, courseId]);

  useEffect(() => {
    const changeinTitle = setTimeout(() => {
      setprevData((prev) => ({ ...prev, title: title }));
    }, 3000);
    return () => clearTimeout(changeinTitle);
  }, [title]);

  useEffect(() => {
    const changeinDescription = setTimeout(() => {
      setprevData((prev) => ({ ...prev, description: description }));
    }, 6000);
    return () => clearTimeout(changeinDescription);
  }, [description]);

  console.log(prevData);

  const modifier = (data, func) => {
    if (func == "add") {
      data.map((e) => {
        let key = "";
        if (e.type == "application/pdf") {
          key = "notes";
        } else {
          key = e.type.split("/")[0] + "s";
        }
        const obj = {
          id: nanoid(),
          files: e,
        };
        setprevData((prev) => ({
          ...prev,
          [key]: [...prev[key], obj],
        }));
      });
    } else {
      const modData = data[0];
      let key = "";
      if (modData.files.type === "application/pdf") {
        key = "notes";
      } else {
        key = modData.files.type.split("/")[0] + "s";
      }
      const array = prevData[key].filter((val) => val.id !== modData.id);
      setprevData((prev) => ({
        ...prev,
        [key]: array,
      }));
      return "data deleted";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const renderFilePreview = (file) => {
    const name = "file" in file ? file.file.name : file.name;
    const type = file.type;
    const size = "file" in file ? file.file.size : file.size || 0;
    const url = URL.createObjectURL(file);

    if (type.startsWith("image/")) {
      return (
        <div className="relative">
          <img
            src={url || "/placeholder.svg"}
            alt={name}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 rounded-lg" />
        </div>
      );
    }

    if (type.startsWith("video/")) {
      return (
        <video
          src={url}
          className="w-full h-40 object-cover rounded-lg"
          controls
        />
      );
    }

    return (
      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <FileText className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-sm text-gray-600 font-medium truncate">{name}</p>
          <p className="text-xs text-gray-500 mt-1">PDF Document</p>
        </div>
      </div>
    );
  };

  const onSubmit = async (data) => {
    // function on form submission
    if (data) {
      const course = localStorageService.getfromStorage("courseData")[0];
      const updateVal = await updatelesson(course.id, prevData.id, prevData);
      if (updateVal) {
        const getcourseData = await getData();
        const neededVal = getcourseData.filter((e) => e.id === prevData.id);
        localStorageService.setinStorage("courseData", neededVal);
        setupdateModelOpen(false);
      }
    }
  };
  if (prevData != null) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6 ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Update Content</h1>
          <p className="text-gray-600">
            Modify existing content and add new files
          </p>
        </div>

        <div className="space-y-6">
          {/* Title and Description Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  value={title}
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Enter title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  vlaue={description}
                  placeholder="Enter description"
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Images */}
              {prevData.images.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    Current Images
                    <Badge variant="secondary">{prevData.images.length}</Badge>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {prevData.images.map((image) => (
                      <div
                        key={image.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="p-3 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">
                              {image.files.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => modifier([image], "del")}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(image.files.size || 0)}
                          </p>
                        </div>
                        <div className="p-3">
                          {renderFilePreview(image.files)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Images */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  Add New Images
                </h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-3">
                    Upload new images
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      !e.target.files
                        ? null
                        : modifier([...e.target.files], "add")
                    }
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Videos Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Videos */}
              {prevData.videos.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    Current Videos
                    <Badge variant="secondary">{prevData.videos.length}</Badge>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prevData.videos.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="p-3 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">
                              {item.files.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => modifier([item], "del")}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(item.files.size || 0)}
                          </p>
                        </div>
                        <div className="p-3">
                          {renderFilePreview(item.files)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Videos */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  Add New Videos
                </h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-3">
                    Upload new videos
                  </p>
                  <Input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) =>
                      !e.target.files
                        ? null
                        : modifier([...e.target.files], "add")
                    }
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Notes & Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Notes */}
              {prevData.notes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    Current Notes
                    <Badge variant="secondary">{prevData.notes.length}</Badge>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {prevData.notes.map((note) => (
                      <div
                        key={note.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="p-3 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">
                              {note.files.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => modifier([note], "del")}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(note.files.size || 0)}
                          </p>
                        </div>
                        <div className="p-3">
                          {renderFilePreview(note.files)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Notes */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  Add New Notes
                </h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-3">
                    Upload PDF documents and notes
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    multiple
                    onChange={(e) =>
                      !e.target.files
                        ? null
                        : modifier([...e.target.files], "add")
                    }
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button onClick={() => {onSubmit(true)}}>
              <Save className="w-4 h-4 mr-2" />
              Update Content
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default UpdateLessonWithPreview;
