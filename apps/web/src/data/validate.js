// Lead-form validation (vendored into the web app so it has no workspace deps).
export const STAGES = [
  "Starting a new brand",
  "Scaling an existing brand",
  "Private label order only",
  "Exploring export",
];

export const PRODUCT_CATEGORIES = [
  "Whey & protein",
  "Mass & weight gainers",
  "Pre-workout & performance",
  "Vitamins & wellness",
  "Ayurvedic & herbal",
  "Not decided yet",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {Record<string, unknown>} input
 * @returns {{ valid: boolean, errors: Record<string,string>, value: object }}
 */
export function validateLead(input = {}) {
  const errors = {};
  const value = {};

  const name = String(input.name ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  value.name = name;

  const phone = String(input.phone ?? "").trim();
  if (phone.replace(/[^\d]/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";
  value.phone = phone;

  const email = String(input.email ?? "").trim();
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  value.email = email;

  value.stage = STAGES.includes(input.stage) ? input.stage : STAGES[0];
  value.category = PRODUCT_CATEGORIES.includes(input.category)
    ? input.category
    : PRODUCT_CATEGORIES[PRODUCT_CATEGORIES.length - 1];

  value.message = String(input.message ?? "").trim().slice(0, 2000);

  return { valid: Object.keys(errors).length === 0, errors, value };
}
