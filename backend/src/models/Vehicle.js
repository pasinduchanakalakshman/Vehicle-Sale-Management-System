import mongoose from "mongoose";

const { Schema, model } = mongoose;

const vehicleSchema = new Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    vehicleType: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, default: 0 },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid", "other"],
      default: "other",
    },
    transmission: { type: String, enum: ["auto", "manual", "cvt", "other"], default: "other" },
    condition: { type: String, enum: ["new", "used"], required: true },
    showroomLocation: { type: String, required: true, trim: true },
    description: { type: String },
    images: [{ type: String }],
    ownerCount: { type: Number, default: 0 },
    isBrandNew: { type: Boolean, default: false },
    status: { type: String, enum: ["available", "sold"], default: "available" },
  },
  { timestamps: true }
);

vehicleSchema.index({ brand: 1, model: 1 });
vehicleSchema.index({ vehicleType: 1 });
vehicleSchema.index({ price: 1 });
vehicleSchema.index({ year: 1 });
vehicleSchema.index({ fuelType: 1 });
vehicleSchema.index({ ownerCount: 1 });
vehicleSchema.index({ showroomLocation: 1 });

export default model("Vehicle", vehicleSchema);
