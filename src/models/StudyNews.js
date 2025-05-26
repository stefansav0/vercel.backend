const mongoose = require("mongoose");
const slugify = require("slugify");

const studyNewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, required: true }, // HTML content
    coverImage: { type: String }, // Optional
    author: { type: String, default: "Admin" },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Auto-generate slug before save
studyNewsSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("StudyNews", studyNewsSchema);
