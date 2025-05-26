const AnswerKey = require("../models/AnswerKey");
const { sendToAllUsers } = require("../utils/sendEmail");
const slugify = require("slugify");

// 🔸 Create New Answer Key
exports.createAnswerKey = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true, strict: true }),
      departmentSlug: slugify(req.body.department || "", { lower: true, strict: true }),
    };

    const answerKey = new AnswerKey(data);
    await answerKey.save();

    res.status(201).json({ message: "✅ Answer Key created successfully", answerKey });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving answer key", error: error.message });
  }
};

// 🔸 Get Paginated Answer Keys
exports.getPaginatedAnswerKeys = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const answerKeys = await AnswerKey.find()
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AnswerKey.countDocuments();

    res.json({
      answerKeys,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching answer keys", error: error.message });
  }
};

// 🔸 Get Single Answer Key by Slug
exports.getAnswerKeyBySlug = async (req, res) => {
  try {
    const answerKey = await AnswerKey.findOne({ slug: req.params.slug });

    if (!answerKey) {
      return res.status(404).json({ message: "Answer key not found" });
    }

    res.status(200).json(answerKey);
  } catch (err) {
    res.status(500).json({ message: "Error fetching answer key", error: err.message });
  }
};
