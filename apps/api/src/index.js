import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./db.js";
import { leadsRouter } from "./routes/leads.js";
import { DIVISIONS, TOTAL } from "@fitamins/shared/deliverables";

const app = express();
const PORT = process.env.PORT || 4000;

const origins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

app.use(cors({ origin: origins }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "fitamins-api", time: new Date().toISOString() });
});

// Expose the manifest so the frontend can optionally hydrate from the API.
app.get("/api/deliverables", (_req, res) => {
  res.json({ ok: true, total: TOTAL, divisions: DIVISIONS });
});

app.use("/api/leads", leadsRouter);

app.use((_req, res) => res.status(404).json({ ok: false, error: "Not found" }));

async function start() {
  await connectDb(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`[api] Fitamins API listening on http://localhost:${PORT}`);
  });
}

start();
