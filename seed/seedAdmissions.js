const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../src/config/db");
const Admission = require("../src/models/Admission");

dotenv.config();
connectDB();

const admissions = [
  {
    title: "UPCATET 2025 Online Form",
    slug: "upcatet-2025-online-form",
    admissionLink: "https://example.com/upcatet-2025-online-form",
  },
  {
    title: "Bihar CET BEd 2 Year Online Form 2025",
    slug: "bihar-cet-bed-2-year-online-form-2025",
    admissionLink: "https://example.com/bihar-cet-bed-2-year-online-form-2025",
  },
  {
    title: "Bihar Board Class 10th Matric Scrutiny Online Form 2025",
    slug: "bihar-board-class-10th-matric-scrutiny-online-form-2025",
    admissionLink: "https://example.com/bihar-board-class-10th-matric-scrutiny-online-form-2025",
  },
  {
    title: "NTA Navayug School NSSNET 2025 Online Form",
    slug: "nta-navayug-school-nssnet-2025-online-form",
    admissionLink: "https://example.com/nta-navayug-school-nssnet-2025-online-form",
  },
  {
    title: "GPAT 2025 Online Form",
    slug: "gpat-2025-online-form",
    admissionLink: "https://example.com/gpat-2025-online-form",
  },
  {
    title: "Test prep courses for college admissions",
    slug: "test-prep-courses-college-admissions",
    admissionLink: "https://example.com/test-prep-courses-college-admissions",
  },
  {
    title: "Bihar Board BSEB Class 12th Inter Scrutiny Online Form 2025",
    slug: "bihar-board-bseb-class-12th-inter-scrutiny-online-form-2025",
    admissionLink: "https://example.com/bseb-class-12th-inter-scrutiny-online-form-2025",
  },
  {
    title: "Central Sanskrit University CSU Prak Shastri Online Form 2025",
    slug: "csu-prak-shastri-online-form-2025",
    admissionLink: "https://example.com/csu-prak-shastri-online-form-2025",
  },
  {
    title: "UP Common Nursing Admission CNET Online Form 2025",
    slug: "up-cnet-nursing-admission-online-form-2025",
    admissionLink: "https://example.com/up-cnet-nursing-admission-online-form-2025",
  },
  {
    title: "NTA SWAYAM 2025 Online Form",
    slug: "nta-swayam-2025-online-form",
    admissionLink: "https://example.com/nta-swayam-2025-online-form",
  },
  {
    title: "UPBED 2025 Online Form",
    slug: "upbed-2025-online-form",
    admissionLink: "https://example.com/upbed-2025-online-form",
  },
  {
    title: "NTA CUET UG 2025 Correction / Edit Form",
    slug: "nta-cuet-ug-2025-correction-edit-form",
    admissionLink: "https://example.com/nta-cuet-ug-2025-correction-edit-form",
  },
  {
    title: "MUIT Admissions Online Form 2025",
    slug: "muit-admissions-online-form-2025",
    admissionLink: "https://example.com/muit-admissions-online-form-2025",
  },
  {
    title: "NTA JIPMAT 2025 Correction / Edit Form",
    slug: "nta-jipmat-2025-correction-edit-form",
    admissionLink: "https://example.com/nta-jipmat-2025-correction-edit-form",
  },
  {
    title: "Bihar ITICAT 2025 Online Form",
    slug: "bihar-iticat-2025-online-form",
    admissionLink: "https://example.com/bihar-iticat-2025-online-form",
  },
  {
    title: "KVS Class 1 Admissions Online Form 2025",
    slug: "kvs-class-1-admissions-online-form-2025",
    admissionLink: "https://example.com/kvs-class-1-admissions-online-form-2025",
  },
  {
    title: "Rajasthan BEd PTET Online Form 2025",
    slug: "rajasthan-bed-ptet-online-form-2025",
    admissionLink: "https://example.com/rajasthan-bed-ptet-online-form-2025",
  },
  {
    title: "NTA CUET UG 2025 Online Form",
    slug: "nta-cuet-ug-2025-online-form",
    admissionLink: "https://example.com/nta-cuet-ug-2025-online-form",
  },
  {
    title: "CIPET 2025 Online Form",
    slug: "cipet-2025-online-form",
    admissionLink: "https://example.com/cipet-2025-online-form",
  },
  {
    title: "NTA JEEMAIN Session II Correction / Edit Form 2025",
    slug: "nta-jeemain-session-ii-correction-edit-form-2025",
    admissionLink: "https://example.com/nta-jeemain-session-ii-correction-edit-form-2025",
  },
  {
    title: "SWD UP IAS / PCS Free Coaching Online Form 2025",
    slug: "swd-up-ias-pcs-free-coaching-online-form-2025",
    admissionLink: "https://example.com/swd-up-ias-pcs-free-coaching-online-form-2025",
  },
  {
    title: "NTA NCET 2025 Online Form",
    slug: "nta-ncet-2025-online-form",
    admissionLink: "https://example.com/nta-ncet-2025-online-form",
  },
  {
    title: "IERT Admissions Online Form 2025",
    slug: "iert-admissions-online-form-2025",
    admissionLink: "https://example.com/iert-admissions-online-form-2025",
  },
  {
    title: "BHU School Admissions CHS / SET Online Form 2025",
    slug: "bhu-school-admissions-chs-set-online-form-2025",
    admissionLink: "https://example.com/bhu-school-admissions-chs-set-online-form-2025",
  },
  {
    title: "NTA JIPMAT 2025 Online Form",
    slug: "nta-jipmat-2025-online-form",
    admissionLink: "https://example.com/nta-jipmat-2025-online-form",
  },
  {
    title: "NTA CUET PG 2025 Correction / Edit Form",
    slug: "nta-cuet-pg-2025-correction-edit-form",
    admissionLink: "https://example.com/nta-cuet-pg-2025-correction-edit-form",
  },
  {
    title: "UP Scholarship Application Status 2025",
    slug: "up-scholarship-application-status-2025",
    admissionLink: "https://example.com/up-scholarship-application-status-2025",
  },
  {
    title: "UPBED 2025 Online Form",
    slug: "upbed-2025-online-form-2",
    admissionLink: "https://example.com/upbed-2025-online-form-2",
  },
  {
    title: "NTA NEET UG 2025 Online Form",
    slug: "nta-neet-ug-2025-online-form",
    admissionLink: "https://example.com/nta-neet-ug-2025-online-form",
  },
  {
    title: "NTA JEEMAIN Session II Online Form 2025",
    slug: "nta-jeemain-session-ii-online-form-2025",
    admissionLink: "https://example.com/nta-jeemain-session-ii-online-form-2025",
  },
  {
    title: "UP Polytechnic JEECUP 2025 Online Form",
    slug: "up-polytechnic-jeecup-2025-online-form",
    admissionLink: "https://example.com/up-polytechnic-jeecup-2025-online-form",
  },
  {
    title: "Bihar DELED 2025 Online Form",
    slug: "bihar-deled-2025-online-form",
    admissionLink: "https://example.com/bihar-deled-2025-online-form",
  },
  {
    title: "NTA CUET PG 2025 Online Form",
    slug: "nta-cuet-pg-2025-online-form",
    admissionLink: "https://example.com/nta-cuet-pg-2025-online-form",
  },
  {
    title: "NTA All India Sainik School AISSEE 2025 Online Form",
    slug: "aissee-2025-online-form",
    admissionLink: "https://example.com/aissee-2025-online-form",
  },
  {
    title: "UPDELED 2024 Online Counseling",
    slug: "updeled-2024-online-counseling",
    admissionLink: "https://example.com/updeled-2024-online-counseling",
  },
  {
    title: "NTA NCHMJEE 2025 Online Form",
    slug: "nta-nchmjee-2025-online-form",
    admissionLink: "https://example.com/nta-nchmjee-2025-online-form",
  },
  {
    title: "UP CT Nursery, NTT, DPEd Admission Online Form 2024",
    slug: "up-ct-nursery-ntt-dped-admission-online-form-2024",
    admissionLink: "https://example.com/up-ct-nursery-ntt-dped-admission-online-form-2024",
  },
  {
    title: "NTA JEEMAIN Session I Correction / Edit Form 2025",
    slug: "nta-jeemain-session-i-correction-edit-form-2025",
    admissionLink: "https://example.com/nta-jeemain-session-i-correction-edit-form-2025",
  },
  {
    title: "NTA NIFT Admissions Online Form 2025",
    slug: "nta-nift-admissions-online-form-2025",
    admissionLink: "https://example.com/nta-nift-admissions-online-form-2025",
  },
];

const importData = async () => {
  try {
    await Admission.deleteMany();
    await Admission.insertMany(admissions);
    console.log("✅ Admissions Seeded!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

importData();
