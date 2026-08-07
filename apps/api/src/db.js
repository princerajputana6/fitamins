import mongoose from "mongoose";

let connected = false;

export function isDbConnected() {
  return connected;
}

export async function connectDb(uri) {
  if (!uri) {
    console.warn(
      "[db] MONGODB_URI not set — running in in-memory mode. Leads will not persist."
    );
    return false;
  }
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    connected = true;
    console.log("[db] Connected to MongoDB");
    return true;
  } catch (err) {
    console.warn(
      `[db] Could not connect to MongoDB (${err.message}). Falling back to in-memory mode.`
    );
    return false;
  }
}
