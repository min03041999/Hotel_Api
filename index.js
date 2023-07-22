const express = require("express");
const mongoose = require("mongoose"); // store mongodb

const cors = require("cors");
const cookieParser = require("cookie-parser"); // it is middware and use syntax anlysis
const fs = require("fs");
const multer = require("multer");

require("dotenv").config();

const app = express();

app.use(express.json()); // return data according to format json
app.use(cookieParser());

// Routes
const userRoutes = require("./Routes/user.routes");

app.use("/user", userRoutes);

app.use(
  cors({
    credentials: true,
    origin: "http://192.168.18.2",
  })
); // allow access address ip 192.168.18.2 source app

const port = 3000;

app.get("/test", (req, res) => {
  res.json({
    message: "Data is successful",
    data: {
      title: "Xin chào",
      name: "A Min",
    },
  });
});

mongoose
  .connect(
    "mongodb+srv://min03041999:min03041999@test.ajpc80k.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    const sever = app.listen(port);
    console.log(`Server is running in port ${port}`);
  })
  .catch((error) => {
    console.log(error);
  });
