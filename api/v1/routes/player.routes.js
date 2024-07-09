const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authMiddleware/isAuthenticated");
const player = require("../controllers/player.controller");

/**
 * @swagger
 * /player:
 *   get:
 *     summary: Get player details
 *     tags: [Player]
 *     description: Retrieve details of the authenticated player.
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/PlayerData'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: Bad Request, Invalid Token.
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

router.get("/", isAuthenticated, player.getPlayer);

module.exports = router;
