import mongoose from "mongoose";
import dotenv from "dotenv";
import { DbName } from "../constants.js";

dotenv.config({
  path: "./env",
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
    console.error(`Error is :${error}`);
  }
};

export { connectDb };
