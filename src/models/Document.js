const mongoose = require("mongoose");
const slugify = require("slugify");

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // Identity, EPFO, ESIC, Ayushman, etc.
  serviceType: { type: String }, // e.g., Apply, Download, Check Status
  description: { type: String },
  link: { type: String }, // Direct link to the govt service or action

  // Optional: for display control
  publishDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "expired"], default: "active" }
});

documentSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
