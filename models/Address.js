const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userEmail: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
