const express = require("express");

const userController = require("../Controllers/user.controller");

const router = express.Router();

// Get User
router.get("/get-user", userController.getUser);

// Register
router.post("/register", userController.register);

// Login

module.exports = router;
