import mongoose from "mongoose";

// ---------------------------------------------------------------------------
// Multilingual-ready field helpers
// Accepts either a plain string (backward-compatible with existing data) or a
// localized object { en: "...", hi: "...", mr: "...", kn: "..." }.
// In the future the schema type can stay Mixed; only the admin UI needs to
// start sending the object form.
// ---------------------------------------------------------------------------

const localizedText = {
	type: mongoose.Schema.Types.Mixed,
	default: "",
	validate: {
		validator: (v) =>
			typeof v === "string" ||
			(typeof v === "object" && v !== null && typeof v.en === "string"),
		message: "Must be a string or a localized object { en: 'text', ... }",
	},
};

const localizedTextArray = {
	type: [mongoose.Schema.Types.Mixed],
	default: [],
	validate: {
		validator: (arr) =>
			Array.isArray(arr) &&
			arr.every(
				(v) =>
					typeof v === "string" ||
					(typeof v === "object" && v !== null && typeof v.en === "string")
			),
		message:
			"Each item must be a string or a localized object { en: 'text', ... }",
	},
};

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------

const faqSchema = new mongoose.Schema(
	{
		question: { ...localizedText, required: true },
		answer: { ...localizedText, required: true },
	},
	{ _id: true }
);

const imageSchema = new mongoose.Schema(
	{
		url: { type: String, required: true, trim: true },
		alt: { ...localizedText, default: "" },
		caption: { ...localizedText, default: "" },
	},
	{ _id: true }
);

const brochureSchema = new mongoose.Schema(
	{
		url: { type: String, default: "" },
		title: { ...localizedText, default: "" },
	},
	{ _id: false }
);

// ---------------------------------------------------------------------------
// Main product schema
// ---------------------------------------------------------------------------

const productSchema = new mongoose.Schema(
	{
		// ── Basic ──────────────────────────────────────────────────────────
		name: { ...localizedText, required: true, trim: true },
		scientificName: { ...localizedText, default: "" },
		slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
		category: { type: String, required: true, trim: true },
		subCategory: { ...localizedText, default: "" },
		featured: { type: Boolean, default: false },
		published: { type: Boolean, default: true },

		// ── Descriptions ───────────────────────────────────────────────────
		shortDescription: { ...localizedText, default: "" },
		longDescription: { ...localizedText, default: "" },
		overview: { ...localizedText, default: "" },

		// ── Technical ──────────────────────────────────────────────────────
		composition: { ...localizedText, default: "" },
		activeIngredients: { ...localizedText, default: "" },
		formulation: { ...localizedText, default: "" },
		modeOfAction: { ...localizedText, default: "" },
		technicalSpecifications: { ...localizedText, default: "" },

		// ── Usage ──────────────────────────────────────────────────────────
		dosage: { ...localizedText, default: "" },
		applicationMethod: { ...localizedText, default: "" },
		frequency: { ...localizedText, default: "" },
		growthStage: { ...localizedText, default: "" },

		// ── Benefits ───────────────────────────────────────────────────────
		benefits: { ...localizedTextArray },
		features: { ...localizedTextArray },

		// ── Agriculture ────────────────────────────────────────────────────
		crops: { ...localizedTextArray },
		diseases: { ...localizedTextArray },
		pests: { ...localizedTextArray },
		nutrientDeficiencies: { ...localizedTextArray },
		suitableRegions: { ...localizedTextArray },

		// ── Safety ─────────────────────────────────────────────────────────
		precautions: { ...localizedText, default: "" },
		storageInstructions: { ...localizedText, default: "" },
		compatibility: { ...localizedText, default: "" },
		shelfLife: { ...localizedText, default: "" },

		// ── Media ──────────────────────────────────────────────────────────
		images: { type: [imageSchema], default: [] },
		brochure: { type: brochureSchema, default: () => ({}) },

		// ── FAQ ────────────────────────────────────────────────────────────
		faqs: { type: [faqSchema], default: [] },

		// ── SEO ────────────────────────────────────────────────────────────
		metaTitle: { ...localizedText, default: "" },
		metaDescription: { ...localizedText, default: "" },
		keywords: { ...localizedTextArray },

		// ── Display ────────────────────────────────────────────────────────
		displayOrder: { type: Number, default: 0 },

		// ── Legacy fields (kept for backward compatibility) ────────────────
		description: { type: String },
		targetCrops: [{ type: String }],
		packSize: [{ type: String }],
		storage: { type: String, default: "" },
		productType: { type: String, default: "" },
		tagline: { type: String, default: "" },
		price: { type: Number },
		status: {
			type: String,
			enum: ["draft", "published", "archived"],
			default: "published",
		},
		isFeatured: { type: Boolean, default: false },
		isImported: { type: Boolean, default: false },
		relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
		metadata: { type: Object },
	},
	{ timestamps: true }
);

// ---------------------------------------------------------------------------
// Indexes
// ---------------------------------------------------------------------------
productSchema.index({ slug: 1 });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ category: 1, published: 1 });
productSchema.index({ featured: 1, published: 1 });
productSchema.index({ displayOrder: 1 });
productSchema.index({
	name: "text",
	shortDescription: "text",
	description: "text",
	longDescription: "text",
});

const Product = mongoose.model("Product", productSchema);

export default Product;
