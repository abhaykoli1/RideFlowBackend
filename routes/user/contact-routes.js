const express = require("express");
const {
  addContactQuery,
  deleteContactQuery,
  fetchAllContactQuery,
} = require("../../controllers/user/contact-controller");

const router = express.Router();
router.post("/add", addContactQuery);
// router.put("/edit/:id", editContactQuery);
router.delete("/delete/:id", deleteContactQuery);
router.get("/fetchAll", fetchAllContactQuery);

module.exports = router;
