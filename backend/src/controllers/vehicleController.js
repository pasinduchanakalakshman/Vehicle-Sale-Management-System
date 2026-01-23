import { asyncHandler } from "../utils/asyncHandler.js";
import { createVehicleListing, searchVehicles } from "../services/vehicleService.js";

export const listVehicles = asyncHandler(async (req, res) => {
  const result = await searchVehicles(req.query);
  res.json(result);
});

export const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await createVehicleListing(req.body);
  res.status(201).json({ vehicle });
});
