import mongoose, { Schema } from "mongoose";

const LessonSchema = new Schema(
  {
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseRef: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        completed: Boolean,
      },
    ],
    lessonRef: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lesson",
        completed: Boolean,
      },
    ],
    video: [{ type: string }],
    image: [{ type: string }],
    notes: [{ type: string }],
  },

  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", LessonSchema);
