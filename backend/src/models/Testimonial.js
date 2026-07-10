import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    designation: { type: String, trim: true },
    company: { type: String, trim: true },
    location: { type: String, trim: true },
    testimonial: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    crop: { type: String, trim: true },
    image: { type: String, trim: true },
    video: { type: String, trim: true },
    videoType: { type: String, enum: ["youtube", "mp4", null], default: null },
    thumbnail: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

testimonialSchema.index({ status: 1, isFeatured: -1, displayOrder: 1, createdAt: -1 });
testimonialSchema.index({ isFeatured: 1, displayOrder: 1 });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
