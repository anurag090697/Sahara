/** @format */

import jwt from "jsonwebtoken";
import { userDataModel } from "../models/usermodel.js";
import "dotenv/config";

async function loginCheck(req, res, next) {
  try {
    console.log(req.cookies);
    const { sahara_token } = req.cookies;
    if (!sahara_token) return;
    const valid = jwt.verify(sahara_token, process.env.JWT_SECRET);

    const loggedUser = await userDataModel.findById(valid.userId);
    if (!loggedUser) res.status(401).json({ error: "user not found" });
    // req.user = loggedUser;
    res.status(202).json({ ...loggedUser._doc, logged: true });
    
  } catch (error) {
    console.log(error);
  }
}

export default loginCheck;
