const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const {
  fetchAllUsers,
  updateUserRole,
} = require("../../controllers/common/users-controller");

const router = express.Router();

router.get("/getList", fetchAllUsers);
router.put("/updateRole", updateUserRole);

module.exports = router;
