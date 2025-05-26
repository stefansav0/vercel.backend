const mongoose = require("mongoose");
const slugify = require("slugify");

const resultSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },

  conductedBy: { type: String },                 // ✅ Added
  department: { type: String },
  category: { type: String },
  eligibility: { type: String },
  ageLimit: { type: String },

  examDate: { type: String },
  resultDate: { type: String },
  postDate: { type: Date, default: Date.now },   // ✅ Renamed from publishDate

  shortInfo: { type: String },                   // ✅ Renamed from description
  howToCheck: { type: String },

  importantDates: {
    applicationBegin: String,
    lastDateApply: String,
    examDate: String,
    resultDate: String
  },

  importantLinks: [                              // ✅ Keep as array of objects
    {
      label: String,
      url: String
    }
  ]
}, { timestamps: true });

resultSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Result", resultSchema);
