import mongoose from "mongoose";
import dotenv from "dotenv";
import { DbName } from "../constants.js";

dotenv.config({
  path: "./.env",
});

const connectDb = async () => {
  try {
    const connector = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DbName}`
    );
    console.log(
      `mongoDb is connected and the host is : ${connector.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

export { connectDb };
