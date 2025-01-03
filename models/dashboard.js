const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema(
  {
    image: String,
    heading: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dashboard", DashboardSchema);
