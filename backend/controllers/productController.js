/** @format */
import mongoose from "mongoose";
import { productModel } from "../models/productsModel.js";
import { generateUniqueId } from "../services/idGenerator.js";
import { uploadImage } from "../services/uploadToCloudinary.js";
import { userDataModel } from "../models/usermodel.js";
import { cartlistModel } from "../models/cartlistModel.js";

export async function addNewProduct(req, res) {
  const product = req.body;
  const picU = await uploadImage(req, res);
  let tmid = generateUniqueId();
  product.upis = tmid;
  product.images = [picU];
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
    // console.log(error);
  }
}

export async function getCartList(req, res) {
  try {
    const { uid, email } = req.body;
    // console.log(req.body);
    // return res.send(req.body)

    const user = await userDataModel.findById(uid);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const cartlist = await cartlistModel.findOne({ oguID: uid });
    if (cartlist) {
      return res.status(200).json(cartlist);
    }
    const newcartlist = await new cartlistModel({
      oguID: uid,
      email,
      cartData: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
      },
      wishlistData: { products: [] },
    }).save();
    // if (newcartlist)
    res.status(201).json(newcartlist);
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting" });
  }
}

export async function changeWishlist(req, res) {
  try {
    const { email, upis, doThis } = req.body;
    const cartlist = await cartlistModel.findOne({ email });
    if (!cartlist) {
      return res.status(404).json({ error: "data not found" });
    }
    if (doThis === "remove") {
      let temp = cartlist.wishlistData.products;
      temp = temp.filter((ele) => {
        return ele.upis !== upis;
      });
      cartlist.wishlistData.products = temp;
      await cartlist.save();
      res.status(202).json(cartlist);
    } else {
      const temp = await productModel.findOne({ upis });
      const cartlist = await cartlistModel.findOne({ email });
      if (!temp || !cartlist) {
        return res.status(404).json({ error: "data not found" });
      }
      let tm2 = cartlist.wishlistData.products;
      cartlist.wishlistData.products = [...tm2, temp];

      await cartlist.save();
      res.status(202).json(cartlist);
    }
    // res.send("hehe");
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting" });
  }
}

export async function changeCart(req, res) {
  try {
    const { email, upis, doThis } = req.body;
    const cData = await cartlistModel.findOne({ email });
    if (!cData) {
      return res.status(500).json({ error: "An error occured while deleting" });
    }

    let tempc = cData.cartData.products;
    let quant = 0;
    let prc = 0;
    if (doThis === "remove") {
      let newprod = [];
      tempc.map((ele) => {
        if (ele.upis !== upis) {
          quant += ele.quantity;
          prc += ele.quantity * ele.offerPrice;
          newprod.push(ele);
        }
      });
      cData.cartData.products = newprod;
      cData.cartData.totalPrice = prc;
      cData.cartData.totalQuantity = quant;
      await cData.save();
      return res.status(202).json(cData);
    } else if (doThis === "add") {
      const prodData = await productModel.findOne({ upis });
      // console.log("first");
      if (!prodData) {
        return res
          .status(500)
          .json({ error: "An error occured while deleting" });
      }
      prodData.quantity = 1;
      let proArr = cData.cartData.products;
      cData.cartData.products = [...proArr, prodData];
      cData.cartData.totalPrice =
        cData.cartData.totalPrice + prodData.offerPrice;
      cData.cartData.totalQuantity = 1;
      await cData.save();

      res.status(202).json(cData);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting" });
  }
}
