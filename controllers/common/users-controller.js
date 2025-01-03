const User = require("../../models/User");
const dotenv = require("dotenv");
dotenv.config();

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password -__v");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body; // Extract userId and new role from the request body

    // Validate input
    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "User ID and role are required.",
      });
    }

    // Find the user and update the role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.role = role; // Update the role
    await user.save(); // Save the updated user

    res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchAllUsers,
  updateUserRole,
};
