const express = require("express");

const {
  getFilteredRides,
  getRideDetails,
} = require("../../controllers/user/Rides-controller");

const router = express.Router();

router.get("/get", getFilteredRides);
router.get("/get/:id", getRideDetails);

module.exports = router;
