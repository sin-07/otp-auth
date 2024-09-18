const express = require("express");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const securePassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      password: securePassword,
    });

    await user.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  try {
    const genrateOtp = Math.floor(Math.random() * 10000);

    var transporter = nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      // port: 2525,
      service: "gmail",
      auth: {
        user: "aniket.singh07vs@gmail.com",
        pass: "fidmnumrlsgcjfvm",
      },
    });

    const info = await transporter.sendMail({
      from: '"Maddison Foo👻" <aniket.singh07vs@gmail.com>', 
      to: email, 
      subject: "New OTP Generated", 
      html: `<b>OTP is : <i>${genrateOtp}</i></b>`, 
    });

    if (info.messageId) {
      let user = await User.findOneAndUpdate(
        { email },
        { otp: genrateOtp },
        { new: true }
      );

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
    }
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/verify", async (req, res) => {
  const { otp, password } = req.body;
  try {
    let user = await User.findOne({ otp });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const securePassword = await bcrypt.hash(password, 10);

    user = await User.findOneAndUpdate(
      { otp },
      { password: securePassword, otp: 0 },
      { new: true }
    );

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
