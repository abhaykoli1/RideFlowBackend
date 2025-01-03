const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema(
  {
    infoid: {
      type: String,
      default: "uni",
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
