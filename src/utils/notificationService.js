const nodemailer = require("nodemailer");
const twilio = require("twilio");
require("dotenv").config();

// Nodemailer Setup (Email)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Twilio Setup (SMS & WhatsApp)
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 📌 Send Email Notification
exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
        });
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error("Email Error:", error);
    }
};

// 📌 Send SMS Notification
exports.sendSMS = async (to, message) => {
    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        console.log(`📱 SMS sent to ${to}`);
    } catch (error) {
        console.error("SMS Error:", error);
    }
};

// 📌 Send WhatsApp Notification
exports.sendWhatsApp = async (to, message) => {
    try {
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            to,
        });
        console.log(`💬 WhatsApp message sent to ${to}`);
    } catch (error) {
        console.error("WhatsApp Error:", error);
    }
};
