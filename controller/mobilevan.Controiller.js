import MobileVan from '../models/mobilevan.Model.js';
import { ApiResponse } from '../utiles/api.Response.js'; // Assumes a standard response helper
import { ApiError } from '../utiles/apiErrors.js'; // Assumes a custom error handling utility
import { asyncHandler } from "../utiles/asynHandller.js"; // Import asyncHandler

// Controller to get all Mobile Vans with optional filters
const getMobileVans = asyncHandler(async (req, res, next) => {
  const { title, type, location, minPrice, maxPrice } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
  if (type) filter.type = type;
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (minPrice) filter.price = { $gte: minPrice }; // Greater than or equal to minPrice
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice }; // Less than or equal to maxPrice

  const vans = await MobileVan.find(filter); // Fetch Mobile Vans matching the filter
  return res.status(200).json(new ApiResponse(200, vans, "Mobile Vans retrieved successfully"));
});

// Controller to get a single Mobile Van by ID
const getMobileVanById = asyncHandler(async (req, res, next) => {
  const { vanId } = req.params;

  const van = await MobileVan.findById(vanId);
  if (!van) {
    return next(new ApiError(404, "Mobile Van not found"));
  }
  return res.status(200).json(new ApiResponse(200, van, "Mobile Van retrieved successfully"));
});

// Controller to create a new Mobile Van
const createMobileVan = asyncHandler(async (req, res, next) => {
  const { title, type, location, price } = req.body;

  const newVan = new MobileVan({
    title,
    type,
    location,
    price,
  });

  await newVan.save();
  return res.status(201).json(new ApiResponse(201, newVan, "Mobile Van created successfully"));
});

// Controller to update a Mobile Van by ID
const updateMobileVan = asyncHandler(async (req, res, next) => {
  const { vanId } = req.params;
  const { title, type, location, price } = req.body;

  const updatedVan = await MobileVan.findByIdAndUpdate(
    vanId,
    { title, type, location, price },
    { new: true }
  );
  if (!updatedVan) {
    return next(new ApiError(404, "Mobile Van not found"));
  }
  return res.status(200).json(new ApiResponse(200, updatedVan, "Mobile Van updated successfully"));
});

// Controller to delete a Mobile Van by ID
const deleteMobileVan = asyncHandler(async (req, res, next) => {
  const { vanId } = req.params;

  const deletedVan = await MobileVan.findByIdAndDelete(vanId);
  if (!deletedVan) {
    return next(new ApiError(404, "Mobile Van not found"));
  }
  return res.status(200).json(new ApiResponse(200, null, "Mobile Van deleted successfully"));
});

export {
  getMobileVans,
  getMobileVanById,
  createMobileVan,
  updateMobileVan,
  deleteMobileVan,
};
