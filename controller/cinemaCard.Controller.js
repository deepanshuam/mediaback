import mongoose from 'mongoose'; // Import mongoose to use ObjectId validation
import Cinema from "../models/card.Model.js"; // Assuming you have a Cinema model
import { ApiResponse } from "../utiles/api.Response.js";  // Import ApiResponse
import { ApiError } from "../utiles/apiErrors.js";  // Import ApiError
import { asyncHandler } from "../utiles/asynHandller.js";  // Import asyncHandler

// Controller to get all cinemas
const getCinemas = asyncHandler(async (req, res, next) => {
    const {
      location, // Query parameter for location
      audienceClass, // Query parameter for audience class (Standard, VIP, Premium)
      cinemaChain, // Query parameter for cinema chain (e.g., AMC, Regal)
      screen, // Query parameter for screen (e.g., Screen 1, IMAX)
      tier, // Query parameter for tier preference
      minPrice, // Query parameter for minimum price
      maxPrice // Query parameter for maximum price
    } = req.query; // Extract query parameters from request
    
  
    // Construct filter object
    const filter = {};
    if (location) filter.location = location;
    if (audienceClass) filter.audienceClass = audienceClass;
    if (cinemaChain) filter.cinemaChain = cinemaChain;
    if (screen) filter.screen = screen;
    if (tier) filter.tier = tier; // Assuming you have a tier field in your Cinema schema
    if (minPrice) filter.price = { ...filter.price, $gte: minPrice }; // Price >= minPrice
    if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice }; // Price <= maxPrice
  
    try {
      const cinemas = await Cinema.find(filter); // Fetch cinemas matching the filter
      return res.status(200).json(new ApiResponse(200, cinemas)); // Send success response
    } catch (error) {
      return next(new ApiError(500, "Failed to fetch cinemas", error.message)); // Send error response
    }
  });
  

// Controller to get a single cinema by its ID
const getCinemaById = asyncHandler(async (req, res, next) => {
  const { cinemaId } = req.params;

  // Validate if cinemaId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(cinemaId)) {
    return next(new ApiError(400, "Invalid cinema ID"));
  }

  try {
    const cinema = await Cinema.findById(cinemaId); // Find the cinema by its ID
    if (!cinema) {
      return next(new ApiError(404, "Cinema not found"));
    }
    return res.status(200).json(new ApiResponse(200, cinema, "Cinema retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch cinema", error.message));
  }
});

// Controller to create a new cinema
const createCinema = asyncHandler(async (req, res, next) => {
  const { imgAddress, audienceClass, cinemaChain, screen, price,location } = req.body;
  try {
    const newCinema = new Cinema({ imgAddress, audienceClass, cinemaChain, screen, price,location });
    await newCinema.save(); // Save new cinema to the database
    return res.status(201).json(new ApiResponse(201, newCinema, "Cinema created successfully")); // Send success response
  } catch (error) {
    return next(new ApiError(500, "Failed to create cinema", error.message)); // Send error response
  }
});

// Controller to update a cinema
const updateCinema = asyncHandler(async (req, res, next) => {
  const { cinemaId } = req.params;
  const { imgAddress, audienceClass, cinemaChain, screen, price ,location} = req.body;

  // Check if cinemaId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cinemaId)) {
    return next(new ApiError(400, "Invalid cinema ID"));
  }

  try {
    const updatedCinema = await Cinema.findByIdAndUpdate(
      cinemaId,
      { imgAddress, audienceClass, cinemaChain, screen, price,location },
      { new: true } // Return the updated cinema
    );
    if (!updatedCinema) {
      return next(new ApiError(404, "Cinema not found")); // If cinema not found
    }
    return res.status(200).json(new ApiResponse(200, updatedCinema, "Cinema updated successfully"));
  } catch (error) {
    console.error("Error in updating cinema:", error); // Log the error
    return next(new ApiError(500, "Failed to update cinema", error.message));
  }
});

// Controller to delete a cinema
const deleteCinema = asyncHandler(async (req, res, next) => {
  const { cinemaId } = req.params;

  // Check if cinemaId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(cinemaId)) {
    return next(new ApiError(400, "Invalid cinema ID"));
  }

  try {
    const deletedCinema = await Cinema.findByIdAndDelete(cinemaId);
    if (!deletedCinema) {
      return next(new ApiError(404, "Cinema not found")); // If cinema not found
    }
    return res.status(200).json(new ApiResponse(200, null, "Cinema deleted successfully"));
  } catch (error) {
    console.error("Error in deleting cinema:", error); // Log the error
    return next(new ApiError(500, "Failed to delete cinema", error.message));
  }
});

export { getCinemas, getCinemaById, createCinema, updateCinema, deleteCinema };
