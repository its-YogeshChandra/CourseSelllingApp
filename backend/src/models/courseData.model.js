import mongoose, { Schema } from "mongoose";


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
    videoChunks: [{ title: String, 
      playlist: String,
      url: [ String ] }],
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", LessonSchema);
