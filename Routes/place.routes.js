/**
 * @swagger
 * tags:
 *   name: Places
 *   description: The places managing API
 * /place/get-place:
 *   get:
 *     summary: Lists all the Places
 *     tags: [Places]
 *     security:
 *       - x-access-token: []
 *     responses:
 *       200:
 *         description: The list of the Places
 * /place/upload-place:
 *   post:
 *     summary: Upload multiple images for a place
 *     tags: [Places]
 *     security:
 *       - x-access-token: []
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                photos:
 *                  type: array
 *                  items:
 *                    type: string
 *                    format: binary
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 * /place/upload-by-links-place:
 *  post:
 *    summary: Upload by links for a place
 *    tags: [Places]
 *    security:
 *      - x-access-token: []
 *    requestBody:
 * /place/add-place:
 *   post:
 *     summary: Add a new place
 *     tags: [Places]
 *     security:
 *       - x-access-token: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                owner:
 *                  type: string
 *                  description: The ID of the User who owns this Place
 *                  example: 64bb8f35ae1dcf4135b8caa9
 *                title:
 *                  type: string
 *                  description: The title of the Place
 *                  example: Pataizan Kutikun
 *                address:
 *                  type: string
 *                  description: The address of the Place
 *                  example: 387/324/4A Kulalambu
 *                photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description:  An array of photo URLs for the Place
 *                   example:
 *                     - 'Image_1.jpg'
 *                     - 'Image_2.jpg'
 *                     - 'Image_3.jpg'
 *                description:
 *                   type: string
 *                   description: the description of the Place
 *                   example: Hotel is ....
 *                perks:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of perks for the Place
 *                   example:
 *                     - 'Private pool'
 *                     - 'Ocean view'
 *                     - 'Free parking'
 *                extraInfo:
 *                    type: string
 *                    description: The extra information of the Place
 *                    example: 'No smoking, no pets'
 *                checkIn:
 *                    type: number
 *                    description: The check in of the Place
 *                    example: 900
 *                checkOunt:
 *                    type: number
 *                    description: The check out of the Place
 *                    example: 1100
 *                maxGuest:
 *                    type: number
 *                    description: The max guest of the Place
 *                    example: 6
 *                price:
 *                    type: number
 *                    description: The price of the Place
 *                    example: 200
 *     responses:
 *       200:
 *         description: The created Place
 *       500:
 *         description: Error Server
 * /place/delete-place/{PlaceId}:
 *   delete:
 *     summary: Delete a place
 *     tags: [Places]
 *     parameters:
 *       - name: PlaceId
 *         in: path
 *         description: ID for the place to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - x-access-token: []
 *     responses:
 *       200:
 *         description: Place deleted successfully
 *       401:
 *         description: Place not found
 *       500:
 *         description: Server error
 */

const express = require("express");
const multer = require("multer");

const placeController = require("../Controllers/place.controller");
const isAuth = require("../Middleware/is-auth");
const photoMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/get-place", isAuth, placeController.places);

// router.post("/upload-by-link-place", isAuth, placeController.uploadByLinks);

router.post(
  "/upload-place",
  photoMiddleware.array("photos", 100),
  isAuth,
  placeController.uploadPlace
);

router.post("/add-place", isAuth, placeController.addPlace);

router.post("/edit-place/:PlaceId", isAuth, placeController.editPlace);

router.delete("/delete-place/:PlaceId", isAuth, placeController.deletePlace);

module.exports = router;
