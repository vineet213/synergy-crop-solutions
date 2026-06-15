import { AppError } from "./errorHandler.js";

export function authorize(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError("Not authenticated", 401));
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
}
