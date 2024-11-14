import mongoose from 'mongoose';

// Destructure required components from the mongoose default import
const { Schema, model, models } = mongoose;

// Define the schema
const mediaItemSchema = new Schema({
  title: {
    type: String,
    required: true,  // Name of the publication
  },
  category: {
    type: String,
    required: true,  // Category of the publication (e.g., Newspaper, Magazine, etc.)
    enum: ['Newspaper', 'Magazine', 'Journal', 'Other'],  // Can customize based on your needs
  },
  language: {
    type: String,
    required: true,  // Language of publication (e.g., English, Hindi, Spanish)
    enum: ['English', 'Hindi', 'Spanish', 'French', 'Other'],  // Add more languages as needed
  },
  frequency: {
    type: String,
    required: true,  // Frequency of publication (e.g., Daily, Weekly, Monthly)
    enum: ['Daily', 'Weekly', 'Monthly'],
  },
  country: {
    type: String,
    required: true,  // Country where the publication is based
  },
  price: {
    type: Number,
    required: true,  // Price of the publication (e.g., in USD or other currency)
  },
  sortBy: {
    type: String,
    required: true,  // How the data should be sorted (e.g., by price, frequency, etc.)
    enum: ['price', 'frequency', 'date'],  // Sorting options can be customized
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically assigns the current date and time when the record is created
  },
});

// Check if the model already exists to avoid overwriting
const MediaItem = models.MediaItem || model('MediaItem', mediaItemSchema);

export default MediaItem;
