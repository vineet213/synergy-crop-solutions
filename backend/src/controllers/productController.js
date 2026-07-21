import Product from "../models/Product.js";
import { AppError } from "../middleware/errorHandler.js";
import { resolveProductPath, deleteProductFile } from "../config/multer.js";

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Extract a plain-text value from a field that may be a localized object or a
 * plain string. Used for slug generation and text search.
 */
function textValue(v) {
	if (v === undefined || v === null) return "";
	if (typeof v === "string") return v;
	if (typeof v === "object" && typeof v.en === "string") return v.en;
	return "";
}

/**
 * Build a regex-safe slug from a product name (handles localized objects).
 */
function slugify(name) {
	const raw = textValue(name);
	return raw
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

/**
 * Middleware: If the request was sent as FormData with a `data` JSON string,
 * parse it into req.body so downstream middleware (validator) and the
 * controller receive a normal object.
 */
export function parseFormDataBody(req, res, next) {
	if (req.body?.data && typeof req.body.data === "string") {
		try {
			req.body = JSON.parse(req.body.data);
		} catch {
			return res.status(400).json({ success: false, message: "Invalid form data" });
		}
	}
	next();
}

/**
 * Build an images array by keeping existing image objects from the body and
 * appending newly uploaded files.
 */
function mergeImages(bodyImages, uploadedFiles) {
	const existing = Array.isArray(bodyImages)
		? bodyImages.filter((img) => img && typeof img === "object" && img.url)
		: [];
	const newImages = (uploadedFiles || []).map((f) => ({
		url: resolveProductPath(f),
		alt: "",
		caption: "",
	}));
	return [...existing, ...newImages];
}

/**
 * Build the brochure object. If a new file was uploaded, use it; otherwise
 * keep the existing brochure from the body.
 */
function mergeBrochure(bodyBrochure, uploadedFile) {
	if (uploadedFile) {
		return {
			url: resolveProductPath(uploadedFile),
			title: bodyBrochure?.title || "",
		};
	}
	if (bodyBrochure && typeof bodyBrochure === "object" && bodyBrochure.url) {
		return bodyBrochure;
	}
	return undefined;
}

/**
 * Recursively collect all string values that look like upload paths from an
 * object/array so they can be deleted from disk.
 */
function collectUploadPaths(value, paths = []) {
	if (!value) return paths;
	if (typeof value === "string" && value.startsWith("uploads/")) {
		paths.push(value);
	} else if (Array.isArray(value)) {
		value.forEach((v) => collectUploadPaths(v, paths));
	} else if (typeof value === "object") {
		Object.values(value).forEach((v) => collectUploadPaths(v, paths));
	}
	return paths;
}

/**
 * Normalize a product document for the admin editor. Ensures all legacy
 * field shapes are converted to their new equivalents so the form
 * receives consistent data.
 */
function normalizeProductForAdmin(doc) {
	if (!doc) return doc;
	const o = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };

	// Normalize images: plain string array → [{url, alt, caption}]
	if (Array.isArray(o.images)) {
		o.images = o.images.map((img) => {
			if (typeof img === "string") return { url: img, alt: "", caption: "" };
			if (img && typeof img === "object" && typeof img.url === "string") {
				return { url: img.url, alt: textValue(img.alt) || "", caption: textValue(img.caption) || "" };
			}
			return null;
		}).filter(Boolean);
	}

	// Normalize brochure: plain string → {url, title}
	if (typeof o.brochure === "string") {
		o.brochure = { url: o.brochure, title: "" };
	}

	// Sync booleans from legacy fields
	if (o.published === undefined || o.published === null) {
		o.published = o.status === "published";
	}
	if (o.featured === undefined || o.featured === null) {
		o.featured = !!o.isFeatured;
	}

	// Sync storageInstructions from legacy storage
	if (!o.storageInstructions && o.storage) {
		o.storageInstructions = o.storage;
	}

	return o;
}

// ── Public endpoints ───────────────────────────────────────────────────────

