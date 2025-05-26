const mongoose = require('mongoose');
const AdmitCard = require('../src/models/AdmitCard');
const connectDB = require('../src/config/db');

// Connect to MongoDB
connectDB();

const admitCards = [
  {
    title: "Jharkhand High Court District Judge Admit Card 2025",
    slug: "jharkhand-high-court-district-judge-2025",
    admitCardLink: "#"
  },
  {
    title: "SSC Stenographer 2024 Skill Test Admit Card",
    slug: "ssc-stenographer-2024-skill-test",
    admitCardLink: "#"
  },
  {
    title: "Patna High Court Translator CPT Exam Admit Card 2025",
    slug: "patna-high-court-translator-cpt-2025",
    admitCardLink: "#"
  },
  {
    title: "Coast Guard Navik GD DB CGEPT 02/2025 Exam City Details",
    slug: "coast-guard-navik-gd-db-cgept-022025",
    admitCardLink: "#"
  },
  {
    title: "MPESB Middle / Primary School Teacher Admit Card 2025",
    slug: "mpesb-teacher-admit-card-2025",
    admitCardLink: "#"
  },
  {
    title: "CBSE Superintendent, Junior Assistant Exam City Details 2025",
    slug: "cbse-superintendent-junior-assistant-2025",
    admitCardLink: "#"
  },
  {
    title: "Bihar BTSC Insect Collector Admit Card 2025",
    slug: "bihar-btsc-insect-collector-2025",
    admitCardLink: "#"
  },
  {
    title: "Railway RRB Junior Engineer JE Stage II Exam City Details",
    slug: "rrb-je-stage-ii-exam-city",
    admitCardLink: "#"
  },
  {
    title: "RPSC RAS 2023 Interview Letter",
    slug: "rpsc-ras-2023-interview-letter",
    admitCardLink: "#"
  },
  {
    title: "UPSSSC Assistant Store Keeper Grade III 2024 Admit Card",
    slug: "upsssc-assistant-store-keeper-2024",
    admitCardLink: "#"
  },
  {
    title: "UPSSSC Mandi Parishad Sachiv Grade II Admit Card 2025",
    slug: "upsssc-mandi-parishad-sachiv-2025",
    admitCardLink: "#"
  },
  {
    title: "SCI Junior Court Assistant Admit Card 2025",
    slug: "sci-junior-court-assistant-2025",
    admitCardLink: "#"
  },
  {
    title: "UPPSC Assistant Engineer AE Pre Admit Card 2025",
    slug: "uppsc-ae-pre-admit-card-2025",
    admitCardLink: "#"
  },
  {
    title: "BPSC 70th Mains Admit Card 2025",
    slug: "bpsc-70th-mains-2025",
    admitCardLink: "#"
  },
  {
    title: "RPSC Agriculture Officer 2024 Exam City",
    slug: "rpsc-agriculture-officer-2024",
    admitCardLink: "#"
  },
  {
    title: "Assam Rifles Rally Recruitment Admit Card 2025",
    slug: "assam-rifles-rally-2025",
    admitCardLink: "#"
  },
  {
    title: "Rajasthan RSSB Jail Prahari Admit Card 2025",
    slug: "rajasthan-jail-prahari-2025",
    admitCardLink: "#"
  },
  {
    title: "UPHESC Assistant Professor 2022 Admit Card",
    slug: "uphesc-assistant-professor-2022",
    admitCardLink: "#"
  },
  {
    title: "Railway RRB ALP Stage II Exam Notice 2025",
    slug: "rrb-alp-stage-ii-2025",
    admitCardLink: "#"
  },
  {
    title: "AIIMS NORCET 8th Exam City 2025",
    slug: "aiims-norcet-8th-2025",
    admitCardLink: "#"
  },
  {
    title: "UPSC CAPF AC 2024 Interview Schedule",
    slug: "upsc-capf-ac-2024-interview",
    admitCardLink: "#"
  },
  {
    title: "UPPSC Staff Nurse 2023 Document Verification Letter",
    slug: "uppsc-staff-nurse-2023-verification",
    admitCardLink: "#"
  },
  {
    title: "AIC Management Trainee Admit Card 2025",
    slug: "aic-management-trainee-2025",
    admitCardLink: "#"
  },
  {
    title: "UPSSSC UP Gram Panchayat Adhikari 2023 Mains Exam Fee Payment",
    slug: "upsssc-gram-panchayat-adhikari-2023",
    admitCardLink: "#"
  },
  {
    title: "UPSC NDA I 2025 Admit Card",
    slug: "upsc-nda-1-2025",
    admitCardLink: "#"
  },
  {
    title: "UPSC CDS I 2025 Admit Card",
    slug: "upsc-cds-1-2025",
    admitCardLink: "#"
  },
  {
    title: "CSIR IITR Lucknow JSA Admit Card 2025",
    slug: "csir-iitr-jsa-2025",
    admitCardLink: "#"
  }
];

const seedAdmitCards = async () => {
  try {
    await AdmitCard.deleteMany();
    await AdmitCard.insertMany(admitCards);
    console.log("✅ Admit cards seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admit cards:", error);
    process.exit(1);
  }
};

seedAdmitCards();
