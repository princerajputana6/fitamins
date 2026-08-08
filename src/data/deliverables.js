// The 54 deliverables across 8 divisions (vendored into the web app).
export const DIVISIONS = [
  {
    id: "identity",
    name: "Brand Identity",
    short: "Identity",
    items: [
      "Brand name consultation",
      "Logo design & refinement",
      "Brand positioning",
      "Brand story & vision development",
    ],
  },
  {
    id: "brand",
    name: "Brand Development & Packaging",
    short: "Packaging",
    items: [
      "Licensing & regulatory guidance",
      "Label design",
      "Premium brand theme",
      "Product packaging design",
      "Printed product boxes",
      "Complete product mockups",
      "Domain registration & hosting",
      "Fully functional eCommerce website",
      "Payment gateway integration",
      "Product catalogue design",
      "Promotional creatives",
      "Hero SKU selection strategy",
      "Branded shaker design",
      "Branded promotional t-shirts",
      "Influencer marketing strategy & training",
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Quality Assurance",
    short: "Manufacturing",
    items: [
      "Premium supplement manufacturing",
      "Label printing",
      "Final packaging",
      "Batch testing laboratory reports",
      "Product quality documentation",
      "Certifications support",
    ],
  },
  {
    id: "compliance",
    name: "Compliance & Documentation",
    short: "Compliance",
    items: [
      "GST filing support",
      "Taxation guidance",
      "Annual audit assistance",
      "FSSAI annual return filing",
      "Regulatory documentation support",
    ],
  },
  {
    id: "operations",
    name: "Operations & Business Support",
    short: "Operations",
    items: [
      "Inventory management software",
      "Billing software setup",
      "Website maintenance",
      "Shipping & logistics support",
      "Branded shipping cartons",
      "Branded packaging tape",
      "Cost-effective transport solutions",
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace Growth",
    short: "Marketplace",
    items: [
      "Amazon seller account setup",
      "Amazon product listings",
      "Flipkart product listings",
      "Marketplace optimisation",
    ],
  },
  {
    id: "marketing",
    name: "Marketing & Business Growth",
    short: "Marketing",
    items: [
      "SEO optimisation",
      "Social media marketing",
      "Performance marketing support",
      "Offline sales strategy",
      "Customer retention strategy",
      "Export growth strategy",
      "International documentation support",
      "Expert business mentorship",
    ],
  },
  {
    id: "mentorship",
    name: "Expert Business Mentorship",
    short: "Mentorship",
    items: [
      "Brand management training",
      "Business growth strategy",
      "Marketing roadmap",
      "Sales scaling framework",
      "Long-term brand development",
    ],
  },
];

export const ALL = DIVISIONS.flatMap((d) =>
  d.items.map((name) => ({ name, div: d.id, divName: d.short }))
);

export const TOTAL = ALL.length;
