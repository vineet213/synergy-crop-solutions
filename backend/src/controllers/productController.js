import Product from "../models/Product.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listPublicProducts(req, res, next) {
	try {
		const { search, category } = req.query;
		const filter = { status: "published" };
		if (category) filter.category = category;
		if (search) filter.$or = [
			{ name: { $regex: search, $options: "i" } },
			{ description: { $regex: search, $options: "i" } },
		];

		const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
		res.json({ success: true, data: products });
	} catch (error) {
		next(error);
	}
}

export async function getPublicProduct(req, res, next) {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).lean();
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

export async function adminListProducts(req, res, next) {
	try {
		const products = await Product.find({}).sort({ createdAt: -1 });
		res.json({ success: true, data: products });
	} catch (error) {
		next(error);
	}
}

export async function adminGetProduct(req, res, next) {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

export async function adminCreateProduct(req, res, next) {
	try {
		const payload = req.body;
		// Basic slug generation if not provided
		if (!payload.slug && payload.name) {
			payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
		}
		const product = await Product.create(payload);
		res.status(201).json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

export async function adminUpdateProduct(req, res, next) {
	try {
		const { id } = req.params;
		const updates = req.body;
		const product = await Product.findByIdAndUpdate(id, updates, { new: true });
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

export async function adminDeleteProduct(req, res, next) {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

export default {
	listPublicProducts,
	getPublicProduct,
	adminListProducts,
	adminGetProduct,
	adminCreateProduct,
	adminUpdateProduct,
	adminDeleteProduct,
};
