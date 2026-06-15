import winston from "winston";
import env from "../config/env.js";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const devFormat = printf(({ level, message, timestamp: ts, stack, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `${ts} [${level}] ${stack ?? message}${metaStr}`;
});

const transports = [
  new winston.transports.Console({
    stderrLevels: ["error"],
  }),
];

const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  defaultMeta: { service: "agri-platform-api" },
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    env.isProduction
      ? json()
      : combine(colorize(), devFormat)
  ),
  transports,
  silent: env.isTest,
});

export default logger;
