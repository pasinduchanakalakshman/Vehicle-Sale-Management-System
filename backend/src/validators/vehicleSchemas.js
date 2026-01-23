import { z } from "zod";

export const createVehicleSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  vehicleType: z.string().min(1),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().min(0),
  mileage: z.number().min(0).optional(),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid", "other"]).optional(),
  transmission: z.enum(["auto", "manual", "cvt", "other"]).optional(),
  condition: z.enum(["new", "used"]),
  showroomLocation: z.string().min(1),
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).optional(),
  ownerCount: z.number().int().min(0).optional(),
  isBrandNew: z.boolean().optional(),
  status: z.enum(["available", "sold"]).optional(),
});
