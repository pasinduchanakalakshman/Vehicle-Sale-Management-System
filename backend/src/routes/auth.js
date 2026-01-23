import express from "express";
import { login, register, createUserByAdmin } from "../controllers/authController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema, createUserSchema } from "../validators/authSchemas.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/users", authenticate, authorize("admin"), validate(createUserSchema), createUserByAdmin);

export default router;
