const express = require("express");
const game = require("./infectiveWild.controller");

const infectiveWild = require("./infectiveWild.middleware");

const router = express.Router();

/**
 * @swagger
 * /game/infectiveWild/play:
 *   post:
 *     summary: Start base game
 *     tags: [InfectiveWild]
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
router.post("/play", infectiveWild.gamePlayMiddlewareInfectiveWild, game.postGamePlayInfectiveWild);

/**
 * @swagger
 * /game/infectiveWild/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [InfectiveWild]
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
router.post("/continue", infectiveWild.gameContinueMiddlewareInfectiveWild, game.postGameContinueInfectiveWild);

/**
 * @swagger
 * /game/infectiveWild/play:
 *   put:
 *     summary: Finish game
 *     tags: [InfectiveWild]
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
router.put("/play", infectiveWild.gameDoneMiddlewareInfectiveWild, game.postGameDoneInfectiveWild);

/**
 * @swagger
 * /game/infectiveWild/resume:
 *   get:
 *     summary: Resume InfectiveWild Game
 *     tags: [InfectiveWild]
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
router.get("/resume", infectiveWild.gameResumeMiddlewareInfectiveWild, game.postGameResumeInfectiveWild);

module.exports = router;
