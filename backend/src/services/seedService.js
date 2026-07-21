import Admin from "../models/Admin.js";
import WebsiteSettings from "../models/WebsiteSettings.js";
import Testimonial from "../models/Testimonial.js";
import logger from "../utils/logger.js";
import env from "../config/env.js";

async function ensureAdminExists() {
  const { ADMIN_EMAIL, ADMIN_NAME, ADMIN_PASSWORD } = env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    logger.info("Admin seeding skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set");
    return;
  }

  const email = ADMIN_EMAIL.toLowerCase().trim();

  try {
    const existing = await Admin.findOne({ email }).select("+password");
    if (existing) {
      if (existing.role !== "superadmin") {
        existing.role = "superadmin";
        await existing.save();
        logger.info("Existing admin promoted to superadmin", { email });
      } else {
        logger.info("Admin user already exists", { email });
      }
      return;
    }

    const admin = new Admin({ name: ADMIN_NAME || "Admin", email, password: ADMIN_PASSWORD, role: "superadmin" });
    await admin.save();

    logger.info("Admin user created by seeder", { email });
  } catch (error) {
    logger.error("Failed to ensure admin user", { message: error.message });
    throw error;
  }
}

async function ensureWebsiteSettingsExist() {
  try {
    const existing = await WebsiteSettings.findOne();
    if (existing) {
      logger.info("Website settings already exist");
      return;
    }

    await WebsiteSettings.create({
      company: {
        name: "Synergy Crop Solutions",
        tagline: "Residue-Free Agriculture",
        address: "Pune, Maharashtra, India",
        city: "Pune",
        state: "Maharashtra",
        pinCode: "",
      },
      contact: {
        phoneNumbers: [],
        whatsappNumber: "",
        email: "contact@synergycrops.com",
        officeHours: "Mon – Sat, 9:00 AM – 6:00 PM",
      },
      website: {
        footerText: "Modern agricultural solutions for sustainable growth.",
        copyrightText: "All rights reserved.",
      },
    });

    logger.info("Default website settings created");
  } catch (error) {
    logger.error("Failed to ensure website settings", { message: error.message });
  }
}

export { ensureWebsiteSettingsExist };

async function ensureTestimonialsExist() {
  try {
    const count = await Testimonial.countDocuments();
    if (count > 0) {
      logger.info(`Testimonials already exist (${count} documents)`);
      return;
    }

    const defaults = [
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
        displayOrder: 7,
      },
    ];

    await Testimonial.insertMany(defaults);
    logger.info(`Default testimonials seeded: ${defaults.length} documents created`);
  } catch (error) {
    logger.error("Failed to ensure testimonials exist", { message: error.message });
  }
}

async function seedAll() {
  await ensureAdminExists();
  await ensureWebsiteSettingsExist();
  await ensureTestimonialsExist();
}

export default seedAll;
