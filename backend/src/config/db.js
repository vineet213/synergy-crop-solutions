import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

mongoose.set("strictQuery", true);

const connectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

export async function connectDB() {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, connectionOptions);
    logger.info("MongoDB Atlas connected", {
      host: conn.connection.host,
      database: conn.connection.name,
    });
    return conn;
  } catch (error) {
    logger.error("MongoDB connection failed", { message: error.message });
    throw error;
  }
}

export async function disconnectDB() {
  await mongoose.connection.close();
  logger.info("MongoDB connection closed");
}

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB connection error", { message: error.message });
});

export default mongoose;
