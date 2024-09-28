/** @format */

import express from "express";
import {
  userRegister,
  userLogin,
  userLoggedIn,
  userLogout,
  forgotPassword1,
  forgotPassword2,
} from "../controllers/userController.js";
import loginCheck from "../middlewares/loginCheck.js";

const saharaRouter = express.Router();

// saharaRouter.get("/some", (req, res) => {
//   res.send("luhuhuhuhh");
// });

saharaRouter.post("/register", userRegister);
saharaRouter.post("/login", userLogin);
saharaRouter.get("/userLogged", userLoggedIn);
saharaRouter.post("/logoutUser", userLogout);
saharaRouter.post("/forgotPassword/begin", forgotPassword1);
saharaRouter.post("/forgotpassword/otp",forgotPassword2)

export default saharaRouter;
