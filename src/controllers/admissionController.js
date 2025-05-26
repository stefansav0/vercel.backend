const Admission = require("../models/Admission");
const slugify = require("slugify");

// 🔸 Create New Admission
exports.createAdmission = async (req, res) => {
  try {
    // Validate required field
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true, strict: true }),
    };

    // Optional: Normalize or validate dates
    if (data.lastDate && isNaN(Date.parse(data.lastDate))) {
      return res.status(400).json({ message: "Invalid lastDate format" });
    }

    const admission = new Admission(data);
    await admission.save();

    res.status(201).json({
      message: "✅ Admission created successfully",
      admission,
    });
  } catch (error) {
    console.error("❌ Error saving admission:", error); // Log full error in backend
    if (error.code === 11000 && error.keyPattern?.slug) {
      return res.status(409).json({ message: "Slug already exists. Try a different title." });
    }
    res.status(500).json({ message: "❌ Error saving admission", error: error.message });
  }
};

// 🔸 Get Paginated Admissions
exports.getPaginatedAdmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const admissions = await Admission.find()
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Admission.countDocuments();

    res.json({
      admissions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error fetching admissions",
      error: error.message,
    });
  }
};

// 🔸 Get Single Admission by Slug
exports.getAdmissionBySlug = async (req, res) => {
  try {
    const admission = await Admission.findOne({ slug: req.params.slug });

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.status(200).json(admission);
  } catch (err) {
    res.status(500).json({
      message: "❌ Error fetching admission",
      error: err.message,
    });
  }
};

// 🔸 Update Admission by ID
exports.updateAdmission = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    if (req.body.title) {
      updatedData.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const updatedAdmission = await Admission.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedAdmission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.status(200).json({
      message: "✅ Admission updated successfully",
      admission: updatedAdmission,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating admission",
      error: error.message,
    });
  }
};

// 🔸 Delete Admission by ID
exports.deleteAdmission = async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Admission not found" });
    }
    res.status(200).json({ message: "✅ Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error deleting admission",
      error: error.message,
    });
  }
};
