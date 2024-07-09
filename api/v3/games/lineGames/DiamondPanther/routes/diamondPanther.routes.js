const express = require("express");
const game = require("./diamondPanther.controller");

const diamondPanther = require("./diamondPanther.middleware");

const router = express.Router();

/**
 * @swagger
 * /game/diamondPanther/play:
 *   post:
 *     summary: Start base game
 *     tags: [DiamondPanther]
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
router.post("/play", diamondPanther.gamePlayMiddlewareDiamondPanther, game.postGamePlayDiamondPanther);

/**
 * @swagger
 * /game/diamondPanther/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [DiamondPanther]
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
router.post("/continue", diamondPanther.gameContinueMiddlewareDiamondPanther, game.postGameContinueDiamondPanther);

/**
 * @swagger
 * /game/diamondPanther/play:
 *   put:
 *     summary: Finish game
 *     tags: [DiamondPanther]
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
router.put("/play", diamondPanther.gameDoneMiddlewareDiamondPanther, game.postGameDoneDiamondPanther);

/**
 * @swagger
 * /game/diamondPanther/resume:
 *   get:
 *     summary: Resume DiamondPanther Game
 *     tags: [DiamondPanther]
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
router.get("/resume", diamondPanther.gameResumeMiddlewareDiamondPanther, game.postGameResumeDiamondPanther);

module.exports = router;
