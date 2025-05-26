require("dotenv").config();
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const User = require("../models/User"); // Assuming you have a User model

// Twilio Configuration
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send Email Alert
const sendEmail = async (userEmail, job) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `New Sarkari Job Alert: ${job.title}`,
            text: `A new job has been posted: ${job.title}\nApply here: ${job.link}`,
        });
        console.log(`📩 Email sent to ${userEmail}`);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

// Send SMS Alert
const sendSMS = async (userPhone, job) => {
    try {
        await twilioClient.messages.create({
            body: `New Sarkari Job: ${job.title}\nApply: ${job.link}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: userPhone,
        });
        console.log(`📲 SMS sent to ${userPhone}`);
    } catch (error) {
        console.error("❌ Error sending SMS:", error);
    }
};

// Send WhatsApp Alert
const sendWhatsApp = async (userPhone, job) => {
    try {
        await twilioClient.messages.create({
            body: `📢 New Sarkari Job Alert!\n${job.title}\nApply: ${job.link}`,
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            to: `whatsapp:${userPhone}`,
        });
        console.log(`✅ WhatsApp message sent to ${userPhone}`);
    } catch (error) {
        console.error("❌ Error sending WhatsApp message:", error);
    }
};

// Send Job Alerts to All Users
const sendJobAlerts = async (job) => {
    try {
        const users = await User.find({}); // Fetch all users
        users.forEach((user) => {
            if (user.emailAlerts) sendEmail(user.email, job);
            if (user.smsAlerts) sendSMS(user.phone, job);
            if (user.whatsappAlerts) sendWhatsApp(user.phone, job);
        });
    } catch (error) {
        console.error("❌ Error sending job alerts:", error);
    }
};

module.exports = sendJobAlerts;
