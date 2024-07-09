const express = require("express");
const game = require("./rollingRocking.controller");

const rollingRocking = require("./rollingRocking.middleware");

const router = express.Router();

/**
 * @swagger
 * /game/rollingRocking/play:
 *   post:
 *     summary: Start base game
 *     tags: [RollingRocking]
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
router.post("/play", rollingRocking.gamePlayMiddlewareRollingRocking, game.postGamePlayRollingRocking);

/**
 * @swagger
 * /game/rollingRocking/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [RollingRocking]
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

  rollingRocking.gameContinueMiddlewareRollingRocking,
  game.postGameContinueRollingRocking
);

/**
 * @swagger
 * /game/rollingRocking/play:
 *   put:
 *     summary: Finish game
 *     tags: [RollingRocking]
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
router.put("/play", rollingRocking.gameDoneMiddlewareRollingRocking, game.postGameDoneRollingRocking);

/**
 * @swagger
 * /game/rollingRocking/resume:
 *   get:
 *     summary: Resume RollingRocking Game
 *     tags: [RollingRocking]
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
router.get(
  "/resume",

  rollingRocking.gameResumeMiddlewareRollingRocking,
  game.postGameResumeRollingRocking
);

module.exports = router;