export async function listPublicProducts(req, res, next) {
	try {
		const {
			search,
			category,
			featured,
			page = 1,
			limit = 12,
			sort = "createdAt",
			order = "desc",
		} = req.query;

		// Backward-compatible visibility filter:
		// Legacy docs have status:"published" but no "published" field.
		// New docs use published:true. The OR covers both.
		const visibilityFilter = {
			$or: [{ status: "published" }, { published: true }],
		};

		const conditions = [visibilityFilter];
		if (category) conditions.push({ category });
		if (featured !== undefined) {
			const isFeatured = featured === "true" || featured === true;
			conditions.push({ $or: [{ isFeatured: isFeatured }, { featured: isFeatured }] });
		}
		if (search) {
			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			conditions.push({
				$or: [
					{ name: { $regex: escaped, $options: "i" } },
					{ shortDescription: { $regex: escaped, $options: "i" } },
					{ description: { $regex: escaped, $options: "i" } },
					{ longDescription: { $regex: escaped, $options: "i" } },
				],
			});
		}

		const filter = conditions.length === 1 ? conditions[0] : { $and: conditions };

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
		const product = await Product.findOne({
			slug,
			$or: [{ status: "published" }, { published: true }],
		}).lean();
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

export async function getProductsByCategory(req, res, next) {
	try {
		const { category } = req.params;
		const products = await Product.find({
			category,
			$or: [{ status: "published" }, { published: true }],
		})
			.sort({ displayOrder: 1, createdAt: -1 })
			.lean();
		res.json({ success: true, data: products });
	} catch (error) {
		next(error);
	}
}

export async function getPublicProduct(req, res, next) {
	try {
		const { id } = req.params;
		const product = await Product.findOne({
			_id: id,
			$or: [{ status: "published" }, { published: true }],
		}).lean();
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
}

// ── Admin endpoints ────────────────────────────────────────────────────────

export async function adminListProducts(req, res, next) {
	try {
		const {
			status,
			category,
			featured,
			search,
			page = 1,
			limit = 50,
		} = req.query;

		const filter = {};
		if (status) filter.status = status;
		if (category) filter.category = category;

		const orConditions = [];
		if (featured !== undefined) {
			const isFeatured = featured === "true" || featured === true;
			orConditions.push({ isFeatured: isFeatured }, { featured: isFeatured });
		}
		if (search) {
			const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			orConditions.push(
				{ name: { $regex: escaped, $options: "i" } },
				{ shortDescription: { $regex: escaped, $options: "i" } },
				{ slug: { $regex: escaped, $options: "i" } },
			);
		}
		if (orConditions.length > 0) {
			filter.$or = orConditions;
		}

		const pageNum = Math.max(1, parseInt(page, 10) || 1);
		const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));

		const [products, total] = await Promise.all([
			Product.find(filter)
				.sort({ displayOrder: 1, createdAt: -1 })
				.skip((pageNum - 1) * limitNum)
				.limit(limitNum)
				.lean(),
			Product.countDocuments(filter),
		]);

		res.json({
			success: true,
			data: products,
			pagination: {
				page: pageNum,
				limit: limitNum,
				total,
				totalPages: Math.ceil(total / limitNum),
			},
		});
	} catch (error) {
		next(error);
	}
}

export async function adminGetProduct(req, res, next) {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).lean();
		if (!product) return next(new AppError("Product not found", 404));
		res.json({ success: true, data: normalizeProductForAdmin(product) });
	} catch (error) {
		next(error);
	}
}

export async function adminCreateProduct(req, res, next) {
	try {
		const payload = req.body;

		// Auto-generate slug from name if not provided
		if (!payload.slug) {
			payload.slug = slugify(payload.name);
		}

		// Sync legacy status field from published flag
		if (payload.published === false && !payload.status) {
			payload.status = "draft";
		}
		if (payload.status && payload.published === undefined) {
			payload.published = payload.status === "published";
		}

		// Sync legacy isFeatured from featured
		if (payload.featured !== undefined && payload.isFeatured === undefined) {
			payload.isFeatured = payload.featured;
		}
		if (payload.isFeatured !== undefined && payload.featured === undefined) {
			payload.featured = payload.isFeatured;
		}

		// Process uploaded files (if FormData was used)
		if (req.files) {
			payload.images = mergeImages(payload.images, req.files.images);
			const brochure = mergeBrochure(payload.brochure, req.files.brochure?.[0]);
			if (brochure !== undefined) payload.brochure = brochure;
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

		// Strip read-only fields that must never be updated via the API
		delete updates._id;
		delete updates.__v;
		delete updates.createdAt;
		delete updates.updatedAt;

		// Auto-generate slug from name if slug is being cleared
		if (updates.slug === "" && updates.name) {
			updates.slug = slugify(updates.name);
		}

		// Sync legacy fields when new equivalents are updated
		if (updates.published !== undefined && updates.status === undefined) {
			updates.status = updates.published ? "published" : "draft";
		}
		if (updates.status !== undefined && updates.published === undefined) {
			updates.published = updates.status === "published";
		}
		if (updates.featured !== undefined && updates.isFeatured === undefined) {
			updates.isFeatured = updates.featured;
		}
		if (updates.isFeatured !== undefined && updates.featured === undefined) {
			updates.featured = updates.isFeatured;
		}
		if (updates.storageInstructions !== undefined && updates.storage === undefined) {
			updates.storage = textValue(updates.storageInstructions);
		}

		// Process uploaded files (if FormData was used)
		if (req.files) {
			const existing = await Product.findById(id).lean();
			updates.images = mergeImages(updates.images, req.files.images);
			const brochure = mergeBrochure(updates.brochure || existing?.brochure, req.files.brochure?.[0]);
			if (brochure !== undefined) updates.brochure = brochure;

			// Clean up replaced image files
			if (existing?.images) {
				const oldPaths = new Set(existing.images.map((i) => i?.url).filter(Boolean));
				const newPaths = new Set(updates.images.map((i) => i?.url).filter(Boolean));
				oldPaths.forEach((p) => {
					if (!newPaths.has(p)) deleteProductFile(p);
				});
			}
			// Clean up replaced brochure
			if (existing?.brochure?.url && updates.brochure?.url !== existing.brochure.url) {
				deleteProductFile(existing.brochure.url);
			}
		}

		const product = await Product.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});
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

		// Clean up all uploaded files
		collectUploadPaths(product.images).forEach(deleteProductFile);
		if (product.brochure?.url) deleteProductFile(product.brochure.url);

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
