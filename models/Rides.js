const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
  {
    image: String,
    rideName: String,
    description: String,
    category: String,
    brand: String,
    cc: String,
    rentPrice: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rides", RideSchema);
