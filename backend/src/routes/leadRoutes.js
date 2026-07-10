import express from "express";
import * as leadController from "../controllers/leadController.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createLeadSchema } from "../validators/leadValidator.js";

const router = express.Router();

router.post("/public/leads", validateRequest(createLeadSchema), leadController.createPublicLead);

router.get("/admin/leads/export", authenticate, leadController.adminExportLeads);
router.get("/admin/leads", authenticate, leadController.adminListLeads);
router.get("/admin/leads/:id", authenticate, leadController.adminGetLead);
router.patch("/admin/leads/:id", authenticate, leadController.adminUpdateLead);
router.delete("/admin/leads/:id", authenticate, leadController.adminDeleteLead);

export default router;
