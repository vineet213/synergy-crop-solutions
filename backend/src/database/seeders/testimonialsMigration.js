import { connectDB, disconnectDB } from "../../config/db.js";
import Testimonial from "../../models/Testimonial.js";
import logger from "../../utils/logger.js";

const testimonials = [
  {
    customerName: "Farmer Testimonial",
    location: "",
    testimonial: "This is a customer testimonial.",
    rating: 5,
    crop: "",
    isFeatured: true,
    status: "active",
    videoType: "mp4",
    video: "client-assets/testimonials/Videos/testimonial-1.mp4",
    image: "client-assets/testimonials/Images/testimonial-1.jpeg",
    thumbnail: null,
    displayOrder: 1,
  },
  {
    customerName: "Farmer Testimonial",
    location: "",
    testimonial: "This is a customer testimonial.",
    rating: 5,
    crop: "",
    isFeatured: true,
    status: "active",
    videoType: "mp4",
    video: "client-assets/testimonials/Videos/testimonial-2.mp4",
    image: "client-assets/testimonials/Images/testimonial-2.jpeg",
    thumbnail: null,
    displayOrder: 2,
  },
  {
    customerName: "Farmer Testimonial",
    location: "",
    testimonial: "This is a customer testimonial.",
    rating: 5,
    crop: "",
    isFeatured: true,
    status: "active",
    videoType: "mp4",
    video: "client-assets/testimonials/Videos/testimonial-3.mp4",
    image: "client-assets/testimonials/Images/testimonial-3.jpeg",
    thumbnail: null,
    displayOrder: 3,
  },
  {
    customerName: "Farmer Testimonial",
    location: "",
    testimonial: "This is a customer testimonial.",
    rating: 4,
    crop: "",
    isFeatured: false,
    status: "active",
    videoType: "mp4",
    video: "client-assets/testimonials/Videos/testimonial-4.mp4",
    image: "client-assets/testimonials/Images/testimonial-4.jpeg",
    thumbnail: null,
    displayOrder: 4,
  },
  {
    customerName: "Farmer Testimonial",
    location: "",
    testimonial: "This is a customer testimonial.",
    rating: 4,
    crop: "",
    isFeatured: false,
    status: "active",
    videoType: "mp4",
    video: "client-assets/testimonials/Videos/testimonial-5.mp4",
    image: "client-assets/testimonials/Images/testimonial-5.jpeg",
    thumbnail: null,
    displayOrder: 5,
  },
  {
    customerName: "Farmer Testimonial",
    location: "",
    testimonial: "This is a customer testimonial.",
    rating: 4,
    crop: "",
    isFeatured: false,
    status: "active",
    videoType: "mp4",
    video: "client-assets/testimonials/Videos/testimonial-6.mp4",
    image: null,
    thumbnail: null,
    displayOrder: 6,
  },
  {
    customerName: "Farmer Testimonial",
    location: "",
    testimonial: "This is a customer testimonial.",
    rating: 4,
    crop: "",
    isFeatured: false,
    status: "active",
    videoType: "mp4",
    video: "client-assets/testimonials/Videos/testimonial-7.mp4",
    image: null,
    thumbnail: null,
    displayOrder: 7,
  },
];

async function seedTestimonials() {
  try {
    await connectDB();

    const existingCount = await Testimonial.countDocuments();
    if (existingCount > 0) {
      logger.info(`Database already has ${existingCount} testimonials. Clearing before re-seeding...`);
      await Testimonial.deleteMany({});
    }

    const result = await Testimonial.insertMany(testimonials);
    logger.info(`Testimonials seeded successfully: ${result.length} documents inserted`);

    const finalCount = await Testimonial.countDocuments();
    logger.info(`MongoDB collection 'testimonials' now has ${finalCount} documents`);

    process.exit(0);
  } catch (error) {
    console.error("Testimonial seeding failed:", error.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

seedTestimonials();
