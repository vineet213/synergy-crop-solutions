import express from "express";
import * as productController from "../controllers/productController.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createProductSchema, updateProductSchema } from "../validators/productValidator.js";
import { productUpload } from "../config/multer.js";

const router = express.Router();

// Existing public product endpoints
router.get("/public/products", productController.listPublicProducts);
router.get("/public/products/:id", productController.getPublicProduct);

// New public API (aligned with /api/products mount)
router.get("/products", productController.listPublicProducts);
router.get("/products/category/:category", productController.getProductsByCategory);
router.get("/products/:slug", productController.getProductBySlug);

// Admin product endpoints (protected)
router.get("/admin/products", authenticate, productController.adminListProducts);
router.post(
	"/admin/products",
	authenticate,
	productUpload,
	productController.parseFormDataBody,
	validateRequest(createProductSchema),
	productController.adminCreateProduct
);
router.get("/admin/products/:id", authenticate, productController.adminGetProduct);
router.patch(
	"/admin/products/:id",
	authenticate,
	productUpload,
	productController.parseFormDataBody,
	validateRequest(updateProductSchema),
	productController.adminUpdateProduct
);
router.delete("/admin/products/:id", authenticate, productController.adminDeleteProduct);

export default router;
