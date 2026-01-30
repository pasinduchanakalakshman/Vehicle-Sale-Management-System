import { asyncHandler } from "../utils/asyncHandler.js";
import { getAdminOverview } from "../services/adminService.js";

export const getOverview = asyncHandler(async (_req, res) => {
  const overview = await getAdminOverview();
  res.json(overview);
});
