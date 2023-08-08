const Booking = require("../Models/booking.models");

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find();

    if (!booking) return res.status(401).json({ message: "Data is error" });

    res.status(200).json({
      message: "Fetched booking successfully",
      booking: booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.addBooking = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userId,
    });

    res.status(200).json({
      message: "Booking is successfully!",
      booking: booking,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
