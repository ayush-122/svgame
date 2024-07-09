// routes/saintPatrick.routes.js
const express = require("express");
const saintPatrick = require("./saintPatrick.middleware");
const router = express.Router();
const isAuthenticated = require("../../../../api/v1/middleware/authMiddleware/isAuthenticated");
const game = require("./saintPatrick.controller");

/**
 * @swagger
 * /game/saintPatrick/play:
 *   post:
 *     summary: Start base game
 *     tags: [SaintPatrick]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credits:
 *                 type: integer
 *                 example: 8
 *                 description: The credits to play.
 *               bet:
 *                 type: integer
 *                 example: 30
 *                 description: The bet amount.
 *               isBuyFeature:
 *                 type: boolean
 *                 example: false
 *                 description: Indicates if the feature is bought.
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpinSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//BASE GAME
router.post("/play", isAuthenticated, saintPatrick.gamePlayMiddlewareSaintPatrick, game.postGamePlaySaintPatrick);

/**
 * @swagger
 * /game/saintPatrick/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [SaintPatrick]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 example: "FREE"
 *                 description: The state of the game.
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpinSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//FREE/BONUS GAME
router.post(
  "/continue",
  isAuthenticated,
  saintPatrick.gameContinueMiddlewareSaintPatrick,
  game.postGameContinueSaintPatrick
);

/**
 * @swagger
 * /game/saintPatrick/play:
 *   put:
 *     summary: Finish game
 *     tags: [SaintPatrick]
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: Spin Status Updated Successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//DONE REQUEST
router.put("/play", isAuthenticated, saintPatrick.gameDoneMiddlewareSaintPatrick, game.postGameDoneSaintPatrick);

/**
 * @swagger
 * /game/saintPatrick/resume:
 *   get:
 *     summary: Resume SaintPatrick Game
 *     tags: [SaintPatrick]
 *     responses:
 *       200:
 *         description: Successful operation. Returns game details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SpinSchema'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/SpinNotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//Resume Request
router.get("/resume", isAuthenticated, saintPatrick.gameResumeMiddlewareSaintPatrick, game.postGameResumeSaintPatrick);

module.exports = router;
