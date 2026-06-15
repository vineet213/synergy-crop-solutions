import logger from "../utils/logger.js";
import env from "../config/env.js";

export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

function normalizeError(err) {
  if (err.name === "ValidationError") {
    return new AppError("Validation failed", 400, err.errors);
  }

  if (err.name === "CastError") {
    return new AppError("Invalid resource identifier", 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? "field";
    return new AppError(`Duplicate value for ${field}`, 409);
  }

  if (err.name === "JsonWebTokenError") {
    return new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    return new AppError("Token expired", 401);
  }

  if (err.message?.startsWith("CORS blocked")) {
    return new AppError("Origin not allowed by CORS policy", 403);
  }

  return err;
}

export function notFoundHandler(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(err, req, res, _next) {
  const normalized = normalizeError(err);
  const statusCode = normalized.statusCode ?? 500;
  const isOperational = normalized.isOperational ?? false;

  if (!isOperational || statusCode >= 500) {
    logger.error("Request error", {
      method: req.method,
      url: req.originalUrl,
      statusCode,
      message: normalized.message,
      stack: normalized.stack,
    });
  } else {
    logger.warn("Operational error", {
      method: req.method,
      url: req.originalUrl,
      statusCode,
      message: normalized.message,
    });
  }

  const response = {
    success: false,
    message: isOperational ? normalized.message : "Internal server error",
  };

  if (normalized.details) {
    response.details = normalized.details;
  }

  if (!env.isProduction && !isOperational) {
    response.stack = normalized.stack;
  }

  res.status(statusCode).json(response);
}
