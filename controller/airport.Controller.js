import Airport from '../models/airport.Model.js'; // Import Airport model
import { ApiResponse } from "../utiles/api.Response.js"; // Assuming ApiResponse is stored here
import { ApiError } from "../utiles/apiErrors.js"; // Assuming ApiError is stored here
import { asyncHandler } from "../utiles/asynHandller.js"; // Assuming asyncHandler is stored here

// Controller to get all airports with optional filters
const getAirports = asyncHandler(async (req, res, next) => {
  const { title, type, location, price } = req.query;

  // Construct filter object based on query parameters
  const filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search for title
  if (type) filter.type = type;
  if (location) filter.location = { $regex: location, $options: 'i' }; // Case-insensitive search for location
  if (price) filter.price = { $lte: price }; // Price less than or equal to the given price

  try {
    const airports = await Airport.find(filter); // Fetch airports matching the filter
    return res.status(200).json(new ApiResponse(200, airports, "Airports retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch airports", error.message));
  }
});

// Controller to get a single airport by its ID
const getAirportById = asyncHandler(async (req, res, next) => {
  const { airportId } = req.params;
  try {
    const airport = await Airport.findById(airportId); // Fetch airport by ID
    if (!airport) {
      return next(new ApiError(404, "Airport not found"));
    }
    return res.status(200).json(new ApiResponse(200, airport, "Airport retrieved successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch airport by ID", error.message));
  }
});

// Controller to create a new airport
const createAirport = asyncHandler(async (req, res, next) => {
  const { title, type, location, price } = req.body;
  try {
    const newAirport = new Airport({
      title,
      type,
      location,
      price
    });

    await newAirport.save(); // Save the new airport to the database
    return res.status(201).json(new ApiResponse(201, newAirport, "Airport created successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to create airport", error.message));
  }
});

// Controller to update an airport by its ID
const updateAirport = asyncHandler(async (req, res, next) => {
  const { airportId } = req.params;
  const { title, type, location, price } = req.body;

  // Check if airportId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(airportId)) {
    return next(new ApiError(400, "Invalid airport ID"));
  }

  try {
    const updatedAirport = await Airport.findByIdAndUpdate(
      airportId,
      { title, type, location, price },
      { new: true } // Return the updated airport
    );
    if (!updatedAirport) {
      return next(new ApiError(404, "Airport not found"));
    }
    return res.status(200).json(new ApiResponse(200, updatedAirport, "Airport updated successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to update airport", error.message));
  }
});

// Controller to delete an airport by its ID
const deleteAirport = asyncHandler(async (req, res, next) => {
  const { airportId } = req.params;

  // Check if airportId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(airportId)) {
    return next(new ApiError(400, "Invalid airport ID"));
  }

  try {
    const deletedAirport = await Airport.findByIdAndDelete(airportId);
    if (!deletedAirport) {
      return next(new ApiError(404, "Airport not found"));
    }
    return res.status(200).json(new ApiResponse(200, null, "Airport deleted successfully"));
  } catch (error) {
    return next(new ApiError(500, "Failed to delete airport", error.message));
  }
});

export { getAirports, getAirportById, createAirport, updateAirport, deleteAirport };
