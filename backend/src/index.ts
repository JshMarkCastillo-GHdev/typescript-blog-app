import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import pool from "./config/db.js";
import { SVPORT, APPORG } from "./constants/env.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import catchErrors from "./utils/catchErrors.js";
import { OK } from "./constants/http.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APPORG,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.status(OK).json({
    status: "success",
  });
});

// auth routes
app.use("/auth", authRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await pool.query("SELECT 1"); // Test connection with the DB first
    console.log("Postgres is connected.");

    app.listen(SVPORT, () => {
      console.log(`Server Running at port ${SVPORT}.`);
    });
  } catch (error) {
    console.error("Failed to connect to Postgres", error);
    process.exit(1);
  }
};

startServer();
