import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuingAuthority: { type: String, trim: true },
    certificateNumber: { type: String, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    documentUrl: { type: String, trim: true },
    issueDate: { type: Date },
    expiryDate: { type: Date },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

certificationSchema.index({ status: 1, isFeatured: -1, createdAt: -1 });

const Certification = mongoose.model("Certification", certificationSchema);

export default Certification;
