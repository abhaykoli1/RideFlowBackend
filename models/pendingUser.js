// const mongoose = require("mongoose");

// const PendingUserSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   image: { type: String, required: false },
//   role: { type: String, default: false },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   verificationToken: { type: String, required: true },
//   verificationTokenExpiry: { type: Date },
// });

// const PendingUser = mongoose.model("PendingUser", PendingUserSchema);

// module.exports = PendingUser;

const mongoose = require("mongoose");

const PendingUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: String,
      required: true,
    },
    tokenExpires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const PendingUser = mongoose.model("PendingUser", PendingUserSchema);
module.exports = PendingUser;
