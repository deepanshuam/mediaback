import MediaItem from '../models/magazines.Models.js';  // Import the MediaItem model
import { ApiResponse } from "../utiles/api.Response.js";  // Assuming ApiResponse is stored here
import { ApiError } from "../utiles/apiErrors.js";  // Assuming ApiError is stored here
import { asyncHandler } from "../utiles/asynHandller.js";  // Assuming asyncHandler is stored here

// Controller to get all media items with optional filters
const getMediaItems = asyncHandler(async (req, res, next) => {
  const { category, language, frequency, country, price, sortBy } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (category) filter.category = category;
  if (language) filter.language = language;
  if (frequency) filter.frequency = frequency;
  if (country) filter.country = country;
  if (price) filter.price = { $lte: price };  // Price less than or equal to the given price

  // Sorting condition
  const sortCondition = {};
  if (sortBy) {
    switch (sortBy) {
      case 'price':
        sortCondition.price = 1;  // Ascending price
        break;
      case 'frequency':
        sortCondition.frequency = 1;  // Ascending frequency
        break;
      case 'date':
        sortCondition.createdAt = 1;  // Ascending date
        break;
      default:
        sortCondition.createdAt = -1;  // Default sort by createdAt descending
    }
  } else {
    sortCondition.createdAt = -1;  // Default sort by createdAt descending
  }

  try {
    const mediaItems = await MediaItem.find(filter).sort(sortCondition);  // Fetch media items matching the filter and sort conditions
    return res.status(200).json(new ApiResponse(200, mediaItems, "Media items retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch media items", error.message));
  }
});

// Controller to get a single media item by its ID
const getMediaItemById = asyncHandler(async (req, res, next) => {
  const { mediaItemId } = req.params;
  try {
    const mediaItem = await MediaItem.findById(mediaItemId);  // Fetch media item by ID
    if (!mediaItem) {
      return next(new ApiError(404, "Media item not found"));
    }
    return res.status(200).json(new ApiResponse(200, mediaItem, "Media item retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch media item by ID", error.message));
  }
});

// Controller to create a new media item
const createMediaItem = asyncHandler(async (req, res, next) => {
  const { title, category, language, frequency, country, price, sortBy } = req.body;
  try {
    const newMediaItem = new MediaItem({
      title,
      category,
      language,
      frequency,
      country,
      price,
      sortBy,
    });

    await newMediaItem.save();  // Save the new media item to the database
    return res.status(201).json(new ApiResponse(201, newMediaItem, "Media item created successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to create media item", error.message));
  }
});

// Controller to update an existing media item by its ID
const updateMediaItem = asyncHandler(async (req, res, next) => {
  const { mediaItemId } = req.params;
  const { title, category, language, frequency, country, price, sortBy } = req.body;

  try {
    const updatedMediaItem = await MediaItem.findByIdAndUpdate(
      mediaItemId,
      { title, category, language, frequency, country, price, sortBy },
      { new: true }  // Return the updated media item
    );
    if (!updatedMediaItem) {
      return next(new ApiError(404, "Media item not found"));
    }
    return res.status(200).json(new ApiResponse(200, updatedMediaItem, "Media item updated successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to update media item", error.message));
  }
});

// Controller to delete a media item by its ID
const deleteMediaItem = asyncHandler(async (req, res, next) => {
  const { mediaItemId } = req.params;

  try {
    const deletedMediaItem = await MediaItem.findByIdAndDelete(mediaItemId);
    if (!deletedMediaItem) {
      return next(new ApiError(404, "Media item not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "Media item deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to delete media item", error.message));
  }
});

export { getMediaItems, getMediaItemById, createMediaItem, updateMediaItem, deleteMediaItem };
