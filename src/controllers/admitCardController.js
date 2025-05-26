const AdmitCard = require("../models/AdmitCard");
const slugify = require("slugify");

// 🔸 Create New Admit Card
exports.createAdmitCard = async (req, res) => {
  try {
    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true, strict: true }),
    };

    const admitCard = new AdmitCard(data);
    await admitCard.save();


    res.status(201).json({ message: "✅ Admit Card created successfully", admitCard });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving admit card", error: error.message });
  }
};

// 🔸 Get Paginated Admit Cards
exports.getPaginatedAdmitCards = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const admitCards = await AdmitCard.find()
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await AdmitCard.countDocuments();

    res.json({
      admitCards,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admit cards", error: error.message });
  }
};

// 🔸 Get Single Admit Card by Slug
exports.getAdmitCardBySlug = async (req, res) => {
  try {
    const admitCard = await AdmitCard.findOne({ slug: req.params.slug });

    if (!admitCard) {
      return res.status(404).json({ message: "Admit card not found" });
    }

    res.status(200).json(admitCard);
  } catch (err) {
    res.status(500).json({ message: "Error fetching admit card", error: err.message });
  }
};
