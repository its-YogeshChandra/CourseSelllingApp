import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { ZodStringFormat } from "zod/v4";


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim : true
    },
    refreshToken: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

// for hashing password 
userSchema.pre("save", async function(next){
  !this.isModified("password") ? next() :
   this.password =  await bcrypt.hash(this.password, 8);
  next()
} )

// for password validation 
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password)
};


//creating access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    id: this._id,
    email: this.email,
   username: this.username
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}

//  Creating refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    id: this._id,
    email: this.email,
   username: this.username
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })
}


export const User = mongoose.model("User", userSchema);
