import env from "./config/env.js";
import { connectDB, disconnectDB } from "./config/db.js";
import app from "./app.js";
import logger from "./utils/logger.js";
import seedAll from "./services/seedService.js";

let server;

async function startServer() {
  try {
    await connectDB();
    await seedAll();

    server = app.listen(env.PORT, () => {
      logger.info("Server started", {
        port: env.PORT,
        environment: env.NODE_ENV,
        nodeVersion: process.version,
      });
    });
  } catch (error) {
    logger.error("Failed to start server", { message: error.message });
    process.exit(1);
  }
}

async function shutdown(signal) {
  logger.info(`${signal} received — shutting down gracefully`);

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  }

  await disconnectDB();
  logger.info("Shutdown complete");
  process.exit(0);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled promise rejection", {
    reason: reason?.message ?? reason,
  });
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception", { message: error.message, stack: error.stack });
  process.exit(1);
});

startServer();
