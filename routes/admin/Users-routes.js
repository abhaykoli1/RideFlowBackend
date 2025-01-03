const express = require("express");

const {
  //   deleteUser,
  //   editUser,
  fetchAllUsers,
} = require("../../controllers/admin/Users-controller");

const router = express.Router();

// router.put("/edit/:id", editUser);
// router.delete("/delete/:id", deleteUser);
router.get("/get", fetchAllUsers);

module.exports = router;
