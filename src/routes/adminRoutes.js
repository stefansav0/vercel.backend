const express = require("express");
const { checkSubscription } = require("../middleware/subscriptionMiddleware");
const { getAnalytics, getLiveUpdates } = require("../controllers/adminController");

const router = express.Router();

router.get("/analytics", checkSubscription, getAnalytics);
router.get("/live-updates", checkSubscription, getLiveUpdates);

module.exports = router;
