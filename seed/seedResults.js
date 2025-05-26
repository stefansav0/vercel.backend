require('dotenv').config(); // Load .env
const mongoose = require('mongoose');
const Result = require('../src/models/Result');


const results = [
  "NIACL Assistant Mains Result 2025",
  "Allahabad High Court Group C, D Final Result 2025",
  "BPSC Assistant Engineer AE 2024 Result",
  "BHU SET CHS E Lottery Result 2025",
  "Bihar Civil Court Clerk 2022 Result",
  "UPSC NDA II 2024 Final Result",
  "State Bank of India SBI PO Phase I Pre Result 2025",
  "Army Ordinance Corps AOC Various Post Result 2025",
  "Bihar Board Class 10th Matric Result 2025, Scrutiny Online Form",
  "RSSB Animal Attendant Result 2025",
  "Bihar Board BSEB Class 12th Inter Result 2025, Scrutiny Online Form",
  "IBPS Clerk 14th Main Result 2025",
  "IBPS PO 14th Final Result 2025",
  "IBPS SO 14th Final Result 2025",
  "Coast Guard Navik / Yantrik CGEPT 01/2025 Stage II Result 2025",
  "UPSC Geo Scientist Pre Result 2025",
  "SBI Clerk Pre Result 2025",
  "SSC MTS 2024 Marks",
  "MPESB PNST 2022 Result",
  "Patna High Court Translator Result 2025",
  "UP Police Assistant Operator 2022 Final Result",
  "UP Police Workshop Staff 2022 Final Result",
  "KVS Class 1 Admissions E Lottery Result 2025",
  "RPSC RAS 2023 Mains Exam Marks",
  "NVS Class 9th Result 2025",
  "UPSC CDS II 2024 Final Result",
  "NVS Class 6th Summer Bound Result 2025",
  "NCL CIL Apprentices Merit List 2025",
  "AIBE 19th Exam Result 2025",
  "India Post GDS 2025 First Merit List"
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  const formatted = results.map(title => ({
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    resultLink: '#',
    publishDate: new Date()
  }));

  await Result.insertMany(formatted);
  console.log('✅ Results seeded successfully');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
});
