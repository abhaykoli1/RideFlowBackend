const express = require("express");

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/user/address-controller");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userEmail", fetchAllAddress);
router.delete("/delete/:userEmail/:addressId", deleteAddress);
router.put("/update/:userEmail/:addressId", editAddress);

module.exports = router;
