import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must provide name"],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, "Must provide price"],
  },
  company: {
    type: String,
    required: [true, "Must have a company name"],
    lowercase: true,
    enum: {
      values: ["palace woods", "timber market", "melcom", "sika-pa"],
      message: "{value} is not supported",
    },
    // enum: ["palace woods", "timber market", "melcom", "sika-pa"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },
});

export default mongoose.model("Product", ProductSchema);
