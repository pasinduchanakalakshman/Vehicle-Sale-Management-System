import Vehicle from "../models/Vehicle.js";

export const findVehicles = (filter, sort, skip, limit) =>
  Vehicle.find(filter).sort(sort).skip(skip).limit(limit);

export const countVehicles = (filter) => Vehicle.countDocuments(filter);

export const createVehicle = (data) => Vehicle.create(data);
