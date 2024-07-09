// routes/goldenEagle.routes.js
const express = require("express");
const goldenEagle = require("./goldenEagle.middleware");
const router = express.Router();
const isAuthenticated = require("../../../../api/v1/middleware/authMiddleware/isAuthenticated");
const game = require("./goldenEagle.controller");

/**
 * @swagger
 * /game/goldenEagle/play:
 *   post:
 *     summary: Start base game
 *     tags: [GoldenEagle]
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
 *               $ref: '#/components/schemas/WaysSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//BASE GAME
router.post(
  "/play",
  isAuthenticated,
  goldenEagle.gamePlayMiddlewareGoldenEagle,
  game.postGamePlayGoldenEagle
);

/**
 * @swagger
 * /game/goldenEagle/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [GoldenEagle]
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
router.post("/continue", isAuthenticated, goldenEagle.gameContinueMiddlewareGoldenEagle, game.postGameContinueGoldenEagle);

/**
 * @swagger
 * /game/goldenEagle/play:
 *   put:
 *     summary: Finish game
 *     tags: [GoldenEagle]
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
router.put("/play", isAuthenticated, goldenEagle.gameDoneMiddlewareGoldenEagle, game.postGameDoneGoldenEagle);

/**
 * @swagger
 * /game/goldenEagle/resume:
 *   get:
 *     summary: Resume GoldenEagle Game
 *     tags: [GoldenEagle]
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
router.get("/resume", isAuthenticated, goldenEagle.gameResumeMiddlewareGoldenEagle, game.postGameResumeGoldenEagle);

module.exports = router;
