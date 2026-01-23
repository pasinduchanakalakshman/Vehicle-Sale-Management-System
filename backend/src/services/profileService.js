import ApiError from "../utils/ApiError.js";
import { findById, updateById } from "../repositories/userRepository.js";

export const getProfile = async (userId) => {
  const user = await findById(userId).select("-password");
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

export const updateProfile = async (userId, updates) => {
  const user = await updateById(userId, updates);
  if (!user) throw new ApiError(404, "User not found");
  return user;
};
