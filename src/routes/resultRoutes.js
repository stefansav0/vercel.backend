const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const {
  createResult,
  getResultBySlug
} = require("../controllers/resultController");

// ✅ Create a new result
router.post("/", createResult);

// ✅ Get paginated results: /api/results?page=1
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const results = await Result.find()
      .sort({ createdAt: -1 }) // Sort by created time (newest first)
      .skip(skip)
      .limit(limit);

    const total = await Result.countDocuments();

    res.json({
      results,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("❌ Error fetching results:", error);
    res.status(500).json({ message: "Error fetching results" });
  }
});

// ✅ Get all results without pagination
router.get("/all", async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a single result by slug
router.get("/:slug", getResultBySlug);

module.exports = router;
