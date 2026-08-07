// Tiny fetch wrapper. In dev, Vite proxies /api -> the Express server.
const BASE = import.meta.env.VITE_API_URL || "";

export async function submitLead(payload) {
  const res = await fetch(`${BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Request failed");
    err.fieldErrors = data.errors || {};
    throw err;
  }
  return data;
}
