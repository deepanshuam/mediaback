import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../controller/enquiry.Controller.js"; // adjust the path if necessary

const router = express.Router();

// Route to create a new enquiry
router.post("/enquiries", createEnquiry);

// Route to get all enquiries
router.get("/enquiries", getAllEnquiries);

// Route to get a specific enquiry by ID
router.get("/enquiries/:id", getEnquiryById);

// Route to update an enquiry by ID
router.put("/enquiries/:id", updateEnquiry);

// Route to delete an enquiry by ID
router.delete("/enquiries/:id", deleteEnquiry);

export default router;
