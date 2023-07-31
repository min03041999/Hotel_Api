const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuest: Number,
  price: Number,
});

const PlaceModel = mongoose.model("place", placeSchema);

module.exports = PlaceModel;
