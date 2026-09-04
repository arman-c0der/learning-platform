
import mongoose from "mongoose";



const MONGODB_URI = process.env.MONGODB_URI;

("=== MONGODB_URI CHECK ===", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    ("✅ Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      ("✅ MongoDB connected successfully");
      console.log("MongoDB connection state:", mongooseInstance.connection.readyState);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    ("❌ MongoDB connection failed:", e.message);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}