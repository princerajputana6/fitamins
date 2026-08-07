import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    stage: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String, default: "" },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead", leadSchema);
