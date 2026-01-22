import express from "express";
import { listVehicles } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", listVehicles);

export default router;
