/** @format */

import mongoose from "mongoose";

const cartlistSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    oguID: { type: String, required: true },
    cartData: {
      products: [{ type: Object }],
      totalQuantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
    wishlistData: {
      products: [{ type: Object }],
    },
  },
  { timestamps: true }
);

export const cartlistModel = mongoose.model("sahara_cart", cartlistSchema);
