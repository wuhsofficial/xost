import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/agency_db";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

/**
 * Cached connection promise.
 * In development, we store the promise on `globalThis` so that
 * hot-reloading does not exhaust the MongoDB connection pool.
 */
let cached = global._mongooseConnectionPromise;

async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached) {
    return cached;
  }

  const opts: mongoose.ConnectOptions = {
    bufferCommands: false,
  };

  cached = mongoose.connect(MONGODB_URI, opts);
  global._mongooseConnectionPromise = cached;

  return cached;
}

export default connectToDatabase;
