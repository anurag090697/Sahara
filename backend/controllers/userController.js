/** @format */

import { userDataModel } from "../models/usermodel.js";
import { generatojwtToken } from "../services/jwtToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendMail } from "../services/mailSender.js";
import { newOtp } from "../services/otpGenerator.js";

let verify = { email: "", otp: "" };

export async function userRegister(req, res) {
  try {
    let { firstname, lastname, email, password, gender, mobile, age, role } =
      req.body;
    const secretPassword = await bcrypt.hash(password, 11);
    password = secretPassword;
    const newUser = new userDataModel({
      firstname,
      lastname,
      email,
      password,
      gender,
      age,
      mobile,
      role,
    });
    // console.log(newUser);
    await newUser.save();
    // console.log('first');
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password, role } = req.body;
    const checkUser = await userDataModel.findOne({ email }).exec();

    if (!checkUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const passCheck = await bcrypt.compare(password, checkUser.password);

    // console.log(passCheck);
    if (!passCheck) {
      return res.status(401).json({ error: "Credentials do not match" });
    } else if (checkUser.role === role) {
      // { ...checkUser, logged: true }
      const newToken = generatojwtToken(checkUser);
      //   console.log(newToken);
      res
        .cookie("sahara_token", newToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 9600000,
        })
        .status(202)
        .json({ ...checkUser._doc, logged: true });
    }
  } catch (err) {
    console.log(err);
  }
}

export async function userLoggedIn(req, res) {
  try {
    const { sahara_token } = req.cookies;
    if (!sahara_token) return;
    const valid = jwt.verify(sahara_token, process.env.JWT_SECRET);

    const loggedUser = await userDataModel.findById(valid.userId);
    if (!loggedUser) res.status(401).json({ error: "user not found" });

    res.status(202).json({ ...loggedUser._doc, logged: true });
  } catch (error) {
    console.log(error);
  }
}

export function userLogout(req, res) {
  try {
    res.clearCookie("sahara_token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ error: err });
  }
}

export async function forgotPassword1(req, res) {
  const { email } = req.body;

  try {
    const validate = await userDataModel.findOne({ email }).exec();

    if (!validate) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    verify.otp = newOtp();
    verify.email = email;
    await sendMail(email, verify.otp);
    setTimeout(() => {
      verify = { email: "", otp: "" };
    }, 120000);
    res
      .status(201)
      .json({ message: "otp sent successfully", statusText: "OK" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function forgotPassword2(req, res) {
  const { email, otp, password } = req.body;
  if (email == verify.email && otp == verify.otp) {
    // console.log("success");
    const temp = await userDataModel.findOne({ email });
    let newpass = await bcrypt.hash(password, 11);
    temp.password = newpass;
    await temp.save();
    res
      .status(200)
      .json({ message: "Password changed successfully", otpVerified: true });
  }
}

export async function profileUpdate(req, res) {
  const { email } = req.body;
  try {
    const user = await userDataModel.findOne({ email });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
