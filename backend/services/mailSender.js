/** @format */

import { createTransport } from "nodemailer";
import "dotenv/config";

export const sendMail = async (reciever, body) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: process.env.usermail,
      pass: process.env.userpass,
    },
  });
  try {
    await transport.sendMail({
      from: process.env.usermail,
      to: reciever,
      subject: "This is otp for reseting you password",
      text: `Hello user, this ${body} is the otp for your password reset and it will be valid for sixty secons only.If you did not request this we advise you to change your password asap.`,
    });
  } catch (err) {
    console.log(err);
  }
};
