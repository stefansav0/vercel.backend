const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // For signup verification
    },
    otp: {
      type: String, // Signup OTP
    },
    otpExpires: {
      type: Date, // Signup OTP expiration
    },
    resetOtp: {
      type: String, // Forgot password OTP
    },
    resetOtpExpires: {
      type: Date, // Forgot password OTP expiration
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
