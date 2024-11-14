import { Enquiry } from "../models/enquiry.Model.js"; // adjust the import path as needed
import { ApiError } from "../utiles/apiErrors.js";
import { ApiResponse } from "../utiles/api.Response.js";
import { asyncHandler } from "../utiles/asynHandller.js";

// Controller to create a new enquiry
export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phoneNo, city, message, companyName } = req.body;

  // Check for missing fields
  if (!name || !email || !phoneNo || !city || !message || !companyName) {
    throw new ApiError(400, "All fields are required");
  }

  // Validate phone number format
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNo)) {
    throw new ApiError(400, "Invalid phone number format");
  }

  // Create a new enquiry
  const enquiry = await Enquiry.create({
    name,
    email,
    phoneNo,
    city,
    message,
    companyName,
  });

  // Respond with the created enquiry
  res.status(201).json(new ApiResponse(201, enquiry, "Enquiry created successfully"));
});

// Controller to get all enquiries
export const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find();

  res.status(200).json(new ApiResponse(200, enquiries, "Enquiries fetched successfully"));
});

// Controller to get a single enquiry by ID
export const getEnquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  res.status(200).json(new ApiResponse(200, enquiry, "Enquiry fetched successfully"));
});

// Controller to update an enquiry by ID
export const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNo, city, message, companyName } = req.body;

  const updatedEnquiry = await Enquiry.findByIdAndUpdate(
    id,
    { name, email, phoneNo, city, message, companyName },
    { new: true, runValidators: true }
  );

  if (!updatedEnquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  res.status(200).json(new ApiResponse(200, updatedEnquiry, "Enquiry updated successfully"));
});

// Controller to delete an enquiry by ID
export const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const enquiry = await Enquiry.findByIdAndDelete(id);

  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "Enquiry deleted successfully"));
});
