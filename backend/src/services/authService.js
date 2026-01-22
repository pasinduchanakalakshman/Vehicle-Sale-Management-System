import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { createUser, findByEmail } from "../repositories/userRepository.js";

const signToken = (user) => {
  const payload = { sub: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerCustomer = async ({ name, email, password }) => {
  const existing = await findByEmail(email);
  if (existing) throw new ApiError(400, "Email already in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashed, role: "customer" });

  const token = signToken(user);
  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) throw new ApiError(400, "Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ApiError(400, "Invalid credentials");

  const token = signToken(user);
  return { user, token };
};

export const createUserAsAdmin = async ({ name, email, password, role }) => {
  const existing = await findByEmail(email);
  if (existing) throw new ApiError(400, "Email already in use");

  const allowedRoles = ["admin", "owner", "manager", "customer"];
  const finalRole = allowedRoles.includes(role) ? role : "customer";

  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser({ name, email, password: hashed, role: finalRole });
  return { user };
};
