const express = require("express");
const { sendEmail, sendToAllUsers } = require("../utils/sendEmail"); // ✅ Make sure sendToAllUsers is imported

const router = express.Router();

// ✅ Send test email to a specific address
router.post("/send-test-email", async (req, res) => {
  const { email, subject, message, html } = req.body;

  try {
    await sendEmail(email, subject, message, html);
    res.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to send email" });
  }
});

// ✅ Broadcast manual job email to all verified users
router.post("/manual-job-email", async (req, res) => {
  const { title, department, location, deadline, slug } = req.body;

  try {
    await sendToAllUsers({
      subject: `🆕 New Job Posted - ${title}`,
      html: `
        <p>Hi {{name}},</p>
        <p>A new job has been added:</p>
        <ul>
          <li><strong>Title:</strong> ${title}</li>
          <li><strong>Department:</strong> ${department}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>Deadline:</strong> ${deadline}</li>
        </ul>
        <p><a href="https://your-frontend.com/jobs/${slug}">👉 View Job</a></p>
        <br />
        <p>Best regards,<br />Sarkari Portal</p>
      `,
    });

    res.json({ message: "✅ Manual job email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Failed to send email", error: error.message });
  }
});

module.exports = router;
