const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  comment: String,
});

module.exports = mongoose.model("Contact", contactSchema);
