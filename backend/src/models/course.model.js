import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      require: true,
    },
    instructor: [
      {
        // type: Schema.Types.ObjectId,
        // ref: "Instructor",
        type: String,
        require: true,
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    courseDescription: {
      type: String,
    },
    category: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
    },
    tags: {
      type: String,
    },
    price: {
      price: {
        type: Number,
      },
      currency: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
