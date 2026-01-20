import express from "express";
import { getProfile, updateProfile } from "../controllers/managerController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authenticate, authorize("manager"), getProfile);
router.put("/me", authenticate, authorize("manager"), updateProfile);

export default router;
