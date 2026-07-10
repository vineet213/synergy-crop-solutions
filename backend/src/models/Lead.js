import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    alternatePhone: { type: String, trim: true },
    company: { type: String, trim: true },
    state: { type: String, trim: true },
    district: { type: String, trim: true },
    village: { type: String, trim: true },
    crop: { type: String, trim: true },
    product: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, trim: true, default: "website" },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "closed"],
      default: "new",
    },
    notes: { type: String, trim: true },
    assignedDistributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributor",
      default: null,
    },
    assignedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ state: 1 });
leadSchema.index({ product: 1 });
leadSchema.index({ assignedDistributor: 1 });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
