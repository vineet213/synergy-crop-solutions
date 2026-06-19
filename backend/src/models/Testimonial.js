import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    testimonial: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    crop: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

testimonialSchema.index({ status: 1, isFeatured: -1, createdAt: -1 });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
