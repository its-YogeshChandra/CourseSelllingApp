import mongoose, { Schema } from "mongoose";

const LessonSchema = new Schema(
  {
    title: {
      type: String,
    },
    courseRef: {
      type: Schema.Types.ObjectId,
      ref: "Course"
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
        type: String,
      },
    ],
    notes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", LessonSchema);
