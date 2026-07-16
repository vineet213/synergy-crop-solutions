import Product from "../models/Product.js";
import { AppError } from "../middleware/errorHandler.js";

export async function listPublicProducts(req, res, next) {
	try {
		const { search, category, featured, page = 1, limit = 12, sort = "createdAt", order = "desc" } = req.query;

		const filter = { status: "published" };
		if (category) filter.category = category;
		if (featured !== undefined) {
			filter.isFeatured = featured === "true" || featured === true;
		}

		if (search) {
			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			filter.$or = [
				{ name: { $regex: escaped, $options: "i" } },
				{ shortDescription: { $regex: escaped, $options: "i" } },
				{ description: { $regex: escaped, $options: "i" } },
			];
		}

		const pageNum = Math.max(1, parseInt(page, 10) || 1);
		const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));

		let sortObj = { createdAt: -1 };
		if (sort) {
			sortObj = {};
			sort.split(",").forEach((field) => {
				const desc = field.startsWith("-");
				const name = desc ? field.slice(1) : field;
				sortObj[name] = desc ? -1 : 1;
			});
		}

		const [products, total] = await Promise.all([
			Product.find(filter)
				.sort(sortObj)
				.skip((pageNum - 1) * limitNum)
				.limit(limitNum)
				.lean(),
			Product.countDocuments(filter),
		]);

		const totalPages = Math.ceil(total / limitNum);

		res.json({
			success: true,
			data: products,
			pagination: {
				page: pageNum,
				limit: limitNum,
				total,
				totalPages,
				hasNextPage: pageNum < totalPages,
				hasPrevPage: pageNum > 1,
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function getProductBySlug(req, res, next) {
	try {
		const { slug } = req.params;
		const product = await Product.findOne({ slug, status: "published" }).lean();
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

export async function getProductsByCategory(req, res, next) {
	try {
		const { category } = req.params;
		const products = await Product.find({ category, status: "published" })
			.sort({ createdAt: -1 })
			.lean();
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
		const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
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
	getProductBySlug,
	getProductsByCategory,
	getPublicProduct,
	adminListProducts,
	adminGetProduct,
	adminCreateProduct,
	adminUpdateProduct,
	adminDeleteProduct,
};
