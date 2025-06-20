import React from "react";
import {
  AlertCircle,
  Check,
  Edit,
  FileVideo,
  GripVertical,
  Link,
  Play,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

export default function LessonManager() {
  return (
    <div className="space-y-6">
      {/* Course Summary */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-xl font-bold">
            <Play className="mr-2 h-5 w-5" />
            Course Title
          </div>
          <button className="flex items-center px-3 py-1 text-sm border rounded">
            <Edit className="mr-2 h-4 w-4" />
            Edit Course Details
          </button>
        </div>
        <p className="text-gray-500 mb-2">Course description goes here.</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
            Category
          </span>
          <span>0 lessons</span>
        </div>
      </div>

      {/* Add Lesson Section */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Course Lessons</h2>
          <button className="flex items-center px-3 py-1 text-sm border rounded">
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </button>
        </div>
        <p className="text-gray-500 mb-4">
          Add lessons to your course. You can reorder them by dragging and
          dropping.
        </p>

        <div className="text-center py-12">
          <Play className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No lessons yet
          </h3>
          <p className="mt-2 text-gray-500">
            Get started by adding your first lesson.
          </p>
          <button className="mt-4 flex items-center px-4 py-2 bg-black text-white rounded">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Lesson
          </button>
        </div>
      </div>

      {/* Publish Section */}
      <div className="border rounded-lg p-6">
        <div className="flex items-center mb-2 text-lg font-semibold">
          <Check className="mr-2 h-5 w-5" />
          Ready to Publish?
        </div>
        <p className="text-gray-500 mb-4">
          Once you publish your course, it will be available to students.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <span>Add at least one lesson</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded">
              Back to Course Details
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled
            >
              <Upload className="mr-2 h-4 w-4 inline" />
              Publish Course
            </button>
          </div>
        </div>
      </div>

      {/* Modal - Mocked JSX */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-1">Add New Lesson</h2>
          <p className="text-sm text-gray-500 mb-4">
            Fill in the details for your new lesson.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Lesson Title *
              </label>
              <input
                className="w-full border rounded px-3 py-2 mt-1"
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Video Content *
              </label>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1 text-sm border rounded">
                  <FileVideo className="mr-2 h-4 w-4" />
                  Upload Video
                </button>
                <button className="flex items-center px-3 py-1 text-sm border rounded">
                  <Link className="mr-2 h-4 w-4" />
                  Video Link
                </button>
              </div>
              <input
                className="w-full border rounded px-3 py-2 mt-2"
                placeholder="Enter video URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Description (Optional)
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 mt-1"
                rows={3}
                placeholder="Add notes or description for this lesson"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button className="px-4 py-2 border rounded">Cancel</button>
            <button className="px-4 py-2 bg-black text-white rounded flex items-center">
              <Save className="mr-2 h-4 w-4" />
              Add Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
