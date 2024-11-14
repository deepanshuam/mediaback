import Outdoor from '../models/outdoor.Model.js';
import { ApiResponse } from "../utiles/api.Response.js";  // Assuming your ApiResponse is stored here
import { ApiError } from "../utiles/apiErrors.js"; // Assuming your ApiError is stored here
import { asyncHandler } from "../utiles/asynHandller.js"; // Assuming asyncHandler is stored here

// Controller to get all outdoor media with filtering and sorting
const getOutdoors = asyncHandler(async (req, res, next) => {
  try {
    const { title, location, category, mediaType, price, sortBy, sortOrder } = req.query;

    // Build the filter object based on query parameters
    let filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };  // Case-insensitive search
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (category) filter.category = category;
    if (mediaType) filter.mediaType = mediaType;
    if (price) filter.price = price;

    // Sorting based on 'sortBy' and 'sortOrder' query params
    let sortCriteria = {};
    if (sortBy) {
      sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1; // Default to ascending (1), descending (-1)
    }

    const outdoors = await Outdoor.find(filter).sort(sortCriteria); // Fetch filtered and sorted outdoor media
    return res.status(200).json(new ApiResponse(200, outdoors, "Outdoor media retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch outdoor media", error.message));
  }
});

// Controller to get a single outdoor media by ID
const getOutdoorById = asyncHandler(async (req, res, next) => {
  const { outdoorId } = req.params;
  try {
    const outdoor = await Outdoor.findById(outdoorId); // Find the outdoor media by its ID
    if (!outdoor) {
      return next(new ApiError(404, "Outdoor media not found"));
    }
    return res.status(200).json(new ApiResponse(200, outdoor, "Outdoor media retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch outdoor media by ID", error.message));
  }
});

// Controller to create a new outdoor media
const createOutdoor = asyncHandler(async (req, res, next) => {
  const { title, illumination, landmark, location, mediaType, category, price } = req.body;
  try {
    const newOutdoor = new Outdoor({
      title,
      illumination,
      landmark,
      location,
      mediaType,
      category,
      price
    });
    await newOutdoor.save(); // Save the new outdoor media
    return res.status(201).json(new ApiResponse(201, newOutdoor, "Outdoor media created successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to create outdoor media", error.message));
  }
});

// Controller to update an existing outdoor media by ID
const updateOutdoor = asyncHandler(async (req, res, next) => {
  const { outdoorId } = req.params;
  const { title, illumination, landmark, location, mediaType, category, price } = req.body;

  try {
    const updatedOutdoor = await Outdoor.findByIdAndUpdate(
      outdoorId,
      { title, illumination, landmark, location, mediaType, category, price },
      { new: true } // Return the updated outdoor media
    );
    if (!updatedOutdoor) {
      return next(new ApiError(404, "Outdoor media not found"));
    }
    return res.status(200).json(new ApiResponse(200, updatedOutdoor, "Outdoor media updated successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to update outdoor media", error.message));
  }
});

// Controller to delete an outdoor media by ID
const deleteOutdoor = asyncHandler(async (req, res, next) => {
  const { outdoorId } = req.params;

  try {
    const deletedOutdoor = await Outdoor.findByIdAndDelete(outdoorId);
    if (!deletedOutdoor) {
      return next(new ApiError(404, "Outdoor media not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "Outdoor media deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to delete outdoor media", error.message));
  }
});

export { getOutdoors, getOutdoorById, createOutdoor, updateOutdoor, deleteOutdoor };
