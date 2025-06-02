import express from "express";
import { connectDb } from "./db/dbase.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

try {
  connectDb().then(
    app.listen(`${process.env.PORT}`,() => {
      console.log(`App is listening on the port : ${process.env.PORT}`);
    })
  );
} catch (error) {
  console.log(`Error : ${error}`);
}
