const express = require("express");
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Job = require("../models/Job");
const jobController = require("../controllers/jobController");

const router = express.Router();

const validJobTypes = ["full-time", "part-time", "contract", "internship"];

/**
 * 🔧 Helper to convert slug to title-case department
 */
function deSlugify(slug) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * 📌 Slug-based Job Detail Route — Must Come Before :id
 */
router.get("/slug/:department/:slug", async (req, res) => {
  try {
    const department = decodeURIComponent(req.params.department); // Keep slug version
    const slug = decodeURIComponent(req.params.slug);

    const job = await Job.findOne({
      slug,
      department: { $regex: new RegExp(`^${department}$`, "i") },
    });

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, job });
  } catch (err) {
    console.error("❌ Error in slug route:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


/**
 * 📌 POST /api/jobs — Create Job
 */
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Job title is required"),
    body("department").notEmpty().withMessage("Department is required"),
    
    body("category").notEmpty().withMessage("Category is required"),
    
    body("eligibility").notEmpty().withMessage("Eligibility is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("applyLink").notEmpty().isURL().withMessage("Valid apply link is required"),
    body("lastDate").notEmpty().isISO8601().withMessage("Valid date required")
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }
    next();
  },
  jobController.createJob
);

/**
 * 📌 GET /api/jobs/latest — Latest Jobs (with optional limit)
 */
router.get("/latest", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const latestJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("-__v")
      .lean();

    res.json({ success: true, jobs: latestJobs });
  } catch (error) {
    console.error("❌ Error fetching latest jobs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * 📌 GET /api/jobs — All Jobs (with optional category, pagination)
 */
router.get("/", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");

  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = category ? { category } : {};

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .select("-__v")
      .lean();

    res.json({ success: true, jobs });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * 📌 GET /api/jobs/:id — Job by ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Job ID" });
  }

  try {
    const job = await Job.findById(id).select("-__v").lean();
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    res.json({ success: true, job });
  } catch (error) {
    console.error("❌ Error fetching job by ID:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/**
 * 📌 PUT /api/jobs/:id — Update Job
 */
router.put(
  "/:id",
  [
    body("title").optional().trim().notEmpty(),
    body("salary").optional().isNumeric(),
    body("jobType").optional().isIn(validJobTypes),
    body("applyLink").optional().isURL(),
  ],
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Job ID" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    try {
      const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      }).select("-__v");

      if (!updatedJob) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }

      res.json({ success: true, message: "Job updated successfully", job: updatedJob });
    } catch (error) {
      console.error("❌ Error updating job:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

/**
 * 📌 DELETE /api/jobs/:id — Delete Job
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid Job ID" });
  }

  try {
    const job = await Job.findByIdAndDelete(id).select("-__v");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, message: "Job deleted successfully", job });
  } catch (error) {
    console.error("❌ Error deleting job:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
