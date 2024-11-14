

import MetroTrain from '../models/metrotrain.Model.js';
import { ApiResponse } from '../utiles/api.Response.js'; // Import your response helper
import { ApiError } from '../utiles/apiErrors.js'; // Import your custom error handler
import { asyncHandler } from '../utiles/asynHandller.js'; // Import asyncHandler

// Controller to get all MetroTrains with optional filters
const getMetroTrains = asyncHandler(async (req, res, next) => {
  const { title, location, minPrice, maxPrice } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' };
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (minPrice) filter.price = { $gte: minPrice };
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };

  const metroTrains = await MetroTrain.find(filter);
  res.status(200).json(new ApiResponse(200, metroTrains, "MetroTrains retrieved successfully"));
});

// Controller to get a single MetroTrain by ID
const getMetroTrainById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const metroTrain = await MetroTrain.findById(id);

  if (!metroTrain) {
    return next(new ApiError(404, "MetroTrain not found"));
  }
  res.status(200).json(new ApiResponse(200, metroTrain, "MetroTrain retrieved successfully"));
});

// Controller to create a new MetroTrain
const createMetroTrain = asyncHandler(async (req, res, next) => {
  const { title, location, price } = req.body;
  const newMetroTrain = new MetroTrain({ title, location, price });

  await newMetroTrain.save();
  res.status(201).json(new ApiResponse(201, newMetroTrain, "MetroTrain created successfully"));
});

// Controller to update a MetroTrain by ID
const updateMetroTrain = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, location, price } = req.body;

  const updatedMetroTrain = await MetroTrain.findByIdAndUpdate(
    id,
    { title, location, price },
    { new: true }
  );

  if (!updatedMetroTrain) {
    return next(new ApiError(404, "MetroTrain not found"));
  }
  res.status(200).json(new ApiResponse(200, updatedMetroTrain, "MetroTrain updated successfully"));
});

// Controller to delete a MetroTrain by ID
const deleteMetroTrain = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedMetroTrain = await MetroTrain.findByIdAndDelete(id);

  if (!deletedMetroTrain) {
    return next(new ApiError(404, "MetroTrain not found"));
  }
  res.status(200).json(new ApiResponse(200, null, "MetroTrain deleted successfully"));
});

export {
  getMetroTrains,
  getMetroTrainById,
  createMetroTrain,
  updateMetroTrain,
  deleteMetroTrain,
};
