const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Disable cache
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

// API Routes
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resultRoutes = require("./routes/resultRoutes");
const admitCardRoutes = require("./routes/admitCardRoutes");
const answerKeyRoutes = require("./routes/answerKeyRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const searchRoutes = require("./routes/searchRoutes");
const studyNewsRoutes = require("./routes/studyNewsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/admit-cards", admitCardRoutes);
app.use("/api/answer-keys", answerKeyRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/study-news", studyNewsRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("✅ API is running...");
  });
}

// DB Connection
const connectDB = async (attempts = 5) => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing in the .env file");
    }

    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    if (attempts > 0) {
      console.log(`🔄 Retrying MongoDB connection (${attempts - 1} attempts left)...`);
      setTimeout(() => connectDB(attempts - 1), 5000);
    } else {
      console.error("🚨 Max retry attempts reached. Exiting...");
      process.exit(1);
    }
  }
};

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB (once open)");
});

mongoose.connection.on("error", (err) => {
  console.error("🚨 MongoDB Connection Error:", err);
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

// Error Handling
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || "Internal Server Error" 
  });
});

process.on("uncaughtException", (err) => {
  console.error("🛑 Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("🚨 Unhandled Rejection:", err);
  process.exit(1);
});
