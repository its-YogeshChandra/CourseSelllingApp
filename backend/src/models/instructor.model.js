import mongoose, { Schema } from "mongoose";

const instructorSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    courseTeached: {
      type: String,
      trim: true,
    },
    ifuser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

// for hashing password
 instructorSchema.pre("save", async function (next) {
  !this.isModified("password")
    ? next()
    : (this.password = await bcrypt.hash(this.password, 8));
  next();
});

// for password validation
 instructorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//creating access Token
 instructorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//  Creating refresh Token
 instructorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Instructor = mongoose.model("Instructor", instructorSchema);
