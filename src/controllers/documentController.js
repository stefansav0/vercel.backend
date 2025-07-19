const Document = require("../models/Document");
const slugify = require("slugify");

// 🔹 Create New Document
exports.createDocument = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const data = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true, strict: true }),
    };

    const document = new Document(data);
    await document.save();

    res.status(201).json({
      message: "✅ Document created successfully",
      document,
    });
  } catch (error) {
    console.error("❌ Error saving document:", error);
    if (error.code === 11000 && error.keyPattern?.slug) {
      return res.status(409).json({ message: "Slug already exists. Try a different title." });
    }
    res.status(500).json({ message: "❌ Error saving document", error: error.message });
  }
};

// 🔹 Get Paginated Documents
exports.getPaginatedDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const documents = await Document.find()
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Document.countDocuments();

    res.json({
      documents,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error fetching documents",
      error: error.message,
    });
  }
};

// 🔹 Get Single Document by Slug
exports.getDocumentBySlug = async (req, res) => {
  try {
    const document = await Document.findOne({ slug: req.params.slug });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: "❌ Error fetching document",
      error: err.message,
    });
  }
};

// 🔹 Update Document by ID
exports.updateDocument = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    if (req.body.title) {
      updatedData.slug = slugify(req.body.title, { lower: true, strict: true });
    }

    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({
      message: "✅ Document updated successfully",
      document: updatedDocument,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error updating document",
      error: error.message,
    });
  }
};

// 🔹 Delete Document by ID
exports.deleteDocument = async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.status(200).json({ message: "✅ Document deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "❌ Error deleting document",
      error: error.message,
    });
  }
};
