import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		category: { type: String, required: true, trim: true },
		scientificName: { type: String, default: "" },
		composition: { type: String, default: "" },
		shortDescription: { type: String, default: "" },
		description: { type: String },
		longDescription: { type: String, default: "" },
		benefits: [{ type: String }],
		dosage: { type: String, default: "" },
		applicationMethod: { type: String, default: "" },
		targetCrops: [{ type: String }],
		packSize: [{ type: String }],
		storage: { type: String, default: "" },
		shelfLife: { type: String, default: "" },
		compatibility: { type: String, default: "" },
		productType: { type: String, default: "" },
		tagline: { type: String, default: "" },
		price: { type: Number },
		images: [{ type: String }],
		status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
		isFeatured: { type: Boolean, default: false },
		isImported: { type: Boolean, default: false },
		brochure: { type: String, default: "" },
		relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
		metadata: { type: Object },
	},
	{ timestamps: true }
);

productSchema.index({ slug: 1 });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ name: "text", shortDescription: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
