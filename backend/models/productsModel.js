/** @format */

import mongoose from "mongoose";

const productScehema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    upis: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    attributes: {
      type: Object,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "sahara_User" },
      },
    ],
    totalRatings: { type: Number },
    addedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("sahara_product", productScehema);
