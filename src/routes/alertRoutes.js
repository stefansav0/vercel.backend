const express = require("express");
const { sendJobAlert } = require("../controllers/alertController");
const router = express.Router();

router.post("/send", sendJobAlert);

module.exports = router;
