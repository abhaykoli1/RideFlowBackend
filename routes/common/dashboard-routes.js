const express = require("express");

const {
  handleImageUpload,
  addToDashboard,
  addContactInfo,
  fetchContent,
  fetchInfo,
  editContent,
  deleteAllContent,
  editContactInfo,
} = require("../../controllers/common/dashboard-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addToDashboard);
router.post("/addInfo", addContactInfo);
router.put("/edit/:id", editContent);
router.put("/editInfo/:id", editContactInfo);

router.delete("/delete", deleteAllContent);

// router.delete("/delete/:id", deleteContent);
router.get("/get", fetchContent);
router.get("/getInfo", fetchInfo);

module.exports = router;
