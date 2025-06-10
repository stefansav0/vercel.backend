// src/routes/contactRoutes.js
const express = require("express");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const router = express.Router();
require("dotenv").config();

// POST /api/contact
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your receiving email
      subject: `New Contact Message from ${name}`,
      text: message,
      replyTo: email, // ✅ Lets you reply to the user directly
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully" });
  })
);

module.exports = router;
