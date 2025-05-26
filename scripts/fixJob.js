const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../src/models/Job");

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to DB");

  const updated = await Job.findByIdAndUpdate(
    "67f40f97c5d97f291dc63c1e",
    {
      department: "Engineering",
      eligibility: "B.E./B.Tech in relevant stream",
      category: "engineering",
      lastDate: new Date("2025-04-30")
    },
    { new: true }
  );

  console.log("✅ Job updated:", updated);

  mongoose.disconnect();
};

run();
