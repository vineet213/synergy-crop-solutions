import express from "express";
import rateLimit from "express-rate-limit";
import { login, getMe } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginSchema } from "../validators/adminValidator.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/login", loginLimiter, validateRequest(loginSchema), login);
router.get("/me", authenticate, getMe);

export default router;
