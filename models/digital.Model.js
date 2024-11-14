import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Movie', 'Series', 'Documentary', 'Live Show'] // Add more categories as needed
  },
  language: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  priceModel: {
    type: String,
    required: true,
    enum: ['Single Purchase', 'Subscription', 'Rent', 'Free'] // Define pricing models as needed
  },
  imgAddress: {
    type: String,
    required: true // Image URL or path for content image
  },
  title: {
    type: String,
    required: true // Title of the content
  },
  description: {
    type: String,
    required: false // Optional description of the content
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically set to the current date
  }
});

// Model initialization
const Content = mongoose.model('Content', contentSchema);

export default Content;
