const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const { imageUpload } = require("./controllers/common/imageUpload");
const multer = require("multer");

const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// // Set up multer storage
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

// Import routes
const authRouter = require("./routes/auth/auth-routes");
const usersRouter = require("./routes/common/users-routers");
const adminRidesRouter = require("./routes/admin/Rides-routes");
const adminReviewsRouter = require("./routes/admin/Reviews-routes");
const userRidesRouter = require("./routes/user/Rides-routes");
const userAddressRouter = require("./routes/user/address-routes");
const UserContactRouter = require("./routes/user/contact-routes");
const userBookingRouter = require("./routes/user/booking-routes");
const DashboardRouter = require("./routes/common/dashboard-routes");
// const imageUploadRouter = require("./routes/common/imageUpload-routes");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// Route handling
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin/Rides", adminRidesRouter);
app.use("/api/dashboard", DashboardRouter);
app.use("/api/admin/Reviews", adminReviewsRouter);
app.use("/api/user/Rides", userRidesRouter);
app.use("/api/user/address", userAddressRouter);
app.use("/api/contact", UserContactRouter);
app.use("/api/booking", userBookingRouter);
// app.use("/api/upload-image", adminRidesRouter);
app.post("/api/upload", upload.single("file"), imageUpload);
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Import the routes
app.use("/static", express.static(path.join(__dirname, "public")));

// Start the server
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use.`);
      process.exit(1);
    } else {
      console.error("Server error:", err);
    }
  });
