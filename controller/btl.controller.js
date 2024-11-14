import mongoose from 'mongoose';
import BTL from '../models/btl.Model.js'; // Import the BTL model
import { ApiResponse } from "../utiles/api.Response.js"; // Import ApiResponse
import { ApiError } from "../utiles/apiErrors.js"; // Import ApiError
import { asyncHandler } from "../utiles/asynHandller.js"; // Import asyncHandler

// Controller to get all BTL media with optional filters
const getBTLs = asyncHandler(async (req, res, next) => {
  const { title, location, type, minPrice, maxPrice } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (type) filter.type = { $regex: type, $options: 'i' };
  if (minPrice) filter.price = { $gte: minPrice }; // Greater than or equal to minPrice
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice }; // Less than or equal to maxPrice

  try {
    const btls = await BTL.find(filter); // Fetch BTLs matching the filter
    return res.status(200).json(new ApiResponse(200, btls, "BTL media retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch BTL media", error.message));
  }
});

// Controller to get a single BTL media by its ID
const getBTLById = asyncHandler(async (req, res, next) => {
  const { btlId } = req.params;

  // Check if the BTL ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(btlId)) {
    return next(new ApiError(400, "Invalid BTL ID"));
  }

  try {
    const btl = await BTL.findById(btlId); // Fetch BTL by ID
    if (!btl) {
      return next(new ApiError(404, "BTL media not found"));
    }
    return res.status(200).json(new ApiResponse(200, btl, "BTL media retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch BTL media by ID", error.message));
  }
});

// Controller to create a new BTL media
const createBTL = asyncHandler(async (req, res, next) => {
  const { title, location, type, price } = req.body;

  try {
    const newBTL = new BTL({
      title,
      location,
      type,
      price,
    });

    await newBTL.save(); // Save the new BTL to the database
    return res.status(201).json(new ApiResponse(201, newBTL, "BTL media created successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to create BTL media", error.message));
  }
});

// Controller to update a BTL media by its ID
const updateBTL = asyncHandler(async (req, res, next) => {
  const { btlId } = req.params;
  const { title, location, type, price } = req.body;

  // Check if the BTL ID is valid
  if (!mongoose.Types.ObjectId.isValid(btlId)) {
    return next(new ApiError(400, "Invalid BTL ID"));
  }

  try {
    const updatedBTL = await BTL.findByIdAndUpdate(
      btlId,
      { title, location, type, price },
      { new: true } // Return the updated BTL
    );
    if (!updatedBTL) {
      return next(new ApiError(404, "BTL media not found"));
    }
    return res.status(200).json(new ApiResponse(200, updatedBTL, "BTL media updated successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to update BTL media", error.message));
  }
});

// Controller to delete a BTL media by its ID
const deleteBTL = asyncHandler(async (req, res, next) => {
  const { btlId } = req.params;

  // Check if the BTL ID is valid
  if (!mongoose.Types.ObjectId.isValid(btlId)) {
    return next(new ApiError(400, "Invalid BTL ID"));
  }

  try {
    const deletedBTL = await BTL.findByIdAndDelete(btlId);
    if (!deletedBTL) {
      return next(new ApiError(404, "BTL media not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "BTL media deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to delete BTL media", error.message));
  }
});

export { getBTLs, getBTLById, createBTL, updateBTL, deleteBTL };
