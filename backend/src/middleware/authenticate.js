import { AppError } from "./errorHandler.js";
import { verifyToken } from "../auth/jwt.js";
import Admin from "../models/Admin.js";

export async function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Authorization token is missing or invalid", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    if (!decoded?.id) {
      return next(new AppError("Invalid authentication token", 401));
    }

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return next(new AppError("Authentication failed", 401));
    }

    req.user = admin;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired authentication token", 401));
  }
}
