import mongoose from 'mongoose';

const outdoorSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  illumination: {
    type: Boolean,
    required: [true, 'Illumination status is required'],
  },
  landmark: {
    type: String,
    required: [true, 'Landmark is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  mediaType: {
    type: String,
    required: [true, 'Media type is required'],
    enum: ['Digital', 'Print', 'Outdoor'],  // Assuming media types (adjust as needed)
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Outdoor = mongoose.model('Outdoor', outdoorSchema);

export default Outdoor;
