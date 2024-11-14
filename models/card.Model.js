import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

// Define the schema for Cinema showing
const cinemaSchema = new Schema({
  imgAddress: {
    type: String,
    required: true,
  },
  audienceClass: {
    type: String,
    enum: ["Standard", "VIP", "Premium"],
    required: true,
  },
  cinemaChain: {
    type: String,
    required: true,
  },
  screen: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userPrice: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: true, // Optional field for location
  },
  tier: {
    type: String,
    enum: ["Basic", "Standard", "Premium"], // Example tier values
    required: false, // Optional field for tier
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// If a user is logged in, assign a price (e.g., userPrice could be different)
cinemaSchema.methods.setUserPrice = function (isLoggedIn) {
  if (isLoggedIn) {
    this.userPrice = this.price * 0.9; // Example: 10% discount for logged-in users
  } else {
    this.userPrice = this.price;
  }
};

const Cinema = model("Cinema", cinemaSchema);

export default Cinema;
