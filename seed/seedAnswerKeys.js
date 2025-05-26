const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../src/config/db");
const AnswerKey = require("../src/models/AnswerKey");

const answerKeys = [
  {
    title: "Supreme Court SCI Junior Court Assistant Answer Key 2025",
    slug: "supreme-court-sci-junior-court-assistant-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "UPSSSC Assistant Store Keeper Answer Key 2025",
    slug: "upsssc-assistant-store-keeper-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "UPSSSC Mandi Parishad Sachiv Grade II Answer Key 2025",
    slug: "upsssc-mandi-parishad-sachiv-grade-ii-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "NTA JEEMAIN Session II Answer Key 2025",
    slug: "nta-jeemain-session-ii-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "UPSSSC X Ray Technician 2023 Revised Answer Key",
    slug: "upsssc-x-ray-technician-2023-revised-answer-key",
    answerKeyLink: "#",
  },
  {
    title: "SSC MTS 2024 Final Answer Key",
    slug: "ssc-mts-2024-final-answer-key",
    answerKeyLink: "#",
  },
  {
    title: "RPSC EO / RO Answer Key 2025",
    slug: "rpsc-eo-ro-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "Railway RPF Constable Answer Key 2025",
    slug: "railway-rpf-constable-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "Rajasthan REET 2025 Question Paper",
    slug: "rajasthan-reet-2025-question-paper",
    answerKeyLink: "#",
  },
  {
    title: "SSC CPO SI 2024 Paper II Answer Key",
    slug: "ssc-cpo-si-2024-paper-ii-answer-key",
    answerKeyLink: "#",
  },
  {
    title: "NTA CSIR UGC NET Answer Key 2025",
    slug: "nta-csir-ugc-net-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "Bihar Board Class 10th Matric Answer Key 2025",
    slug: "bihar-board-class-10th-matric-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "MPESB Group 5 Paramedical Post Answer Key 2025",
    slug: "mpesb-group-5-paramedical-post-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "SSC GD Constable Answer Key 2025",
    slug: "ssc-gd-constable-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "Bihar Board Class 12th Inter Answer Key 2025",
    slug: "bihar-board-class-12th-inter-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "GATE 2025 Answer Key",
    slug: "gate-2025-answer-key",
    answerKeyLink: "#",
  },
  {
    title: "UPSSSC Assistant Accountant Answer Key 2025",
    slug: "upsssc-assistant-accountant-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "UPSSSC Junior Analyst Food Answer Key 2025",
    slug: "upsssc-junior-analyst-food-answer-key-2025",
    answerKeyLink: "#",
  },
  {
    title: "MPPSC Pre 2025 Answer Key",
    slug: "mppsc-pre-2025-answer-key",
    answerKeyLink: "#",
  },
];

const seedAnswerKeys = async () => {
  try {
    await connectDB();
    await AnswerKey.deleteMany();
    await AnswerKey.insertMany(answerKeys);
    console.log("✅ Answer Keys seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedAnswerKeys();
