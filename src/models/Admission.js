const mongoose = require("mongoose");
const slugify = require("slugify");

const admissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  conductedBy: { type: String },
  eligibility: { type: String },
  ageLimit: { type: String },
  course: { type: String },
  applicationFee: { type: String },
  fullCourseDetails: { type: String },
  examDate: { type: Date },

  
  applicationBegin: { type: Date },
  lastDateApply: { type: Date },
  admissionDate: { type: String },

  importantLinks: {
    applyOnline: { type: String },
    downloadNotice: { type: String },
    officialWebsite: { type: String }
  },

  publishDate: { type: Date, default: Date.now },

  status: { type: String, enum: ["active", "expired"], default: "active" } // ADDED
});

admissionSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.lastDate && new Date(this.lastDate) < new Date()) {
    this.status = "expired";
  }

  next();
});

const Admission = mongoose.model("Admission", admissionSchema);
module.exports = Admission;
