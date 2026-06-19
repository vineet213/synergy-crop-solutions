import express from "express";
import * as testimonialController from "../controllers/testimonialController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/public/testimonials", testimonialController.listPublicTestimonials);
router.get("/public/testimonials/:id", testimonialController.getPublicTestimonial);

router.get("/admin/testimonials", authenticate, testimonialController.adminListTestimonials);
router.get("/admin/testimonials/:id", authenticate, testimonialController.adminGetTestimonial);
router.post("/admin/testimonials", authenticate, testimonialController.adminCreateTestimonial);
router.patch("/admin/testimonials/:id", authenticate, testimonialController.adminUpdateTestimonial);
router.delete("/admin/testimonials/:id", authenticate, testimonialController.adminDeleteTestimonial);

export default router;
