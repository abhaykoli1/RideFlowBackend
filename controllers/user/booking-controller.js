const Booking = require("../../models/booking");
const User = require("../../models/User");
const Ride = require("../../models/Rides");
const nodemailer = require("nodemailer");

// const bookRide = async (req, res) => {
//   try {
//     const {
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status,
//       addressInfo,
//       dl,
//       phone,
//     } = req.body;

//     if (
//       !userId ||
//       !bikeId ||
//       !bookedTimeSlots.from ||
//       !bookedTimeSlots.to ||
//       !totalDays ||
//       !totalAmount
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }
//     if (!dl) {
//       return res.status(400).json({
//         success: false,
//         message: "Please Enter Driving Licence Number",
//       });
//     }
//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Please Enter Mobile Number",
//       });
//     }

//     const dlRegex = /^[A-Za-z]{2}[0-9]{2}(?: [0-9]{11}|[A-Za-z][0-9]{11})$/;

//     if (!dlRegex.test(dl)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Driving Licence format! Use RJ14D00000000000.",
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: true,
//         message: "User not found",
//       });
//     }

//     const bike = await Ride.findById(bikeId);
//     if (!bike) {
//       return res.status(404).json({
//         success: false,
//         message: "Bike got out of Stock",
//       });
//     }

//     const newBooking = new Booking({
//       userId,
//       bikeId,
//       bookedTimeSlots,
//       totalDays,
//       totalAmount,
//       status: status || "Pending",
//       addressInfo,
//       dl,
//       phone,
//     });

//     await newBooking.save();

//     res.status(201).json({
//       success: true,
//       message: "Your Booking Placed successfully",
//       booking: newBooking,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error. Please try again.",
//     });
//   }
// };

const bookRide = async (req, res) => {
  try {
    const {
      userId,
      bikeId,
      bookedTimeSlots,
      totalDays,
      totalAmount,
      status,
      addressInfo,
      dl,
      phone,
    } = req.body;

    if (
      !userId ||
      !bikeId ||
      !bookedTimeSlots.from ||
      !bookedTimeSlots.to ||
      !totalDays ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    if (!dl) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Driving Licence Number",
      });
    }
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Mobile Number",
      });
    }

    const dlRegex = /^[A-Za-z]{2}[0-9]{2}(?: [0-9]{11}|[A-Za-z][0-9]{11})$/;

    if (!dlRegex.test(dl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Driving Licence format! Use RJ14D00000000000.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User not found",
      });
    }

    const bike = await Ride.findById(bikeId);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike got out of Stock",
      });
    }

    const newBooking = new Booking({
      userId,
      bikeId,
      bookedTimeSlots,
      totalDays,
      totalAmount,
      status: status || "Pending",
      addressInfo,
      dl,
      phone,
    });

    await newBooking.save();

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Ride Flow Rentals" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Thank You for Booking with Us!",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #fff;
      margin: 0;
      padding: 0;
      background-color: #fff;
    }
    p ,li{
      color: #000;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }
    .email-header {
      background-color: #333;
      color: #fff;
      text-align: center;
      padding: 25px 20px;
    }
    .email-header h1 {
      font-size: 28px;
      margin: 0;
    }
    .email-body {
    border: 1px solid #333;
      padding: 20px 20px;
    }
    .email-body p {
      font-size: 16px;
      margin: 0 0 15px;
    }
    .email-body .highlight {
      color: #ffa600;
      font-weight: bold;
    }
    .email-body .bike-image {
      text-align: center;
     
    }
    .email-body .bike-image img {
      width: 90%;
      height:  auto;
      
    }
    .details-list {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    .details-list li {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .details-list li b {
      color: #ffa600;
    }
    .email-footer {
      background-color: #333;
      padding: 15px 20px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .email-footer a {
      color: #ffa600;
      text-decoration: none;
    }
    .email-footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Thank You for Booking!</h1>
    </div>
    <div class="email-body">
      <p>Dear <span class="highlight">${user.userName}</span>,</p>
      <p>Your booking for the bike <b class="highlight">${bike.rideName}'s</b> booking has been placed successfully. Below are your booking details:</p>
      <div class="bike-image">
        <img src="${bike.image}" alt="Bike Image">
      </div>
      <ul class="details-list">
      <li><b>Brand: </b> ${bike.brand}</li>
        <li><b>Bike Name: </b> ${bike.rideName}</li>
        <li><b>Booking Date: </b></li>
        <ul>
          <li><b>From: </b> ${bookedTimeSlots.from}</li>
          <li><b>To: </b> ${bookedTimeSlots.to}</li>
        </ul>
        <li><b>Total Days: </b> ${totalDays}</li>
        <li><b>Total Amount: </b> ₹${totalAmount}</li>
      </ul>
      <p style="text-align: center;"> We’ll be in touch shortly with more information.</p>
      <p style="text-align: center;"> Thank you for choosing us. Have a safe and enjoyable ride!</p>
    </div>
    <div class="email-footer">
      &copy; 2025 <a href="#">RideFlow Rentals</a>. All rights reserved.
    </div>
  </div>
</body>
</html>
`,
    });
    res.status(201).json({
      success: true,
      message: "Your Booking Placed successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// Check for overlapping bookings
// const overlappingBookings = await Booking.findOne({
//   bikeId,
//   $or: [
//     {
//       "bookedTimeSlots.from": { $lt: bookedTimeSlots.to },
//       "bookedTimeSlots.to": { $gt: bookedTimeSlots.from },
//     },
//   ],
// });

// if (overlappingBookings) {
//   return res.status(400).json({
//     message: "Bike is already booked for the selected time slots",
//   });
// }

// Get all bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId");
    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const bookings = await Booking.find({ userId })
      .populate("bikeId")
      .sort({ createdAt: -1 }); // Sort bookings by most recent

    if (!bookings.length) {
      return res.status(404).json({ message: "Bookings arn't available" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    if (!["Pending", "Confirmed", "Cancelled", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = {
  bookRide,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  deleteBooking,
};
