import Admin from "../models/Admin.js";
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
    const existing = await Admin.findOne({ email });
    if (existing) {
      logger.info("Admin user already exists", { email });
      return;
    }

    const admin = new Admin({ name: ADMIN_NAME || "Admin", email, password: ADMIN_PASSWORD });
    await admin.save();

    logger.info("Admin user created by seeder", { email });
  } catch (error) {
    logger.error("Failed to ensure admin user", { message: error.message });
    throw error;
  }
}

export default ensureAdminExists;
