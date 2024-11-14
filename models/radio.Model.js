import mongoose from 'mongoose';

// Define the Radio schema
const radioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  stationOrTier: {
    type: String,
    enum: ['Station', 'Tier'], // Ensures only 'Station' or 'Tier' is allowed
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Initialize the Radio model
const Radio = mongoose.model('Radio', radioSchema);

export default Radio;
