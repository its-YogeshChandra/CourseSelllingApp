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
import { useForm, Controller } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";

export function CourseForm({ course, onSubmit, onReset }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
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

  const dataSubmit = (data) => {
    data.id = nanoid();
    data.lessons = [];
    return onSubmit(data);
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
        <form onSubmit={handleSubmit(dataSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Course Title *</Label>
              <Controller
                name={"title"}
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="title"
                      placeholder={"web development"}
                      className="mt-2"
                    />
                  );
                }}
              />
            </div>

            <div>
              <Label htmlFor="description">Course Description *</Label>

              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Describe what students will learn in this course"
                    rows={4}
                    className="mt-1"
                    required
                  />
                )}
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label htmlFor="thumbnail">Course Thumbnail</Label>
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Input
                      onChange={(e) => {
                        field.onChange(...e.target.files);
                      }}
                      type="file"
                      accept="image/*"
                      multiple
                    />
                  );
                }}
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
