import express from "express";
import { getOverview } from "../controllers/adminController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

router.get("/overview", authenticate, authorize("admin"), getOverview);

export default router;
