import mongoose from 'mongoose';

const btlSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Event', 'Direct Mail', 'Promotions', 'Sponsorship', 'Sampling'], // Example BTL types
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model
const BTL = mongoose.model('BTL', btlSchema);

export default BTL;
