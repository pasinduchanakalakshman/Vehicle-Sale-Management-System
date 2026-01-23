import { asyncHandler } from "../utils/asyncHandler.js";
import { getProfile as getProfileService, updateProfile as updateProfileService } from "../services/profileService.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await getProfileService(req.user._id);
  res.json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updates = {};
  const allowed = ["name", "email"];
  allowed.forEach((k) => {
    if (req.body[k] !== undefined) updates[k] = req.body[k];
  });

  const user = await updateProfileService(req.user._id, updates);
  res.json({ user });
});
