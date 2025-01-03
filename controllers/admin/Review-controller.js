const { imageUploadUtil } = require("../../helpers/cloudinary");
const Review = require("../../models/review");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new Review
const addReview = async (req, res) => {
  try {
    const { image, icon, userName, review } = req.body;

    const newlyCreatedReview = new Review({
      image,
      icon,
      userName,
      review,
    });

    await newlyCreatedReview.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all Review
const fetchAllReview = async (req, res) => {
  try {
    const listOfReviews = await Review.find({});
    res.status(200).json({
      success: true,
      data: listOfReviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a Review
const editReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, icon, userName, review } = req.body;

    let findReview = await Review.findById(id);
    if (!findReview)
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });

    findReview.icon = icon || findReview.icon;
    findReview.userName = userName || findReview.userName;
    findReview.review = review || findReview.review;
    findReview.image = image || findReview.image;

    await findReview.save();
    res.status(200).json({
      success: true,
      data: findReview,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a Review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReview = await Review.findByIdAndDelete(id);

    if (!deleteReview)
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });

    res.status(200).json({
      success: true,
      message: "Review delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addReview,
  fetchAllReview,
  editReview,
  deleteReview,
};
