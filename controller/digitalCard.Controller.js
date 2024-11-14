import mongoose from 'mongoose';
import Item from "../models/digital.Model.js"; // Assuming the model is saved as item.Model.js
import { ApiResponse } from "../utiles/api.Response.js"; // Import ApiResponse
import { ApiError } from "../utiles/apiErrors.js"; // Import ApiError
import { asyncHandler } from "../utiles/asynHandller.js"; // Import asyncHandler

// Controller to get all items with optional filters
const getItems = asyncHandler(async (req, res, next) => {
  const { category, language, priceModel, minPrice, maxPrice } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (category) filter.category = category;
  if (language) filter.language = language;
  if (priceModel) filter.priceModel = priceModel;
  if (minPrice) filter.price = { ...filter.price, $gte: minPrice }; // Price >= minPrice
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice }; // Price <= maxPrice

  try {
    const items = await Item.find(filter); // Fetch items matching the filter
    return res.status(200).json(new ApiResponse(200, items, "Items retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch items", error.message));
  }
});

// Controller to get a single item by its ID
const getItemById = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await Item.findById(itemId); // Fetch item by ID
    if (!item) {
      return next(new ApiError(404, "Item not found"));
    }
    return res.status(200).json(new ApiResponse(200, item, "Item retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch item by ID", error.message));
  }
});

// Controller to create a new item
const createItem = asyncHandler(async (req, res, next) => {
  const { category, language, price, priceModel, title, description,imgAddress } = req.body;
  try {
    const newItem = new Item({ category, language, price, priceModel, title, description,imgAddress});
    await newItem.save(); // Save the new item to the database
    return res.status(201).json(new ApiResponse(201, newItem, "Item created successfully"));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Failed to create item", error.message));
  }
});

// Controller to update an item by its ID
const updateItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  const { category, language, price, priceModel, title, description, releaseDate, rating } = req.body;

  // Check if itemId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new ApiError(400, "Invalid item ID"));
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { category, language, price, priceModel, title, description, releaseDate, rating },
      { new: true } // Return the updated item
    );
    if (!updatedItem) {
      return next(new ApiError(404, "Item not found"));
    }
    return res.status(200).json(new ApiResponse(200, updatedItem, "Item updated successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to update item", error.message));
  }
});

// Controller to delete an item by its ID
const deleteItem = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;

  // Check if itemId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new ApiError(400, "Invalid item ID"));
  }

  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return next(new ApiError(404, "Item not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "Item deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to delete item", error.message));
  }
});

export { getItems, getItemById, createItem, updateItem, deleteItem };
