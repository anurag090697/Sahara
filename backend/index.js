/** @format */

import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import saharaRouter from "./routes/saharaRoutes.js";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};

const app = express();
const port = 6789;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/shop", saharaRouter);

try {
  await mongoose.connect(process.env.DB_ID);
  app.listen(port, () => {
    console.log(`Database connected and server is running at port ${port}`);
  });
} catch (err) {
  console.log(err);
}

// console.log(Math.floor(Math.random() * 100000));
