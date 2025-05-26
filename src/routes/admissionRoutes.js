const express = require("express");
const router = express.Router();
const admissionController = require("../controllers/admissionController");

// Create
router.post("/", admissionController.createAdmission);

// Read all (paginated)
router.get("/", admissionController.getPaginatedAdmissions);

// Read one by slug
router.get("/:slug", admissionController.getAdmissionBySlug);

// Update by ID
router.put("/:id", admissionController.updateAdmission);

// Delete by ID
router.delete("/:id", admissionController.deleteAdmission);

module.exports = router;
