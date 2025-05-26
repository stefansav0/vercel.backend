const mongoose = require("mongoose");
const slugify = require("slugify");

const admitCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  conductedby: String,
  examDate: String,
  applicationBegin: String,
  lastDateApply: String,
  admitCard: String,
  publishDate: { type: Date, default: Date.now },
  description: String,
  howToDownload: String,
  importantLinks: {
    downloadAdmitCard: String,
    officialWebsite: String,
  },
}, { timestamps: true });

admitCardSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("AdmitCard", admitCardSchema);
