import mongoose from 'mongoose';

const transitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title of the transit item
  },
  mediaType: {
    type: String,
    required: true, // Type of media (e.g., "Radio", "Television", etc.)
    enum: ['Radio', 'Television', 'Online', 'Print', 'Other'], // Example of allowed values
  },
  location: {
    type: String,
    required: true, // Location where the transit service is available
  },
  tyre: {
    type: String,
    required: true, // Type of tyre (could be a string such as "Radial", "Bias Ply", etc.)
  },
  price: {
    type: Number,
    required: true, // Price of the transit service
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create a model using the schema
const Transit = mongoose.model('Transit', transitSchema);

export default Transit;
