import mongoose from "mongoose";
import { devConfig } from "./dev";

class DB {
  async init() {
    const dbUrl =
      process.env.NODE_ENV === "development"
        ? devConfig.db_url
        : process.env.MONGODB_URI || "mongodb://localhost:27017/dms_v2";

    try {
      const conn = await mongoose.connect(dbUrl, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      });

      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error("❌ Cannot connect to MongoDB:", err.message);
      }
      process.exit(1);
    }
  }
}

export const db = new DB();
