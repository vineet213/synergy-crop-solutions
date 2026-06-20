import { connectDB, disconnectDB } from "../../config/db.js";
import Certification from "../../models/Certification.js";

const certifications = [
  {
    title: "Sample Data — ISO 9001:2015",
    issuingAuthority: "Bureau of Indian Standards",
    certificateNumber: "ISO-2024-IND-001",
    description: "Sample Data: Quality management systems certification for manufacturing and distribution processes.",
    isFeatured: true,
    status: "active",
  },
  {
    title: "Sample Data — Organic Certification",
    issuingAuthority: "APEDA (Agricultural and Processed Food Products Export Development Authority)",
    certificateNumber: "ORG-2024-AP-042",
    description: "Sample Data: Certified organic production and processing for select crop protection product lines.",
    isFeatured: true,
    status: "active",
  },
  {
    title: "Sample Data — Good Manufacturing Practices",
    issuingAuthority: "Food Safety and Standards Authority of India",
    certificateNumber: "GMP-FSSAI-2024-117",
    description: "Sample Data: GMP certification confirming adherence to good manufacturing practices in formulation facilities.",
    isFeatured: false,
    status: "active",
  },
];

async function seedCertifications() {
  try {
    await connectDB();
    let count = 0;
    for (const cert of certifications) {
      await Certification.findOneAndUpdate(
        { certificateNumber: cert.certificateNumber },
        { $set: cert },
        { upsert: true, new: true }
      );
      count++;
    }
    console.log(`Certifications seeded successfully: ${count} inserted/updated`);
    process.exit(0);
  } catch (error) {
    console.error("Certification seeding failed:", error);
    process.exit(1);
  }
}

seedCertifications();
