const Place = require("../Models/place.models");
const fs = require("fs");
const path = require("path");

exports.places = async (req, res, next) => {
  try {
    const getPlace = await Place.find();

    if (getPlace) {
      res
        .status(200)
        .json({ message: "Fetched user successfully", places: getPlace });
    } else {
      res.status(401).json({ message: "Data is error" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error Server",
    });
  }
};

exports.addPlace = async (req, res, next) => {
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      price,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    const place = await Place.create({
      owner: req.userId,
      title,
      address,
      photos: addedPhotos,
      description,
      price,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    res.status(200).json({
      message: "Place created successful",
      place: place,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

exports.editPlace = async (req, res, next) => {};

exports.deletePlace = async (req, res, next) => {
  try {
    const placeId = req.params.PlaceId;
    const findPlace = await Place.findById({ _id: placeId });
    if (!findPlace)
      return res.status(401).json({
        message: "Place is not found!",
      });
    // clearImg(findPlace.photos);
    await Place.findByIdAndDelete({ _id: placeId });

    clearImg(findPlace.photos);

    res.status(200).json({
      message: "Place is deleted successfully",
      Place: findPlace,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error server",
    });
  }
};

const clearImg = (fileImages) => {
  let arrayImage = fileImages;

  for (let i = 0; i < arrayImage.length; i++) {
    let fileImage = path.join(__dirname, "..", arrayImage[i]);
    fs.unlink(fileImage, (err) => console.log(err));
  }
};
