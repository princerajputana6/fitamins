import { Resend } from "resend";

// Resend is optional: without an API key the API still works and saves leads,
// it just skips the email notification (handy for local dev).
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.RESEND_FROM || "Fitamins Website <onboarding@resend.dev>";
const TO = (process.env.RESEND_TO || "connect@biztreck.world")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function buildHtml(lead) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 16px;color:#8b948c;font:500 12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${esc(label)}</td>
      <td style="padding:10px 16px;color:#0c1712;font:400 15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif">${value}</td>
    </tr>`;

  return `
  <div style="background:#f4f1ea;padding:28px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid rgba(12,23,18,.1);border-radius:18px;overflow:hidden">
      <div style="background:#0a2019;padding:22px 24px">
        <p style="margin:0;color:#c7f55b;font:500 12px/1 -apple-system,Segoe UI,Roboto,sans-serif;letter-spacing:.16em;text-transform:uppercase">New consultation request</p>
        <h1 style="margin:8px 0 0;color:#fff;font:700 24px/1.1 Georgia,serif">${esc(lead.name)}</h1>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row("Email", `<a href="mailto:${esc(lead.email)}" style="color:#1f6b52">${esc(lead.email)}</a>`)}
        ${row("Phone", `<a href="tel:${esc(lead.phone)}" style="color:#1f6b52">${esc(lead.phone)}</a>`)}
        ${row("Where they are", esc(lead.stage))}
        ${row("Product category", esc(lead.category))}
        ${row("What they want to build", esc(lead.message) || "—")}
      </table>
      <div style="padding:16px 24px;border-top:1px solid rgba(12,23,18,.08);color:#8b948c;font:400 12px/1.5 -apple-system,Segoe UI,Roboto,sans-serif">
        Sent from the Fitamins Healthcare website · ${new Date().toLocaleString("en-IN")}
      </div>
    </div>
  </div>`;
}

/**
 * Emails a consultation lead to the team. Never throws — returns a status object so
 * a mail failure can't break the lead-capture request.
 */
export async function sendLeadEmail(lead) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping email notification.");
    return { skipped: true };
  }
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: lead.email,
      subject: `New consultation request — ${lead.name}`,
      html: buildHtml(lead),
    });
    if (error) {
      console.error("[email] Resend returned an error", error);
      return { error };
    }
    console.log(`[email] Lead notification sent (id: ${data?.id})`);
    return { id: data?.id };
  } catch (err) {
    console.error("[email] send threw", err);
    return { error: err };
  }
}
