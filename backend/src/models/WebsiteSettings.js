import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { _id: true, timestamps: false }
);

const websiteSettingsSchema = new mongoose.Schema(
  {
    company: {
      name: { type: String, trim: true, default: "Synergy Crop Solutions" },
      tagline: { type: String, trim: true, default: "" },
      address: { type: String, trim: true, default: "" },
      city: { type: String, trim: true, default: "" },
      state: { type: String, trim: true, default: "" },
      pinCode: { type: String, trim: true, default: "" },
    },
    contact: {
      phoneNumbers: { type: [String], default: [] },
      whatsappNumber: { type: String, trim: true, default: "" },
      email: { type: String, trim: true, default: "" },
      officeHours: { type: String, trim: true, default: "" },
    },
    location: {
      googleMapsEmbedUrl: { type: String, trim: true, default: "" },
    },
    socialMedia: {
      facebook: { type: String, trim: true, default: "" },
      instagram: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      youtube: { type: String, trim: true, default: "" },
      twitter: { type: String, trim: true, default: "" },
    },
    website: {
      footerText: { type: String, trim: true, default: "" },
      copyrightText: { type: String, trim: true, default: "" },
    },
    assets: {
      logo: { type: String, trim: true, default: "" },
      favicon: { type: String, trim: true, default: "" },
    },
    certificates: { type: [certificateSchema], default: [] },
  },
  { timestamps: true }
);

const WebsiteSettings = mongoose.model("WebsiteSettings", websiteSettingsSchema);

export default WebsiteSettings;
