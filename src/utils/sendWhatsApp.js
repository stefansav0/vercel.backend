require('dotenv').config(); // Ensure environment variables are loaded

const twilio = require('twilio');

// Logging credentials (Remove in production)
console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "Exists" : "Missing");
console.log("TWILIO_WHATSAPP_NUMBER:", process.env.TWILIO_WHATSAPP_NUMBER);

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async (to, message) => {
  try {
    if (!to.startsWith("whatsapp:")) {
      to = `whatsapp:${to}`; // Ensure format is correct
    }

    const response = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: to,
      body: message,
    });

    console.log("✅ WhatsApp Message Sent:", response.sid);
    return { success: true, message: "WhatsApp message sent successfully!" };
  } catch (error) {
    console.error("❌ Twilio WhatsApp Error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendWhatsApp;
