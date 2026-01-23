import express from "express";
import { createVehicle, listVehicles } from "../controllers/vehicleController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { createVehicleSchema } from "../validators/vehicleSchemas.js";

const router = express.Router();

router.get("/", listVehicles);
router.post("/", authenticate, authorize("admin"), validate(createVehicleSchema), createVehicle);

export default router;
