import express from "express";
import { getProfile, updateProfile } from "../controllers/ownerController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/me", authenticate, authorize("owner"), getProfile);
router.put("/me", authenticate, authorize("owner"), updateProfile);

export default router;
