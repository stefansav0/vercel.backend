const Job = require("../models/Job");
const { sendToAllUsers } = require("../utils/sendEmail");
const slugify = require("slugify");

// 📌 Create a New Job Listing
exports.createJob = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const slug = slugify(title, { lower: true, strict: true });
    const jobData = { ...req.body, slug };

    const job = new Job(jobData);
    await job.save();

    // ✅ Notify all verified users
       await sendToAllUsers({
  subject: ` New Job Posted!`, // Subject only, not repeated inside the body
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 16px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08);">

      <div style="background-color: #0057ff; padding: 16px; border-radius: 8px; color: white; text-align: center; margin-top: 10px;">
        <strong style="font-size: 18px;">📰 Finderight Jobs Notification</strong>
      </div>

      <p style="font-size: 16px; color: #333; margin-top: 20px;">
        Hi {{name}},
      </p>

      <p style="font-size: 15px; color: #444;">
        A new job has just been posted on <strong>Finderight</strong> that may match your interest:
      </p>

      <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin-top: 10px;">
        <p style="margin: 8px 0;"><strong>📌 Title:</strong> ${job.title}</p>
        <p style="margin: 8px 0;"><strong>🏢 Department:</strong> ${job.department}</p>
        <p style="margin: 8px 0;"><strong>⏰ Last Date:</strong> ${new Date(job.lastDate).toISOString().split("T")[0]}</p>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="${process.env.FRONTEND_URL}/jobs/${job.department.toLowerCase()}/${job.slug}" style="display: inline-block; padding: 12px 24px; background-color: #0057ff; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">
          👉 View Full Job Details
        </a>
      </div>

      <p style="font-size: 13px; color: #888; text-align: center; margin-top: 30px;">
        Best regards,<br />
        <strong>Finderight Team</strong>
      </p>
    </div>
  `
});



    res.status(201).json({ success: true, message: "✅ Job created successfully", job });
  } catch (error) {
    console.error("❌ Job creation error:", error);
    res.status(422).json({ success: false, message: "Failed to create job", error: error.message });
  }
};

// Other controller functions (getJobs, getJobBySlug, updateJob, deleteJob) remain unchanged

// 📌 Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ jobs, total: jobs.length });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
};

// 📌 Get Latest 6 Jobs
exports.getLatestJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("❌ Error fetching latest jobs:", error);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
};

// 📌 Get Job by Slug
exports.getJobBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const job = await Job.findOne({ slug });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    console.error("❌ Error fetching job by slug:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Update Job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (updatedData.title) {
      updatedData.slug = slugify(updatedData.title, { lower: true, strict: true });
    }

    const job = await Job.findByIdAndUpdate(id, updatedData, { new: true });
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "✅ Job updated successfully", job });
  } catch (error) {
    console.error("❌ Error updating job:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "🗑️ Job deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting job:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
