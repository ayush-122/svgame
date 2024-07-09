const express = require("express");
const wallet = require("../controllers/wallet.controller");
const isAuthenticated = require("../middleware/authMiddleware/isAuthenticated");
const asyncErrorHandler = require("../helpers/asyncErrorHandler");



const router = express.Router();

/**
 * @swagger
 * /wallet/addBalance:
 *   post:
 *     summary: Add Balance to Player Wallet
 *     tags: [Wallet]
 *     description: This API is used to Add Balance for a particular user (Test Only) (v2)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 100
 *                 description: Amount to be added .
 *     responses:
 *       200:
 *         description: Successful operation. Balance Added SuccessFully.
 *         content:
 *           application/json:
 *             example:
 *              status: true
 *              message: Balance Added SuccessFully
 *              balance: 108
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//Route to Create a Game
router.post("/addBalance", isAuthenticated, wallet.addBalance); //NOTE - Disabled

module.exports = router;
