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

const UpdateFormWithPreview = ({ lessonId, isupdateModelopen }) => {
  // Sample existing data - replace with your actual data

  const [prevData, setprevData] = useState(null);
  const { handleSubmit, control } = useForm();
  useEffect(() => {
    const data = localStorageService.getfromStorage("courseData")[0];
    const lessonData = data.lessons.filter((e) => e.id == lessonId)[0];
    setprevData(lessonData);
  }, [lessonId]);

  const titleChange = (data) => {
    setprevData((prev) => ({ ...prev, title: data }));
  };
  const descriptionChange = (data) => {
    setprevData((prev) => ({ ...prev, description: data }));
  };

  const imgfileChange = (imagefiledata, func) => {
    switch (func) {
      case "add":
        imagefiledata.id = nanoid();
        setprevData((prev) => ({
          ...prev,
          images: [{ ...prev.images, imagefiledata }],
        }));
        break;
      case "del":
        const data = prev.images.filter((e) => e.name !== imagefiledata.id);
        setprevData((prev) => ({ ...prev, images: data }));
        break;
      default:
        break;
    }
  };

  const vidfileChange = (filedata, func) => {
    switch (func) {
      case "add":
        filedata.id = nanoid();
        setprevData((prev) => ({
          ...prev,
          videos: [{ ...prev.videos, filedata }],
        }));
        break;
      case "del":
        const data = prev.videos.filter((e) => e.name !== filedata.name);
        setprevData((prev) => ({ ...prev, videos: data }));
        break;
      default:
        break;
    }
  };

  const notesfileChange = (notesData, func) => {
    switch (func) {
      case "add":
        notesData.id = nanoid();
        setprevData((prev) => ({
          ...prev,
          notes: [{ ...prev.notes, notesData }],
        }));
        break;
      case "del":
        const data = prev.notes.filter((e) => e.name !== notesData.id);
        setprevData((prev) => ({ ...prev, notes: data }));
        break;
      default:
        break;
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

  const onSubmit = (data) => {
    //check on the prevData(for full data is present)
    console.log(prevData);
    // Handle form submission here
  };

  if (prevData) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Update Content</h1>
          <p className="text-gray-600">
            Modify existing content and add new files
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="title"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        titleChange(e.target.value);
                      }}
                      placeholder="Enter title"
                      className="mt-1"
                    />
                  )}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Enter description"
                      rows={4}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        descriptionChange(e.target.value);
                      }}
                      className="mt-1"
                    />
                  )}
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
                              {image.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => imgfileChange(image, "del")}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(image.size || 0)}
                          </p>
                        </div>
                        <div className="p-3">{renderFilePrevie(image)}</div>
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
                  <Controller />
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      !e.target.files
                        ? null
                        : imgfileChange(e.target.file, "add")
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
                    {prevData.videos.map((video) => (
                      <div
                        key={video.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="p-3 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">
                              {video.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => vidfileChange(video, "del")}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(video.size || 0)}
                          </p>
                        </div>
                        <div className="p-3">{renderFilePreview(video)}</div>
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
                      e.target.files && vidfileChange(e.target.files, "videos")
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
                    {existingData.notes.map((note) => (
                      <div
                        key={note.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="p-3 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">
                              {note.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => notesfileChange(note, "del")}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(note.size || 0)}
                          </p>
                        </div>
                        <div className="p-3">{renderFilePreview(note)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Notes */}
              <div>
                <h4
                  className="font-medium <
    FormData >
    {
      defaultValues: {
        title: existingData.title,
        description: existingData.description,
      },
    };mb-3 flex items-center gap-2"
                >
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
                      e.target.files && notesfileChange(e.target.files, "add")
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
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Update Content
            </Button>
          </div>
        </form>
      </div>
    );
  }
};

export default UpdateFormWithPreview;
