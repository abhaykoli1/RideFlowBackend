const Ride = require("../../models/Rides");

const getFilteredRides = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.salePrice = 1;
        break;
      case "price-hightolow":
        sort.salePrice = -1;
        break;
      default:
        sort.salePrice = 1;
        break;
    }

    const ride = await Ride.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: ride,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getRideDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findById(id);

    if (!ride)
      return res.status(404).json({
        success: false,
        message: "Ride not found!",
      });

    res.status(200).json({
      success: true,
      data: ride,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredRides, getRideDetails };
