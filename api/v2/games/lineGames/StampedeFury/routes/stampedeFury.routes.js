const express = require("express");
const game = require("./stampedeFury.controller");

const stampedeFury = require("./stampedeFury.middleware");

const router = express.Router();

/**
 * @swagger
 * /game/stampedeFury/play:
 *   post:
 *     summary: Start base game
 *     tags: [StampedeFury]
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
router.post("/play", stampedeFury.gamePlayMiddlewareStampedeFury, game.postGamePlayStampedeFury);

/**
 * @swagger
 * /game/stampedeFury/continue:
 *   post:
 *     summary: Continue free game
 *     tags: [StampedeFury]
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

  stampedeFury.gameContinueMiddlewareStampedeFury,
  game.postGameContinueStampedeFury
);

/**
 * @swagger
 * /game/stampedeFury/play:
 *   put:
 *     summary: Finish game
 *     tags: [StampedeFury]
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
router.put("/play", stampedeFury.gameDoneMiddlewareStampedeFury, game.postGameDoneStampedeFury);

/**
 * @swagger
 * /game/stampedeFury/resume:
 *   get:
 *     summary: Resume StampedeFury Game
 *     tags: [StampedeFury]
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
router.get("/resume", stampedeFury.gameResumeMiddlewareStampedeFury, game.postGameResumeStampedeFury);

module.exports = router;
