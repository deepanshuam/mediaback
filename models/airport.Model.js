import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
    trim: true, // Trim any extra spaces from the title
  },
  type: {
    type: String,
    required: true, // Type is required
    enum: ['Domestic', 'International'], // Possible values for type
  },
  location: {
    type: String,
    required: true, // Location is required
    trim: true, // Trim any extra spaces from the location
  },
  price: {
    type: Number,
    required: true, // Price is required
    min: 0, // Price cannot be negative
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Airport = mongoose.model('Airport', airportSchema);

export default Airport;
