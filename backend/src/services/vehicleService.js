import { countVehicles, createVehicle, findVehicles } from "../repositories/vehicleRepository.js";

const toNumber = (value) => (value === undefined ? undefined : Number(value));

export const searchVehicles = async (query) => {
  const filter = { status: "available" };

  if (query.brand) filter.brand = { $regex: query.brand, $options: "i" };
  if (query.vehicleType) filter.vehicleType = { $regex: query.vehicleType, $options: "i" };
  if (query.model) filter.model = { $regex: query.model, $options: "i" };
  if (query.year) filter.year = toNumber(query.year);
  if (query.fuelType) filter.fuelType = query.fuelType;
  if (query.condition) filter.condition = query.condition;
  if (query.showroomLocation) filter.showroomLocation = { $regex: query.showroomLocation, $options: "i" };
  if (query.isBrandNew !== undefined) filter.isBrandNew = query.isBrandNew === "true";

  if (query.ownerCount !== undefined) {
    filter.ownerCount = toNumber(query.ownerCount);
  } else if (query.minOwnerCount || query.maxOwnerCount) {
    filter.ownerCount = {};
    if (query.minOwnerCount) filter.ownerCount.$gte = toNumber(query.minOwnerCount);
    if (query.maxOwnerCount) filter.ownerCount.$lte = toNumber(query.maxOwnerCount);
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = toNumber(query.minPrice);
    if (query.maxPrice) filter.price.$lte = toNumber(query.maxPrice);
  }

  if (query.minMileage || query.maxMileage) {
    filter.mileage = {};
    if (query.minMileage) filter.mileage.$gte = toNumber(query.minMileage);
    if (query.maxMileage) filter.mileage.$lte = toNumber(query.maxMileage);
  }

  const sortMap = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    year_asc: { year: 1 },
    year_desc: { year: -1 },
    newest: { createdAt: -1 },
  };

  const sort = sortMap[query.sort] || { createdAt: -1 };
  const page = Math.max(toNumber(query.page) || 1, 1);
  const limit = Math.min(Math.max(toNumber(query.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([findVehicles(filter, sort, skip, limit), countVehicles(filter)]);

  return { items, total, page, limit };
};

export const createVehicleListing = async (payload) => {
  const data = {
    brand: payload.brand,
    model: payload.model,
    vehicleType: payload.vehicleType,
    year: payload.year,
    price: payload.price,
    mileage: payload.mileage ?? 0,
    fuelType: payload.fuelType ?? "other",
    transmission: payload.transmission ?? "other",
    condition: payload.condition,
    showroomLocation: payload.showroomLocation,
    description: payload.description,
    images: payload.images ?? [],
    ownerCount: payload.ownerCount ?? 0,
    isBrandNew: payload.isBrandNew ?? false,
    status: payload.status ?? "available",
  };

  return createVehicle(data);
};
