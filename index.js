const express = require("express");
const mongoose = require("mongoose"); // store mongodb

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const cors = require("cors");
const cookieParser = require("cookie-parser"); // it is middware and use syntax anlysis
const fs = require("fs");
const multer = require("multer");

require("dotenv").config();

const app = express();

app.use(express.json()); // return data according to format json
app.use(cookieParser());

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

  apis: ["./index.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
const userRoutes = require("./Routes/user.routes");

app.use("/user", userRoutes);

/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: name is yourname
 *              email:
 *                  type: string
 *                  description: email is unique
 *              password:
 *                  type: string
 *                  description: password is yourpassword
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /user/get-user:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 * /user/register:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */

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
