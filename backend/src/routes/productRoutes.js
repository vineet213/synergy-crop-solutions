import express from "express";
import * as productController from "../controllers/productController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Public product endpoints
router.get("/public/products", productController.listPublicProducts);
router.get("/public/products/:id", productController.getPublicProduct);

// Admin product endpoints (protected)
router.get("/admin/products", authenticate, productController.adminListProducts);
router.post("/admin/products", authenticate, productController.adminCreateProduct);
router.get("/admin/products/:id", authenticate, productController.adminGetProduct);
router.patch("/admin/products/:id", authenticate, productController.adminUpdateProduct);
router.delete("/admin/products/:id", authenticate, productController.adminDeleteProduct);

export default router;
