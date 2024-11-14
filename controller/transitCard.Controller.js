import Transit from '../models/transit.Model.js';  // Import the Transit model
import { ApiResponse } from '../utiles/api.Response.js'; // Import ApiResponse utility
import { ApiError } from '../utiles/apiErrors.js'; // Import ApiError utility
import { asyncHandler } from '../utiles/asynHandller.js'; // Import asyncHandler utility

// Controller to get all transit items
const getTransits = asyncHandler(async (req, res, next) => {
  const { location, mediaType, tyre, minPrice, maxPrice } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (location) filter.location = location;
  if (mediaType) filter.mediaType = mediaType;
  if (tyre) filter.tyre = tyre;
  if (minPrice) filter.price = { ...filter.price, $gte: minPrice }; // Price >= minPrice
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice }; // Price <= maxPrice

  try {
    const transits = await Transit.find(filter); // Fetch transits matching the filter
    return res.status(200).json(new ApiResponse(200, transits, 'Transits retrieved successfully'));
  } catch (error) {
    return next(new ApiError(500, 'Failed to fetch transits', error.message));
  }
});

// Controller to get a single transit item by ID
const getTransitById = asyncHandler(async (req, res, next) => {
  const { transitId } = req.params;

  try {
    const transit = await Transit.findById(transitId); // Fetch transit by ID
    if (!transit) {
      return next(new ApiError(404, 'Transit not found'));
    }
    return res.status(200).json(new ApiResponse(200, transit, 'Transit retrieved successfully'));
  } catch (error) {
    return next(new ApiError(500, 'Failed to fetch transit by ID', error.message));
  }
});

// Controller to create a new transit
const createTransit = asyncHandler(async (req, res, next) => {
  const { title, mediaType, location, tyre, price } = req.body;

  try {
    const newTransit = new Transit({ title, mediaType, location, tyre, price });
    await newTransit.save(); // Save the new transit to the database
    return res.status(201).json(new ApiResponse(201, newTransit, 'Transit created successfully'));
  } catch (error) {
    return next(new ApiError(500, 'Failed to create transit', error.message));
  }
});

// Controller to update an existing transit by ID
const updateTransit = asyncHandler(async (req, res, next) => {
  const { transitId } = req.params;
  const { title, mediaType, location, tyre, price } = req.body;

  // Check if transitId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(transitId)) {
    return next(new ApiError(400, 'Invalid transit ID'));
  }

  try {
    const updatedTransit = await Transit.findByIdAndUpdate(
      transitId,
      { title, mediaType, location, tyre, price },
      { new: true } // Return the updated transit
    );
    if (!updatedTransit) {
      return next(new ApiError(404, 'Transit not found'));
    }
    return res.status(200).json(new ApiResponse(200, updatedTransit, 'Transit updated successfully'));
  } catch (error) {
    return next(new ApiError(500, 'Failed to update transit', error.message));
  }
});

// Controller to delete a transit by its ID
const deleteTransit = asyncHandler(async (req, res, next) => {
  const { transitId } = req.params;

  // Check if transitId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(transitId)) {
    return next(new ApiError(400, 'Invalid transit ID'));
  }

  try {
    const deletedTransit = await Transit.findByIdAndDelete(transitId);
    if (!deletedTransit) {
      return next(new ApiError(404, 'Transit not found'));
    }
    return res.status(200).json(new ApiResponse(200, null, 'Transit deleted successfully'));
  } catch (error) {
    return next(new ApiError(500, 'Failed to delete transit', error.message));
  }
});

export { getTransits, getTransitById, createTransit, updateTransit, deleteTransit };
