// Vercel serverless entry. Wraps the Express app so that requests to /api/* work
// in production (the Vite dev proxy only exists locally). See ../vercel.json,
// which rewrites /api/(.*) to this function.
import app from "../apps/api/src/index.js";
import { connectDb } from "../apps/api/src/db.js";

// Connect to MongoDB once per warm instance (mongoose caches the connection).
// No-op when MONGODB_URI is unset — the API then runs in in-memory mode and
// still emails leads via Resend.
let connecting;

export default async function handler(req, res) {
  if (!connecting) connecting = connectDb(process.env.MONGODB_URI);
  await connecting;
  return app(req, res);
}
