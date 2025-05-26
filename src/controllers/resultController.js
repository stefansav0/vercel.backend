const Result = require("../models/Result");
const { sendToAllUsers } = require("../utils/sendEmail");
const slugify = require("slugify");

// ✅ Create Result and Notify Users
exports.createResult = async (req, res) => {
  try {
    const {
      title,
      shortInfo,
      link,
      date,
      postDate,
      examDate,
      resultDate,
      conductedBy,
      importantLinks,
      howToCheck,
    } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const result = new Result({
      title,
      shortInfo,
      link,
      date,
      postDate,
      examDate,
      resultDate,
      conductedBy,
      importantLinks,
      howToCheck,
      slug,
      publishDate: new Date()
    });

    await result.save();

    await sendToAllUsers({
      subject: `📢 New Result Declared - ${title}`,
      html: `
        <p>Hi {{name}},</p>
        <p>The result for <strong>${title}</strong> has been published.</p>
        <ul>
          <li><strong>Exam Date:</strong> ${examDate ? new Date(examDate).toLocaleDateString() : "N/A"}</li>
          <li><strong>Result Date:</strong> ${resultDate ? new Date(resultDate).toLocaleDateString() : "N/A"}</li>
          <li><strong>Conducted By:</strong> ${conductedBy || "N/A"}</li>
        </ul>
        <p><a href="https://your-frontend.com/result/${slug}">👉 View Full Result Details</a></p>
        <p>Best regards,<br />Sarkari Portal</p>
      `
    });

    res.status(201).json({ message: "✅ Result created successfully", result });

  } catch (error) {
    console.error("❌ Error saving result:", error);
    res.status(500).json({ message: "Error saving result", error: error.message });
  }
};

// ✅ Get Single Result by Slug
exports.getResultBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await Result.findOne({ slug });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(result);

  } catch (error) {
    console.error("❌ Error fetching result:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Paginated Results
exports.getPaginatedResults = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const results = await Result.find()
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Result.countDocuments();

    res.status(200).json({
      results,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });

  } catch (error) {
    console.error("❌ Error fetching results:", error);
    res.status(500).json({ message: "Error fetching results", error: error.message });
  }
};
