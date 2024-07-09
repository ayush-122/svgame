// routes/fruitFiesta.routes.js
const express = require("express");
const fruitFiesta = require("./fruitFiesta.middleware");
const router = express.Router();
const isAuthenticated = require("../../../../api/v1/middleware/authMiddleware/isAuthenticated");
const game = require("./fruitFiesta.controller");

/**
 * @swagger
 * /game/fruitFiesta/play:
 *   post:
 *     summary: Start base game
 *     tags: [FruitFiesta]
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
router.post("/play", isAuthenticated, fruitFiesta.gamePlayMiddlewareFruitFiesta, game.postGamePlayFruitFiesta);

/**
 * @swagger
 * /game/fruitFiesta/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [FruitFiesta]
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
  fruitFiesta.gameContinueMiddlewareFruitFiesta,
  game.postGameContinueFruitFiesta
);

/**
 * @swagger
 * /game/fruitFiesta/play:
 *   put:
 *     summary: Finish game
 *     tags: [FruitFiesta]
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
router.put("/play", isAuthenticated, fruitFiesta.gameDoneMiddlewareFruitFiesta, game.postGameDoneFruitFiesta);

/**
 * @swagger
 * /game/fruitFiesta/resume:
 *   get:
 *     summary: Resume FruitFiesta Game
 *     tags: [FruitFiesta]
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
router.get("/resume", isAuthenticated, fruitFiesta.gameResumeMiddlewareFruitFiesta, game.postGameResumeFruitFiesta);

module.exports = router;
