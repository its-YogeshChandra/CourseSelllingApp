
import mongoose, { Schema } from "mongoose"

const instructorSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique : true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    refreshToken: {
        type:String
    },
    courseTeached: {
        type: String,
        trim: true
    },

}, {
    timestamps:true
})

export const Instructor = mongoose.model("Instructor", instructorSchema)