import ApiError from "../utils/ApiError.js";

export const notFound = (_req, _res, next) => {
  next(new ApiError(404, "Route not found"));
};

export const errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server error" });
};
