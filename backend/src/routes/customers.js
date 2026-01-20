import express from "express";
import { getProfile, updateProfile } from "../controllers/customerController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authenticate, authorize("customer"), getProfile);
router.put("/me", authenticate, authorize("customer"), updateProfile);

export default router;
