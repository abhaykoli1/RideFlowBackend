const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const imageUpload = async (req, res) => {
  try {
    console.log(req.file); // Check if the file is coming through

    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Define the upload directory in Client/src/assets
    const uploadDir = path.join(__dirname, "../../assets");

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Ensure unique file name to avoid collisions
    const uniqueFileName = Date.now() + "_" + req.file.originalname;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Write the file to disk
    fs.writeFileSync(filePath, req.file.buffer);

    // Respond with the file URL
    res.json({
      success: true,
      result: {
        url: `${process.env.REACT_APP_IMAGE_API_URL}/assets/${uniqueFileName}`,
      },
    });
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading the image",
    });
  }
};

module.exports = { imageUpload };
