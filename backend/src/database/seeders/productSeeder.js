import { connectDB, disconnectDB } from "../../config/db.js";
import Product from "../../models/Product.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import logger from "../../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const products = JSON.parse(
	readFileSync(join(__dirname, "../../../../products-seed.json"), "utf-8")
);

async function seedProducts() {
	try {
		await connectDB();

		let count = 0;

		for (const product of products) {
			await Product.findOneAndUpdate(
				{ slug: product.slug },
				{ $set: product },
				{ upsert: true, new: true }
			);
			count++;
		}

		logger.info(`Products seeded successfully: ${count} inserted/updated`);
		process.exit(0);
	} catch (error) {
		console.error("Seeder failed:", error.message);
		process.exit(1);
	} finally {
		await disconnectDB();
	}
}

seedProducts();
