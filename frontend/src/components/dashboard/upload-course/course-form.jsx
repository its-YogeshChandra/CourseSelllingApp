"use client";

import React, { useState } from "react";
import { BookOpen } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

export function CourseForm({ course, onSubmit, onReset }) {
  const [formData, setFormData] = useState({
    title: course.title || "",
    description: course.description || "",
    category: course.category || "",
  });

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Photography",
    "Music",
    "Health & Fitness",
    "Language Learning",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Course Information
        </CardTitle>
        <CardDescription>
          Enter the basic details for your new course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter your course title"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Course Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what students will learn in this course"
                rows={4}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="thumbnail">Course Thumbnail</Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload an image that represents your course (recommended:
                1280x720px)
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onReset}>
              Reset Form
            </Button>
            <Button type="submit">Continue to Lessons</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
