import mongoose, { Schema } from "mongoose";
import { string, url } from "zod/v4";

const LessonSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    courseRef: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    video: [
      {
        title: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    image: [
      {
        title: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    notes: [
      {
        title: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    videoChunks: [{ title: String, url: [ String ] }],
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", LessonSchema);
