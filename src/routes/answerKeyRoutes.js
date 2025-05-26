const express = require('express');
const router = express.Router();
const answerKeyController = require('../controllers/answerKeyController');

// 🔹 Create Answer Key (used by admin panel or backend)
router.post('/', answerKeyController.createAnswerKey);

// 🔹 Paginated list of Answer Keys
router.get('/', answerKeyController.getPaginatedAnswerKeys);

// 🔹 Get single Answer Key by slug (used for detail pages)
router.get('/:slug', answerKeyController.getAnswerKeyBySlug);

module.exports = router;
