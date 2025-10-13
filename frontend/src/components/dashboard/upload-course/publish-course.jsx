import React, { useState } from "react";
import {
  AlertCircle,
  Check,
  Eye,
  FileVideo,
  Link,
  Rocket,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import localStorageService from "../../../services/localStorage";
import { getData } from "../../../services/indexed.db/db";
import { courseServices } from "../../../services/courseService";
import { toast } from "sonner";

export function PublishCourse({
  course,
  setCourse,
  onBackToLessons,
  onBackToCourse,
  onPublish,
  setStep,
}) {
  const [price, setPrice] = useState({
    price: "",
    currency: "",
    tags: "",
  });

  const publishCourse = () => {};
  const totalDuration = course.lessons.reduce((total, lesson) => {
    return total + 5.5; // Dummy value for each lesson
  }, 0);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const courseSubmit = async () => {
    //get data from localStorage
    const val = localStorageService.getfromStorage("courseData")[0];

    if (val) {
      //query on indexedDB
      const wholeData = await getData();
      const courseData = wholeData.filter((e) => e.id == val.id)[0];

      //change courseData
      courseData.price = {
        price: price.price,
        currency: price.currency,
      };
      courseData.tags = price.tags;

      //calling backend api
      const upload = await courseServices.uploadCourse(courseData);
      if (upload) {
        const resetForm = () => {
          setCourse({
            title: "",
            description: "",
            category: "",
            lessons: [],
          });
          setStep("course");
          toast;
        };

        setTimeout(() => {
          resetForm();
        }, 2000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Course Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            Course Preview
          </CardTitle>
          <CardDescription>
            Review your course before publishing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {course.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Badge variant="secondary">{course.category}</Badge>
                <span className="text-gray-500">
                  {course.lessons.length} lessons
                </span>
                <span className="text-gray-500">
                  {formatDuration(totalDuration)}
                </span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium mb-3">Course Content</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {course.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center space-x-3 text-sm"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-300">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <div className="flex-shrink-0">
                        {lesson.videoType === "upload" ? (
                          <FileVideo className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Link className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Rocket className="mr-2 h-5 w-5" />
            Publishing Settings
          </CardTitle>
          <CardDescription>
            Configure how your course will be published
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Course Price</Label>
              <div className="flex space-x-2">
                <Select
                  value={price.currency}
                  onValueChange={(value) =>
                    setPrice((prev) => ({ ...prev, currency: value }))
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price.price}
                  onChange={(e) =>
                    setPrice((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="flex-1"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Leave empty for free course
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas (e.g., javascript, react, frontend)"
              value={price.tags}
              onChange={(e) =>
                setPrice((prev) => ({
                  ...prev,
                  tags: e.target.value,
                }))
              }
            />
            <p className="text-sm text-gray-500 mt-1">
              Help students find your course with relevant tags
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pre-publish Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Check className="mr-2 h-5 w-5" />
            Pre-publish Checklist
          </CardTitle>
          <CardDescription>
            Make sure everything is ready before going live
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">
                Course title and description added
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">Category selected</span>
            </div>
            <div className="flex items-center space-x-3">
              {course.lessons.length > 0 ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              )}
              <span className="text-sm">
                {course.lessons.length > 0
                  ? `${course.lessons.length} lesson${
                      course.lessons.length > 1 ? "s" : ""
                    } added`
                  : "At least one lesson required"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">Publishing settings configured</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onBackToCourse}>
                Back to Course
              </Button>
              <Button variant="outline" onClick={onBackToLessons}>
                Back to Lessons
              </Button>
            </div>
            <Button
              onClick={() => courseSubmit()}
              disabled={course.lessons.length === 0}
              className="bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Upload className="mr-2 h-4 w-4" />
              Publish Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
