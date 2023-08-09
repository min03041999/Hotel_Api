/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: The booking managing API
 * /booking/get-booking:
 *   get:
 *     summary: List of Booking of the hotel
 *     tags: [Booking]
 *     security:
 *       - x-access-token: []
 *     responses:
 *       200:
 *         description: The list of the Booking
 *       401:
 *         description: Data error
 *       500:
 *         description: Server error
 * /booking/get-booking/{BookingId}:
 *   get:
 *     summary: Show all information the Booking ID of the hotel
 *     tags: [Booking]
 *     security:
 *       - x-access-token: []
 *     responses:
 *       200:
 *         description: Booking is successfully
 * /booking/add-booking:
 *   post:
 *     summary: Booking of the hotel
 *     tags: [Booking]
 *     security:
 *       - x-access-token: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                place:
 *                  type: string
 *                  description: The ID of the Place
 *                  example: 64bb8f35ae1dcf4135b8caa9
 *                checkIn:
 *                  type: date-time
 *                  description: CheckIn of the Booking
 *                  example: 2023-08-08 08:00:00
 *                checkOut:
 *                  type: date-time
 *                  description: CheckOut of the Booking
 *                  example: 2023-08-10 08:00:00
 *                numberOfGuests:
 *                  type: int
 *                  description: Number of Guests of the Booking
 *                  example: 7
 *                name:
 *                  type: string
 *                  description: Name of Guests of the Booking
 *                  example: Zayn Malik
 *                phone:
 *                  type: string
 *                  description: Phone of Guests of the Booking
 *                  example: 0937275981
 *                user:
 *                  type: string
 *                  description: The ID of the User when user was booking
 *                  example: 64bb8f35ae1dcf4135b8caa9
 *     responses:
 *       200:
 *         description: Your booking is successfully
 *       401:
 *         description: Your booking is fail
 *       500:
 *         description: Server Error
 * /booking/cancel-booking/{BookingId}:
 *   delete:
 *     summary: Cancel booking of the hotel
 *     tags: [Booking]
 *     security:
 *       - x-access-token: []
 *     parameters:
 *       - name: BookingId
 *         in: path
 *         description: ID for the booking to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking is cancel successfully
 *
 */

const express = require("express");

const bookingController = require("../Controllers/booking.controller");
const isAuth = require("../Middleware/is-auth");

const router = express.Router();

router.get("/get-booking", isAuth, bookingController.getBooking);

router.get("/get-booking/:BookingId", isAuth, bookingController.getBookingId);

router.post("/add-booking", isAuth, bookingController.addBooking);

router.put(
  "/update-booking/:BookingId",
  isAuth,
  bookingController.updateBooking
);

router.delete(
  "/cancel-booking/:BookingId",
  isAuth,
  bookingController.cancelBooking
);

module.exports = router;
