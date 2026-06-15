import Admin from "../models/Admin.js";
import { signToken } from "../auth/jwt.js";
import { AppError } from "../middleware/errorHandler.js";

function sanitizeAdmin(admin) {
  const { password, __v, ...safeAdmin } = admin.toObject();
  return safeAdmin;
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select("+password");

  if (!admin || !(await admin.comparePassword(password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = signToken({ id: admin._id.toString(), role: admin.role });

  res.status(200).json({
    success: true,
    token,
    user: sanitizeAdmin(admin),
  });
}

export async function getMe(req, res, next) {
  if (!req.user) {
    return next(new AppError("Authentication required", 401));
  }

  res.status(200).json({
    success: true,
    user: sanitizeAdmin(req.user),
  });
}
