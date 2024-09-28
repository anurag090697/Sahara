/** @format */

import mongoose from "mongoose";

const userDataSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      requred: true,
    },
    lastname: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      requred: true,
    },
    gender: {
      type: String,
      requred: true,
    },
    role: {
      type: String,
      requred: true,
    },
  },
  { timestamps: true }
);

export const userDataModel = mongoose.model("sahara_User", userDataSchema);
