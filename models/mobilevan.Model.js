// models/mobileVan.js
import mongoose from 'mongoose';

const mobileVanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Title of the mobile van service
  },
  type: {
    type: String,
    required: true,  // Type of service (e.g., Food Truck, Mobile Clinic)
    enum: ['Food Truck', 'Mobile Clinic', 'Marketing Van', 'Other'],  // Add types as needed
  },
  location: {
    type: String,
    required: true,  // Location where the van operates
  },
  price: {
    type: Number,
    required: true,  // Price of the service per day/hour/etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the date when the record is created
  }
});

const MobileVan = mongoose.model('MobileVan', mobileVanSchema);
export default MobileVan;
