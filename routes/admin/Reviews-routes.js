const express = require("express");

const {
  handleImageUpload,
  addReview,
  deleteReview,
  editReview,
  fetchAllReview,
} = require("../../controllers/admin/Review-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addReview);
router.put("/edit/:id", editReview);
router.delete("/delete/:id", deleteReview);
router.get("/get", fetchAllReview);

module.exports = router;
