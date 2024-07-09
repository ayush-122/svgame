// routes/chiliChili.routes.js
const express = require("express");
const chiliChili = require("./chiliChili.middleware");
const router = express.Router();

const game = require("./chiliChili.controller");

/**
 * @swagger
 * /game/chiliChili/play:
 *   post:
 *     summary: Start base game
 *     tags: [ChiliChili]
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
router.post("/play", chiliChili.gamePlayMiddlewareChiliChili, game.postGamePlayChiliChili);

/**
 * @swagger
 * /game/chiliChili/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [ChiliChili]
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

  chiliChili.gameContinueMiddlewareChiliChili,
  game.postGameContinueChiliChili
);

/**
 * @swagger
 * /game/chiliChili/play:
 *   put:
 *     summary: Finish game
 *     tags: [ChiliChili]
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
router.put("/play", chiliChili.gameDoneMiddlewareChiliChili, game.postGameDoneChiliChili);

/**
 * @swagger
 * /game/chiliChili/resume:
 *   get:
 *     summary: Resume ChiliChili Game
 *     tags: [ChiliChili]
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
router.get("/resume", chiliChili.gameResumeMiddlewareChiliChili, game.postGameResumeChiliChili);

module.exports = router;
