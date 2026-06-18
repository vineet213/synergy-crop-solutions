import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      zip: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
    },
    serviceableStates: [{ type: String, trim: true }],
    products: [{ type: String, trim: true }],
    certifications: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    website: { type: String, trim: true },
    description: { type: String, trim: true },
    logo: { type: String, trim: true },
  },
  { timestamps: true }
);

distributorSchema.index({ "address.state": 1 });
distributorSchema.index({ status: 1 });
distributorSchema.index({ location: "2dsphere" });

const Distributor = mongoose.model("Distributor", distributorSchema);

export default Distributor;
