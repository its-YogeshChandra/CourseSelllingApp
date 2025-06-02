import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/routes.js";
const app = express();

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

// for cookies
app.use(cookieParser())

//for routes 
app.use("/api/v1/users", router)


export { app };
