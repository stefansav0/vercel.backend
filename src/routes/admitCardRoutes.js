const express = require('express');
const router = express.Router();
const admitCardController = require('../controllers/admitCardController');

// 🔹 Create Admit Card (used by admin panel or backend)
router.post('/', admitCardController.createAdmitCard);

// 🔹 Paginated list of Admit Cards
router.get('/', admitCardController.getPaginatedAdmitCards);

// 🔹 Get single Admit Card by slug (used for detail pages)
router.get('/:slug', admitCardController.getAdmitCardBySlug);

module.exports = router;
