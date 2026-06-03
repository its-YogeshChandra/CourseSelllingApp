import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { courseRouter, router, insturctorRouter } from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/globaError.middleware.js";

const app = express();

// for cookies
app.use(cookieParser());

// CORS configuration
// origin: ["*"] with credentials: true is INVALID per the CORS spec.
// Browsers silently reject it, breaking cookies and auth headers.
// Use ALLOWED_ORIGINS env var (comma-separated) to whitelist domains.
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (server-to-server, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
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

// for instructor routes
app.use("/api/v1/instructor", insturctorRouter);

//for global error
app.use(errorMiddleware);

export { app };
