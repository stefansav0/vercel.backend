const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📩 Send OTP Email
const sendOTPEmail = async (user, otp) => {
  const mailOptions = {
    from: `"Finderight" <${process.env.EMAIL_USER}>`, // 👈 Sender name
    to: user.email,
    subject: "Your One-Time Password (OTP) from Finderight",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #0057ff;">Finderight Email Verification</h2>
        
        <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>
        
        <p style="font-size: 15px; color: #333;">
          Thank you for signing up with <strong>Finderight</strong>.
          Your One-Time Password (OTP) is:
        </p>
        
        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; text-align: center; letter-spacing: 4px; color: #0057ff;">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #555;">
          This OTP is valid for <strong>10 minutes</strong>. Please use it promptly to verify your email.
        </p>

        <p style="font-size: 14px; color: #888; margin-top: 30px;">
          If you did not request this email, please ignore it. No further action is needed.
        </p>

        <hr style="margin: 40px 0;" />

        <footer style="text-align: center; font-size: 12px; color: #aaa;">
          You’re receiving this email because you registered on <strong>Finderight</strong>.<br />
        </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error.message || error);
    throw new Error("Failed to send OTP email.");
  }
};

// 📝 Signup Route with OTP
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { name, email, password, role = "user" } = req.body;

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
      role,
      otp,
      otpExpires,
    });

    await newUser.save();
    await sendOTPEmail(newUser, otp);

    res.status(201).json({ success: true, message: "OTP sent to your email" });
  })
);

// ✅ Verify OTP Route
router.post(
  "/verify-otp",
  asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified) return res.status(200).json({ message: "User already verified" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Optional: Auto login after verification
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Email verified successfully!",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  })
);

// 🔁 Resend OTP Route
router.post(
  "/resend-otp",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });

    if (!user.otpExpires || user.otpExpires < new Date()) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      await sendOTPEmail(user, otp);
      return res.json({ success: true, message: "OTP resent to your email" });
    }

    res.status(400).json({ message: "OTP is still valid. Please wait before requesting a new one." });
  })
);

// 🔐 Login Route
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  })
);

// 🔁 Forgot Password - Send OTP
router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetOtp = otp;
    user.resetOtpExpires = otpExpires;
    await user.save();

    // Styled HTML email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
        <h2 style="color: #0057ff;">Finderight Password Reset</h2>

        <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>

        <p style="font-size: 15px; color: #333;">
          You requested to reset your Finderight password. Please use the OTP below:
        </p>

        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; text-align: center; letter-spacing: 4px; color: #0057ff;">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #555;">
          This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.
        </p>

        <p style="font-size: 14px; color: #888; margin-top: 30px;">
          If you did not request this, please ignore this email.
        </p>

        <hr style="margin: 40px 0;" />

        <footer style="text-align: center; font-size: 12px; color: #aaa;">
          You’re receiving this email because a password reset was requested for your Finderight account.<br />
        
        </footer>
      </div>
    `;

    await transporter.sendMail({
      from: `"Finderight" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset Your Password – Finderight OTP",
      html: htmlContent,
    });

    res.json({ success: true, message: "OTP sent to your email" });
  })
);


// 🔐 Reset Password with OTP
router.post(
  "/reset-password",
  asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.resetOtpExpires || user.resetOtpExpires < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  })
);

// ✅ 🆕 Update Profile Route
router.put("/update-profile", authMiddleware, asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true }
  ).select("-password");
  res.json({ success: true, message: "Profile updated", user: updated });
}));

// ✅ 🆕 Delete Account Route
router.delete("/delete-account", authMiddleware, asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ success: true, message: "Account deleted successfully" });
}));

module.exports = router;
