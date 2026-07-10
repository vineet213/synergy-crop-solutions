import express from "express";
import {
  listAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  changePassword,
} from "../controllers/adminController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createAdminSchema,
  updateAdminSchema,
  changePasswordSchema,
} from "../validators/adminValidator.js";

const router = express.Router();

router.get("/admins", authenticate, authorize("superadmin"), listAdmins);
router.get("/admins/:id", authenticate, authorize("superadmin"), getAdmin);
router.post("/admins", authenticate, authorize("superadmin"), validateRequest(createAdminSchema), createAdmin);
router.patch("/admins/:id", authenticate, authorize("superadmin"), validateRequest(updateAdminSchema), updateAdmin);
router.delete("/admins/:id", authenticate, authorize("superadmin"), deleteAdmin);

router.put("/auth/change-password", authenticate, validateRequest(changePasswordSchema), changePassword);

export default router;
