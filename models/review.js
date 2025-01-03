const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    image: String,
    icon: String,
    userName: String,
    review: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
