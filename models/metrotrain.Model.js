import mongoose from 'mongoose';

const metroTrainSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

const MetroTrain = mongoose.model('MetroTrain', metroTrainSchema);

export default MetroTrain;
