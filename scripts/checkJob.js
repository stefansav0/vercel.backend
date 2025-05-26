const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../src/models/Job");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("✅ Connected to DB");

  const job = await Job.findById("67f40f97c5d97f291dc63c1e");
  console.log("📋 Current Job:", job);

  mongoose.disconnect();
});
