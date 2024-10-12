/** @format */

import express from "express";
import {
  userRegister,
  userLogin,
  userLoggedIn,
  userLogout,
  forgotPassword1,
  forgotPassword2,
  profileUpdate,
} from "../controllers/userController.js";
import {
  addNewProduct,
  changeWishlist,
  getAllProducts,
  getCartList,
  removeProduct,
} from "../controllers/productController.js";
import loginCheck from "../middlewares/loginCheck.js";
import upload from "../middlewares/imageUpload.js";
import { uploadImage } from "../services/uploadToCloudinary.js";

const saharaRouter = express.Router();

// saharaRouter.get("/some", (req, res) => {
//   res.send("luhuhuhuhh");
// });

saharaRouter.post("/register", userRegister);
saharaRouter.post("/login", userLogin);
saharaRouter.get("/userLogged", userLoggedIn);
saharaRouter.post("/logoutUser", userLogout);
saharaRouter.post("/forgotPassword/begin", forgotPassword1);
saharaRouter.post("/forgotpassword/otp", forgotPassword2);
saharaRouter.post("/updateProfile", profileUpdate);

saharaRouter.get("/allProducts", getAllProducts);
saharaRouter.delete("/removeProduct/:upis", removeProduct);
saharaRouter.post("/addNewProduct", upload.single("pics"), addNewProduct);
saharaRouter.post("/getcartlist", getCartList);
saharaRouter.post("/checkWishlist", changeWishlist);
// saharaRouter.post(
//   "/postPicture",
//   // tempMiid,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       // console.log(req.body);
//       let url = await uploadImage(req);
//       console.log(url);
//       res.send("url");
//     } catch (error) {
//       console.log(error);
//       res.send(error);
//     }
//   }
// );

// function tempMiid(req, res, next) {
//   console.log(req.body.url);
//   next();
// }
export default saharaRouter;
