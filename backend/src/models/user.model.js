import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"



const random = "hossana123@";

const rerandom = async () => {
  return await bcrypt.hash(random, 8);
};

const compare = async () => {
  const hashed = await rerandom();
  const result = await bcrypt.compare(random, hashed);
  console.log("Password match?", result);
};

compare();



const userSchema = new Schema(
  {
    username: {
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
  !this.isModified("password")? next(): 
    this.password = await bcrypt.hash("password", 8)
} )

// for password validation 
userSchema.methods.isPasswordCorrect = async function(password) {
  console.log(password)
  console.log(this.password)
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
