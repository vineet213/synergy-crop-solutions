import { connectDB, disconnectDB } from "../../config/db.js";
import env from "../../config/env.js";
import Admin from "../../models/Admin.js";
import logger from "../../utils/logger.js";

async function seedAdmin() {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({
      email: env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      logger.info("Admin already exists");
      process.exit(0);
    }

    await Admin.create({
      name: env.ADMIN_NAME,
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
    });

    logger.info("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

seedAdmin();