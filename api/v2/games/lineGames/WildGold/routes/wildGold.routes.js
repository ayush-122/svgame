const express = require("express");
const game = require("./wildGold.controller");

const wildGold = require("./wildGold.middleware");

const router = express.Router();

/**
 * @swagger
 * /game/wildGold/play:
 *   post:
 *     summary: Start base game
 *     tags: [WildGold]
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
router.post("/play", wildGold.gamePlayMiddlewareWildGold, game.postGamePlayWildGold);

/**
 * @swagger
 * /game/wildGold/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [WildGold]
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
router.post("/continue", wildGold.gameContinueMiddlewareWildGold, game.postGameContinueWildGold);

/**
 * @swagger
 * /game/wildGold/play:
 *   put:
 *     summary: Finish game
 *     tags: [WildGold]
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
router.put("/play", wildGold.gameDoneMiddlewareWildGold, game.postGameDoneWildGold);

/**
 * @swagger
 * /game/wildGold/resume:
 *   get:
 *     summary: Resume WildGold Game
 *     tags: [WildGold]
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
router.get("/resume", wildGold.gameResumeMiddlewareWildGold, game.postGameResumeWildGold);

module.exports = router;
