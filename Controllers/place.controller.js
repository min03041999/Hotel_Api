const Place = require("../Models/place.models");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

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

exports.uploadPlace = async (req, res, next) => {
  // console.log(req.files);
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);

    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }

  res.json({
    uploadedFiles,
  });
};

exports.uploadByLinks = async (req, res, next) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  try {
    // responseType: "stream" trả về dữ liệu dưới dạng luồng "stream" thay vì trả về JSON hoặc string
    const response = await axios.get(link, { responseType: "stream" });
    const imagePath = path.join(__dirname, "../uploads", newName);
    console.log(imagePath);
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);
    writer.on("finish", () => {
      res.json(newName);
    });
    writer.on("error", (error) => {
      res.status(500).json({ message: "Failed to save the image" });
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to download the image",
    });
  }
};

exports.addPlace = async (req, res, next) => {
  try {
    const {
      title,
      address,
      photos,
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
      photos,
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
    clearImg(findPlace.photos);
    await Place.findByIdAndDelete({ _id: placeId });

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
  console.log(arrayImage);
  for (let i = 0; i < arrayImage.length; i++) {
    let fileImage = path.join(__dirname, "../uploads", arrayImage[i]);

    fs.unlink(fileImage, (err) => console.log(err));
  }
};
