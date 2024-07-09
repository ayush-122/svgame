// routes/buffalo.routes.js
const express = require("express");
const buffalo = require("./buffalo.middleware");
const router = express.Router();

const game = require("./buffalo.controller");

/**
 * @swagger
 * /game/buffalo/play:
 *   post:
 *     summary: Start base game
 *     tags: [Buffalo]
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
router.post("/play", buffalo.gamePlayMiddlewareBuffalo, game.postGamePlayBuffalo);

/**
 * @swagger
 * /game/buffalo/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [Buffalo]
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
router.post("/continue", buffalo.gameContinueMiddlewareBuffalo, game.postGameContinueBuffalo);

/**
 * @swagger
 * /game/buffalo/play:
 *   put:
 *     summary: Finish game
 *     tags: [Buffalo]
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
router.put("/play", buffalo.gameDoneMiddlewareBuffalo, game.postGameDoneBuffalo);

/**
 * @swagger
 * /game/buffalo/resume:
 *   get:
 *     summary: Resume Buffalo Game
 *     tags: [Buffalo]
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
router.get("/resume", buffalo.gameResumeMiddlewareBuffalo, game.postGameResumeBuffalo);

module.exports = router;
