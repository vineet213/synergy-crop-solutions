import express from "express";
import { login, getMe } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginSchema } from "../validators/adminValidator.js";

const router = express.Router();

router.post("/login", validateRequest(loginSchema), login);
router.get("/me", authenticate, getMe);

export default router;
