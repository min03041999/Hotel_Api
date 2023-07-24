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

const express = require("express");

const userController = require("../Controllers/user.controller");

const router = express.Router();

// Get User
router.get("/get-user", userController.getUser);

// Register
router.post("/register", userController.register);

// Login

module.exports = router;
