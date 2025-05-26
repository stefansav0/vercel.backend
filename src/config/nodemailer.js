const nodemailer = require("nodemailer");

// Setup transporter using Gmail + App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,      // e.g., info.finderight@gmail.com
    pass: process.env.EMAIL_PASS,      // App Password
  },
});

// Optional: HTML wrapper for branded emails
const wrapHtml = (title, content) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #0057ff;">${title}</h2>
    <div style="margin-top: 10px; font-size: 14px; color: #333;">${content}</div>
    <hr style="margin: 30px 0;" />
    <p style="font-size: 12px; color: #888;">
      You're receiving this email from <strong>Finderight</strong>. If this wasn't intended for you, please ignore.
    </p>
  </div>
`;

// Main function to send email
const sendEmail = async ({ to, subject, text = "", html = "" }) => {
  const mailOptions = {
    from: `"Finderight" <${process.env.EMAIL_USER}>`, // ✅ Display name + email
    to,
    subject,
    text,
    html: html ? wrapHtml(subject, html) : undefined,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
  }
};

module.exports = sendEmail;
