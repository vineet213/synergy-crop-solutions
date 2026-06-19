import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    description: { type: String, trim: true },
    symptoms: { type: String, trim: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

diseaseSchema.index({ status: 1, createdAt: -1 });

const Disease = mongoose.model("Disease", diseaseSchema);

export default Disease;
