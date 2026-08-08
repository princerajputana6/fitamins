import { Router } from "express";
import { validateLead } from "@fitamins/shared/validate";
import { Lead } from "../models/Lead.js";
import { isDbConnected } from "../db.js";
import { sendLeadEmail } from "../lib/email.js";

export const leadsRouter = Router();

// In-memory fallback store so the demo works without MongoDB running.
const memoryStore = [];

leadsRouter.post("/", async (req, res) => {
  const { valid, errors, value } = validateLead(req.body);
  if (!valid) {
    return res.status(422).json({ ok: false, errors });
  }

  const payload = { ...value, source: "website" };

  try {
    let response;
    if (isDbConnected()) {
      const lead = await Lead.create(payload);
      response = { ok: true, id: lead._id };
    } else {
      const record = { ...payload, _id: `mem_${Date.now()}`, createdAt: new Date() };
      memoryStore.push(record);
      response = { ok: true, id: record._id, mode: "memory" };
    }

    // Notify the team by email. Failure here must not fail the request.
    await sendLeadEmail(payload);

    return res.status(201).json(response);
  } catch (err) {
    console.error("[leads] create failed", err);
    return res.status(500).json({ ok: false, error: "Could not save your request." });
  }
});

leadsRouter.get("/", async (_req, res) => {
  try {
    if (isDbConnected()) {
      const leads = await Lead.find().sort({ createdAt: -1 }).limit(100).lean();
      return res.json({ ok: true, count: leads.length, leads });
    }
    return res.json({ ok: true, count: memoryStore.length, leads: memoryStore, mode: "memory" });
  } catch (err) {
    console.error("[leads] list failed", err);
    return res.status(500).json({ ok: false, error: "Could not list leads." });
  }
});
