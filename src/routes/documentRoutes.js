const express = require("express");
const router = express.Router();
const {
  createDocument,
  getPaginatedDocuments,
  getDocumentBySlug,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");

// 🔹 Create a new document service
router.post("/", createDocument);

// 🔹 Get paginated documents list
router.get("/", getPaginatedDocuments);

// 🔹 Get single document by slug
router.get("/:slug", getDocumentBySlug);

// 🔹 Update document by ID
router.put("/:id", updateDocument);

// 🔹 Delete document by ID
router.delete("/:id", deleteDocument);

module.exports = router;
