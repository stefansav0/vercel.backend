const twilio = require("twilio");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
      to, // User's phone number
    });
    console.log(`📩 SMS sent to ${to}: ${response.sid}`);
    return response.sid;
  } catch (error) {
    console.error("❌ SMS sending failed:", error);
  }
};

module.exports = sendSMS;
