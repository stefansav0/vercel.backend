const { sendEmail, sendSMS, sendWhatsApp } = require("../utils/notificationService");

// 📌 Send Job Alert
exports.sendJobAlert = async (req, res) => {
    try {
        const { email, phone, whatsapp, jobTitle, company, location, applyLink } = req.body;
        const message = `New Job Alert: ${jobTitle} at ${company}, Location: ${location}. Apply here: ${applyLink}`;

        // Send Email
        if (email) await sendEmail(email, "New Job Alert", message);

        // Send SMS
        if (phone) await sendSMS(phone, message);

        // Send WhatsApp Message
        if (whatsapp) await sendWhatsApp(whatsapp, message);

        res.status(200).json({ message: "Job alert sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending job alert" });
    }
};
