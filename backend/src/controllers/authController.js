import { asyncHandler } from "../utils/asyncHandler.js";
import { registerCustomer, loginUser, createUserAsAdmin } from "../services/authService.js";

const mapUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await registerCustomer(req.body);
  res.status(201).json({ user: mapUser(user), token });
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await loginUser(req.body);
  res.json({ user: mapUser(user), token });
});

export const createUserByAdmin = asyncHandler(async (req, res) => {
  const { user } = await createUserAsAdmin(req.body);
  res.status(201).json({ user: mapUser(user) });
});
