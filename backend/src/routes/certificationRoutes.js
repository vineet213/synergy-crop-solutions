import express from "express";
import * as certificationController from "../controllers/certificationController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.get("/public/certifications", certificationController.listPublicCertifications);
router.get("/public/certifications/:id", certificationController.getPublicCertification);

router.get("/admin/certifications", authenticate, certificationController.adminListCertifications);
router.get("/admin/certifications/:id", authenticate, certificationController.adminGetCertification);
router.post("/admin/certifications", authenticate, certificationController.adminCreateCertification);
router.patch("/admin/certifications/:id", authenticate, certificationController.adminUpdateCertification);
router.delete("/admin/certifications/:id", authenticate, certificationController.adminDeleteCertification);

export default router;
