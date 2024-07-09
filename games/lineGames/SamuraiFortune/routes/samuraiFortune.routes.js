const express = require("express");
const game = require("./samuraiFortune.controller");

const isAuthenticated = require("../../../../api/v1/middleware/authMiddleware/isAuthenticated");
const samuraiFortune = require("./samuraiFortune.middleware");

const router = express.Router();

/**
 * @swagger
 * /game/samuraiFortune/play:
 *   post:
 *     summary: Start base game
 *     tags: [SamuraiFortune]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credits:
 *                 type: integer
 *                 example: 1
 *                 description: The credits to play.
 *               bet:
 *                 type: integer
 *                 example: 20
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
router.post("/play", isAuthenticated, samuraiFortune.gamePlayMiddlewareSamuraiFortune, game.postGamePlaySamuraiFortune);

/**
 * @swagger
 * /game/samuraiFortune/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [SamuraiFortune]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
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
//FREE GAME
router.post(
  "/continue",
  isAuthenticated,
  samuraiFortune.gameContinueMiddlewareSamuraiFortune,
  game.postGameContinueSamuraiFortune
);

/**
 * @swagger
 * /game/samuraiFortune/play:
 *   put:
 *     summary: Finish game
 *     tags: [SamuraiFortune]
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
router.put("/play", isAuthenticated, samuraiFortune.gameDoneMiddlewareSamuraiFortune, game.postGameDoneSamuraiFortune);

/**
 * @swagger
 * /game/samuraiFortune/resume:
 *   get:
 *     summary: Resume SamuraiFortune Game
 *     tags: [SamuraiFortune]
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
router.get("/resume", isAuthenticated, samuraiFortune.gameResumeMiddlewareSamuraiFortune, game.postGameResumeSamuraiFortune);

module.exports = router;
