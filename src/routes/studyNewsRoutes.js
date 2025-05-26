const express = require("express");
const router = express.Router();

const {
  createStudyNews,
  getStudyNewsBySlug,
  getPaginatedStudyNews,
} = require("../controllers/studyNewsController");

// ✅ POST: Create new Study News article
router.post("/", createStudyNews);

// ✅ GET: Get a single news article by slug
// Example: /api/study-news/slug/some-title
router.get("/slug/:slug", getStudyNewsBySlug);

// ✅ GET: Paginated list of Study News
// Example: /api/study-news?page=1
router.get("/", getPaginatedStudyNews);

module.exports = router;
