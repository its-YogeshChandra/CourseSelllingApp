import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { courseRouter, router } from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/globaError.middleware.js";

const app = express();

// for cookies
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "25kb",
  })
);

app.use(
  urlencoded({
    limit: "25kb",
    extended: true,
  })
);

app.use(express.static("./public/temp"));


//for user routes
app.use("/api/v1/users", router);

// for course routes
app.use("/api/v1/course", courseRouter);

//for global error
app.use(errorMiddleware);

export { app };
