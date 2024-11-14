import mongoose from 'mongoose';
import Radio from '../models/radio.Model.js'; // Path to your Radio model
import { ApiResponse } from "../utiles/api.Response.js"; // Import ApiResponse
import { ApiError } from "../utiles/apiErrors.js"; // Import ApiError
import { asyncHandler } from "../utiles/asynHandller.js"; // Import asyncHandler

// Controller to get all radios with optional filters
const getRadios = asyncHandler(async (req, res, next) => {
  const { location, language, targetAudience, price } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (location) filter.location = location;
  if (language) filter.language = language;
  if (targetAudience) filter.targetAudience = targetAudience;
  if (price) filter.price = { $lte: price }; // Price less than or equal to the given price

  try {
    const radios = await Radio.find(filter); // Fetch radios matching the filter
    return res.status(200).json(new ApiResponse(200, radios, "Radios retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch radios", error.message));
  }
});

// Controller to get a single radio by its ID
const getRadioById = asyncHandler(async (req, res, next) => {
  const { radioId } = req.params;
  try {
    const radio = await Radio.findById(radioId); // Fetch radio by ID
    if (!radio) {
      return next(new ApiError(404, "Radio not found"));
    }
    return res.status(200).json(new ApiResponse(200, radio, "Radio retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch radio by ID", error.message));
  }
});

// Controller to create a new radio
const createRadio = asyncHandler(async (req, res, next) => {
  const { title, frequency, language, price, location, targetAudience, stationOrTier } = req.body;
  try {
    const newRadio = new Radio({
      title,
      frequency,
      language,
      price,
      location,
      targetAudience,
      stationOrTier,
    });

    await newRadio.save(); // Save the new radio to the database
    return res.status(201).json(new ApiResponse(201, newRadio, "Radio created successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to create radio", error.message));
  }
});

// Controller to update a radio by its ID
const updateRadio = asyncHandler(async (req, res, next) => {
  const { radioId } = req.params;
  const { title, frequency, language, price, location, targetAudience, stationOrTier } = req.body;

  // Check if radioId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(radioId)) {
    return next(new ApiError(400, "Invalid radio ID"));
  }

  try {
    const updatedRadio = await Radio.findByIdAndUpdate(
      radioId,
      { title, frequency, language, price, location, targetAudience, stationOrTier },
      { new: true } // Return the updated radio
    );
    if (!updatedRadio) {
      return next(new ApiError(404, "Radio not found"));
    }
    return res.status(200).json(new ApiResponse(200, updatedRadio, "Radio updated successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to update radio", error.message));
  }
});

// Controller to delete a radio by its ID
const deleteRadio = asyncHandler(async (req, res, next) => {
  const { radioId } = req.params;

  // Check if radioId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(radioId)) {
    return next(new ApiError(400, "Invalid radio ID"));
  }

  try {
    const deletedRadio = await Radio.findByIdAndDelete(radioId);
    if (!deletedRadio) {
      return next(new ApiError(404, "Radio not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "Radio deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to delete radio", error.message));
  }
});

export { getRadios, getRadioById, createRadio, updateRadio, deleteRadio };
