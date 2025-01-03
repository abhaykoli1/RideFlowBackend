const { imageUploadUtil } = require("../../helpers/cloudinary");
const Ride = require("../../models/Rides");

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

//add a new Ride
const addRide = async (req, res) => {
  try {
    const {
      image,
      rideName,
      description,
      category,
      brand,
      cc,
      rentPrice,
      salePrice,
      // rentPerDay,
      // rentPerWeek,
      totalStock,
      averageReview,
    } = req.body;

    console.log(averageReview, "averageReview");

    const newlyCreatedRide = new Ride({
      image,
      rideName,
      description,
      category,
      brand,
      cc,
      rentPrice,
      salePrice,
      // rentPerHour,
      // rentPerDay,
      // rentPerWeek,
      totalStock,
      averageReview,
    });

    await newlyCreatedRide.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedRide,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all Rides
const fetchAllRides = async (req, res) => {
  try {
    const listOfRides = await Ride.find({});
    res.status(200).json({
      success: true,
      data: listOfRides,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a Ride
const editRide = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      rideName,
      description,
      category,
      brand,
      cc,
      rentPrice,
      salePrice,
      // rentPerHour,
      // rentPerDay,
      // rentPerWeek,
      totalStock,
      averageReview,
    } = req.body;

    let findRide = await Ride.findById(id);
    if (!findRide)
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });

    findRide.rideName = rideName || findRide.rideName;
    findRide.description = description || findRide.description;
    findRide.category = category || findRide.category;
    findRide.brand = brand || findRide.brand;
    findRide.cc = cc || findRide.cc;
    findRide.rentPrice = rentPrice === "" ? 0 : rentPrice || findRide.rentPrice;
    findRide.salePrice = salePrice === "" ? 0 : salePrice || findRide.salePrice;
    // findRide.rentPerWeek =
    //   rentPerWeek === "" ? 0 : rentPerWeek || findRide.rentPerWeek;

    findRide.totalStock = totalStock || findRide.totalStock;
    findRide.image = image || findRide.image;
    findRide.averageReview = averageReview || findRide.averageReview;

    await findRide.save();
    res.status(200).json({
      success: true,
      data: findRide,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a Ride
const deleteRide = async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteRide = await Ride.findByIdAndDelete(id);

    if (!DeleteRide)
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });

    res.status(200).json({
      success: true,
      message: "Ride delete successfully",
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
  addRide,
  fetchAllRides,
  editRide,
  deleteRide,
};
