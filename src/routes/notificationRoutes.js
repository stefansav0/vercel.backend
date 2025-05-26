const express = require("express");
const sendSMS = require("../utils/sendSMS");
const sendWhatsApp = require("../utils/sendWhatsApp");

const router = express.Router();

// Send SMS Route
router.post("/send-sms", async (req, res) => {
  const { phone, message } = req.body;

  try {
    await sendSMS(phone, message);
    res.json({ message: "✅ SMS sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to send SMS" });
  }
});

// Send WhatsApp Message Route
router.post("/send-whatsapp", async (req, res) => {
  const { phone, message } = req.body;

  try {
    await sendWhatsApp(phone, message);
    res.json({ message: "✅ WhatsApp message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to send WhatsApp message" });
  }
});

module.exports = router;
