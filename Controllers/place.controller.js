const Place = require("../Models/place.models");

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
