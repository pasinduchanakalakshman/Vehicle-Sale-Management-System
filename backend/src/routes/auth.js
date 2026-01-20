import express from "express";
import { login, register, createUserByAdmin } from "../controllers/authController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/users", authenticate, authorize("admin"), createUserByAdmin);

export default router;
