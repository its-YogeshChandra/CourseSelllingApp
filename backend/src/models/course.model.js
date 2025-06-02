import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    courseName: {
        type:String
    },
    instructor: [{
        type: Schema.Types.ObjectId,
        ref: "Instructor"
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    courseData: {
        type: String
    }  
})

export const Course = mongoose.model("Course", courseSchema)