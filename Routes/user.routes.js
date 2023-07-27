/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: name is yourname
 *         email:
 *           type: string
 *           description: email is unique, required
 *         password:
 *           type: string
 *           description: password is required
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email is required
 *         password:
 *           type: string
 *           description: password is required
 *     Updated:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: name is required
 *         password:
 *           type: string
 *           description: password is required
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
 * /user/login:
 *   post:
 *    summary: Login account
 *    tags: [Users]
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: The login user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      500:
 *        description: Some server error
 * /user/refresh-token:
 *  post:
 *   summary: refresh Token
 *   tags: [Users]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                description: the user's expried token
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *   responses:
 *     200:
 *       description: OK
 * /user/update-user/{UserId}:
 *  put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *      - name: UserId
 *        in: path
 *        description: ID of user to edit
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Updated'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 * /user/delete-user/{UserId}:
 *  delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: UserId
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 * /user/logout:
 *  delete:
 *     summary: Logged out a user by token of user
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: the user's expried token
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     responses:
 *       200:
 *         description: Logged Out successfully
 */

const express = require("express");

const userController = require("../Controllers/user.controller");

const router = express.Router();

// Get User
router.get("/get-user", userController.getUser);

// Register
router.post("/register", userController.register);

// Update User
router.put("/update-user/:UserId", userController.updateUser);

// Delete
router.delete("/delete-user/:UserId", userController.deleteUser);

// Login
router.post("/login", userController.login);

// Refresh token
router.post("/refresh-token", userController.refreshToken);

// Logout
router.delete("/logout", userController.logout);

module.exports = router;
