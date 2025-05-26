const express = require("express");
const router = express.Router();

// Import Models
const Job = require("../models/Job"); // ✅ Ensure the filename is correct
const Result = require("../models/Result");
const AdmitCard = require("../models/AdmitCard");
const AnswerKey = require("../models/AnswerKey");
const Admission = require("../models/Admission");

// @route   GET /api/search?q=...
// @desc    Search in all collections by title
// @access  Public
router.get("/", async (req, res) => {
  const query = req.query.q?.trim().toLowerCase();

  if (!query) {
    return res.status(400).json({ success: false, message: "Search query is required" });
  }

  try {
    const [job, result, admit, answer, admission] = await Promise.all([
      Job.findOne({ title: { $regex: query, $options: "i" } }),
      Result.findOne({ title: { $regex: query, $options: "i" } }),
      AdmitCard.findOne({ title: { $regex: query, $options: "i" } }),
      AnswerKey.findOne({ title: { $regex: query, $options: "i" } }),
      Admission.findOne({ title: { $regex: query, $options: "i" } }),
    ]);

    if (job) return res.json({ type: "jobs", slug: job.slug });
    if (result) return res.json({ type: "result", slug: result.slug });
    if (admit) return res.json({ type: "admit-card", slug: admit.slug });
    if (answer) return res.json({ type: "answer-key", slug: answer.slug });
    if (admission) return res.json({ type: "admission", slug: admission.slug });

    return res.status(404).json({ success: false, message: "No match found" });

  } catch (error) {
    console.error("❌ Search error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
