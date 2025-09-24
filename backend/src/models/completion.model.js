import mongoose, { Schema } from "mongoose";

const CompletionSchema = new Schema(
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
    video: [{ type: String }],
    image: [{ type: String }],
    notes: [{ type: String }],
  },

  { timestamps: true }
);

export const CompletionData = mongoose.model("CompletionData", CompletionSchema);
