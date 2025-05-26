const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail"); // Function to send emails
require("dotenv").config();

const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(email, "Verify Your Email", `Click here to verify your email: ${verificationUrl}`);

    res.status(201).json({ message: "User registered! Check your email for verification." });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// VERIFY EMAIL
router.get("/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
  
      const user = await User.findOne({ verificationToken: token });
      if (!user) return res.status(400).json({ message: "Invalid or expired token" });
  
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully!" });
  
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });

  // RESEND VERIFICATION EMAIL
router.post("/resend-verification", async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.isVerified) return res.status(400).json({ message: "Email already verified" });
  
      // Generate new verification token
      user.verificationToken = crypto.randomBytes(32).toString("hex");
      await user.save();
  
      // Send email
      const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${user.verificationToken}`;
      await sendEmail(email, "Verify Your Email", `Click here to verify your email: ${verificationUrl}`);
  
      res.status(200).json({ message: "Verification email resent!" });
  
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  

module.exports = router;
