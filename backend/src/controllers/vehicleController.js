import { asyncHandler } from "../utils/asyncHandler.js";
import { searchVehicles } from "../services/vehicleService.js";

export const listVehicles = asyncHandler(async (req, res) => {
  const result = await searchVehicles(req.query);
  res.json(result);
});
