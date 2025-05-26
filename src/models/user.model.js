const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Email verification status
  verificationToken: { type: String }, // Token for email verification
});

module.exports = mongoose.model("User", userSchema);
