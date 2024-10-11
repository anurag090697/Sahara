/** @format */
import mongoose from "mongoose";
import { productModel } from "../models/productsModel.js";
import { generateUniqueId } from "../services/idGenerator.js";
import { uploadImage } from "../services/uploadToCloudinary.js";

export async function addNewProduct(req, res) {
  const product = req.body;
  const picU = await uploadImage(req, res);
  let tmid = generateUniqueId();
  product.upis = tmid;
  const validate = new productModel({ ...product }).save();
  // if (validate) console.log(validate);
  // console.log(product);
  res
    .status(201)
    .json({ item: "newProduct", message: "Product was added successuflly" });
}
 
export async function getAllProducts(req, res) {
  const products = await productModel.find();
  // console.log(products);
  res.json([...products]);
}

export async function removeProduct(req, res) {
  try {
    const upis = req.params.upis;
    const deletedProduct = await productModel.find({ upis }).deleteOne();
    if (deletedProduct) {
      res.status(202).json({ messgae: "Product deleted from database" });
    } else res.status(500).json({ error: "An error occured while deleting" });
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting" });
    console.log(error);
  }
}
