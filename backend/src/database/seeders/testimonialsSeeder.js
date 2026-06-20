import { connectDB, disconnectDB } from "../../config/db.js";
import Testimonial from "../../models/Testimonial.js";

const testimonials = [
  {
    customerName: "Sample Data — Rajesh Kumar",
    location: "Punjab, India",
    testimonial: "Sample Data: Synergy's crop protection products have significantly improved our yield this season. The residue-free solutions give us peace of mind.",
    rating: 5,
    crop: "Wheat",
    isFeatured: true,
    status: "active",
  },
  {
    customerName: "Sample Data — Priya Sharma",
    location: "Maharashtra, India",
    testimonial: "Sample Data: Since partnering with Synergy Crop Solutions, our distribution network has grown by 40%. Their support and product quality are unmatched.",
    rating: 5,
    crop: "Grapes",
    isFeatured: true,
    status: "active",
  },
  {
    customerName: "Sample Data — Amit Singh",
    location: "Uttar Pradesh, India",
    testimonial: "Sample Data: The disease management solutions from Synergy helped us save an entire rice crop from blast infection. Highly recommend their team.",
    rating: 4,
    crop: "Rice",
    isFeatured: false,
    status: "active",
  },
];

async function seedTestimonials() {
  try {
    await connectDB();
    let count = 0;
    for (const testimonial of testimonials) {
      await Testimonial.findOneAndUpdate(
        { customerName: testimonial.customerName },
        { $set: testimonial },
        { upsert: true, new: true }
      );
      count++;
    }
    console.log(`Testimonials seeded successfully: ${count} inserted/updated`);
    process.exit(0);
  } catch (error) {
    console.error("Testimonial seeding failed:", error);
    process.exit(1);
  }
}

seedTestimonials();
