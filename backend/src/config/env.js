import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV ?? "development";
const isProduction = NODE_ENV === "production";
const isTest = NODE_ENV === "test";

function requireEnv(key) {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function optionalEnv(key, fallback) {
  const value = process.env[key]?.trim();
  return value || fallback;
}

function parsePort(value) {
  const port = Number.parseInt(value, 10);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      `Invalid PORT value: "${value}". Must be an integer between 1 and 65535.`
    );
  }
  return port;
}

function parseOrigins(value) {
  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function validateJwtSecret(secret) {
  if (secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
  }
}

const MONGODB_URI = requireEnv("MONGODB_URI");
const JWT_SECRET = requireEnv("JWT_SECRET");

validateJwtSecret(JWT_SECRET);

const ADMIN_NAME = optionalEnv("ADMIN_NAME", "Super Admin");
const ADMIN_EMAIL = optionalEnv("ADMIN_EMAIL", "");
const ADMIN_PASSWORD = optionalEnv("ADMIN_PASSWORD", "");

const env = Object.freeze({
  NODE_ENV,
  isProduction,
  isTest,

  PORT: parsePort(optionalEnv("PORT", "5000")),

  MONGODB_URI,
  JWT_SECRET,

  ADMIN_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,

  JWT_EXPIRES_IN: optionalEnv("JWT_EXPIRES_IN", "7d"),

  CORS_ORIGINS: parseOrigins(
    optionalEnv(
      "CORS_ORIGINS",
      isProduction ? "" : "http://localhost:5173"
    )
  ),

  LOG_LEVEL: optionalEnv(
    "LOG_LEVEL",
    isProduction ? "info" : "debug"
  ),

  RATE_LIMIT_WINDOW_MS: Number.parseInt(
    optionalEnv("RATE_LIMIT_WINDOW_MS", "900000"),
    10
  ),

  RATE_LIMIT_MAX: Number.parseInt(
    optionalEnv("RATE_LIMIT_MAX", "100"),
    10
  ),
});

if (env.isProduction && env.CORS_ORIGINS.length === 0) {
  throw new Error("CORS_ORIGINS must be set in production.");
}

export default env;