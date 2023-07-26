const express = require("express");
const mongoose = require("mongoose"); // store mongodb
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();

app.use(express.json()); // return data according to format json
app.use(cookieParser()); // use cookie

// Swagger UI
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API Project for mongodb",
      version: "1.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
const userRoutes = require("./Routes/user.routes");

app.use("/user", userRoutes);

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

const port = 3000;

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
