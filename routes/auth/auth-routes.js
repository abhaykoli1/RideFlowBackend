const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  googleAuth,
  fetchAllUsers,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google-login", googleAuth);
// router.get("/admin/users", authMiddleware, fetchAllUsers);
router.get("/admin/users", fetchAllUsers);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
