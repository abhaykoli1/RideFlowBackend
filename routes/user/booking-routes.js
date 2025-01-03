const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/user/booking-controller");

router.post("/bookride", bookingController.bookRide);

// Route to get all bookings (for admin)
router.get("/get", bookingController.getAllBookings);

// Route to get bookings for a specific user
router.get("/user/:userId", bookingController.getUserBookings);

router.patch("/status", bookingController.updateBookingStatus);

router.delete("/delete/:bookingId", bookingController.deleteBooking);

module.exports = router;
