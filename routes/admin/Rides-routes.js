const express = require("express");

const {
  handleImageUpload,
  addRide,
  editRide,
  fetchAllRides,
  deleteRide,
} = require("../../controllers/admin/Rides-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addRide);
router.put("/edit/:id", editRide);
router.delete("/delete/:id", deleteRide);
router.get("/get", fetchAllRides);

module.exports = router;
