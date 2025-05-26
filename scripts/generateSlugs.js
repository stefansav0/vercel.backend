const mongoose = require("mongoose");
const dotenv = require("dotenv");
const slugify = require("slugify");
const Job = require("../src/models/Job");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to DB");

    const jobs = await Job.find({ slug: { $exists: false } });

    console.log(`🔁 Updating ${jobs.length} jobs without slugs...`);

    for (const job of jobs) {
      if (!job.title || !job.department) {
        console.log(`⚠️ Skipped: ${job._id} (missing title or department)`);
        continue;
      }

      const unique = Date.now().toString().slice(-5);
      const dept = job.department.toLowerCase().replace(/\s+/g, "-");
      const titleSlug = slugify(job.title, { lower: true, strict: true });

      const finalSlug = `${dept}/${titleSlug}-${unique}`;

      await Job.updateOne({ _id: job._id }, { slug: finalSlug });
      console.log(`✅ Updated slug for: ${job.title}`);
    }

    mongoose.disconnect();
    console.log("🎉 Done.");
  })
  .catch((err) => {
    console.error("❌ Error:", err);
  });
