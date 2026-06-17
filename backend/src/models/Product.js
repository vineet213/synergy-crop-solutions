import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		slug: { type: String, required: true, unique: true, trim: true },
		category: { type: String, required: true, trim: true },
		description: { type: String },
		price: { type: Number },
		images: [{ type: String }],
		status: { type: String, enum: ["draft", "published", "archived"], default: "published" },
		metadata: { type: Object },
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
