import mongoose from 'mongoose';

// Define the schema for Newspaper
const newsSchema = new mongoose. Schema({
  title: {
    type: String,
    required: true,  // Name of the newspaper
  },
  location: {
    type: String,
    required: true,  // Location where the newspaper is published (e.g., city, country)
  },
  language: {
    type: String,
    required: true,  // Language of publication (e.g., English, Hindi, Spanish)
    enum: ['English', 'Hindi', 'Spanish', 'French', 'Other'],  // Add languages based on your requirement
  },
  price: {
    type: Number,
    required: true,  // Price of the newspaper (e.g., in USD or other currency)
  },
  publicationFrequency: {
    type: String,
    required: true,  // Frequency of publication (e.g., Daily, Weekly, Monthly)
    enum: ['Daily', 'Weekly', 'Monthly'],
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically assigns current date and time when the record is created
  },
});

// Check if the model already exists in mongoose.models
const News = mongoose.model('News', newsSchema);

export default News;
