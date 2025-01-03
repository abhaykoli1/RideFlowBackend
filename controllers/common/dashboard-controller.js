const { imageUploadUtil } = require("../../helpers/cloudinary");
const Content = require("../../models/dashboard");
const ContactInfo = require("../../models/contactInfo");

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
    // console.log(error, );
    res.json({
      success: false,
      message: error,
    });
  }
};

//add a new content
const addToDashboard = async (req, res) => {
  try {
    const { image, heading } = req.body;

    const newlyCreatedDashboard = new Content({
      image,
      heading,
    });

    await newlyCreatedDashboard.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedDashboard,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//add
const addContactInfo = async (req, res) => {
  try {
    const { phone, email, instagram, facebook, twitter, whatsapp, address } =
      req.body;

    const newlyCreatedContactInfo = new ContactInfo({
      phone,
      email,
      instagram,
      twitter,
      facebook,
      whatsapp,
      address,
    });

    await newlyCreatedContactInfo.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedContactInfo,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch Info
const fetchInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.find({});
    if (contactInfo.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No dashboard content found",
      });
    }
    res.status(200).json({
      success: true,
      data: contactInfo,
    });
  } catch (e) {
    console.error("Error fetching dashboard content:", e.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the dashboard content",
    });
  }
};

const editContactInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, email, facebook, twitter, instagram, whatsapp, address } =
      req.body;

    let findInfo = await ContactInfo.findById(id);
    if (!findInfo)
      return res.status(404).json({
        success: false,
        message: "Info not found",
      });

    findInfo.phone = phone || findInfo.phone;
    findInfo.email = email || findInfo.email;
    findInfo.instagram = instagram || findInfo.instagram;
    findInfo.facebook = facebook || findInfo.facebook;
    findInfo.twitter = twitter || findInfo.twitter;
    findInfo.whatsapp = whatsapp || findInfo.whatsapp;
    findInfo.address = address || findInfo.address;

    await findInfo.save();
    res.status(200).json({
      success: true,
      data: findInfo,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch Content
const fetchContent = async (req, res) => {
  try {
    const dashboardContent = await Content.find({});
    if (dashboardContent.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No dashboard content found",
      });
    }
    res.status(200).json({
      success: true,
      data: dashboardContent,
    });
  } catch (e) {
    console.error("Error fetching dashboard content:", e.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the dashboard content",
    });
  }
};

//edit Content
const editContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, heading } = req.body;

    let findContent = await Content.findById(id);
    if (!findContent)
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });

    findContent.image = image || findContent.image;
    findContent.heading = heading || findContent.heading;

    await findContent.save();
    res.status(200).json({
      success: true,
      data: findContent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteAllContent = async (req, res) => {
  try {
    const result = await Content.deleteMany({});

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} contents deleted successfully`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting contents",
    });
  }
};

module.exports = {
  handleImageUpload,
  addToDashboard,
  addContactInfo,
  fetchContent,
  editContactInfo,
  fetchInfo,
  editContent,
  deleteAllContent,
};
