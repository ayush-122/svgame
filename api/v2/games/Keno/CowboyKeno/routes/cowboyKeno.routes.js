let express = require("express");
const game = require("./cowboyKeno.controller");
const cowboyKeno = require("./cowboyKeno.middleware");

let router = express.Router();

/**
 * @swagger
 * /game/cowboyKeno/play:
 *   post:
 *     summary: Start base game
 *     description: |
 *       Symbols are of these Values:
 *       - SKULL Symbols (S1, S2, S3, S4, S5)
 *       - HAT Symbols (H1, H2, H3, H4)
 *       - GUN Symbols (G1, G2)
 *       - BULLATE Symbols (B1, B2, B3)
 *       - WILD Symbols (WD)
 *       - BONUS MULTIPLIER (CN)
 *     tags: [Cowboy Keno]
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
 *                 description: The credits to play [1, 5, 10, 15, 20, 25, 50, 75, 100].
 *               betNumbers:
 *                 type: array
 *                 example: [27,5,21,9,13,29,24,35,32,25]
 *                 description: Bet Values to be added here
 *               bet:
 *                 type: integer
 *                 example: 2
 *                 description: The bet amount.
 *               numberCount:
 *                 type: integer
 *                 example: 10
 *                 description: The bet amount.
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureKenoSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//BASE GAME
router.post("/play", cowboyKeno.gamePlayMiddlewareCowboyKeno, game.postGamePlayKeno);

/**
 * @swagger
 * /game/cowboyKeno/free:
 *   post:
 *     summary: Start Free Game
 *     description: |
 *       Symbols are of these Values:
 *       - SKULL Symbols (S1, S2, S3, S4, S5)
 *       - HAT Symbols (H1, H2, H3, H4)
 *       - GUN Symbols (G1, G2)
 *       - BULLATE Symbols (B1, B2, B3)
 *       - WILD Symbols (WD)
 *       - BONUS MULTIPLIER (CN)
 *     tags: [Cowboy Keno]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               betNumbers:
 *                 type: array
 *                 example: [27,5,21,9,13,29,24,35,32,25]
 *                 description: Bet Values to be added here
 *               numberCount:
 *                 type: integer
 *                 example: 10
 *                 description: The bet amount.
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureKenoSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//FREE GAME
router.post("/free", cowboyKeno.gameFreeMiddlewareCowboyKeno, game.postFreeKeno);

/**
 * @swagger
 * /game/cowboyKeno/continue:
 *   post:
 *     summary: Start Extra Draw / Wheel Bonus
 *     description: |
 *       Symbols are of these Values:
 *       - SKULL Symbols (S1, S2, S3, S4, S5)
 *       - HAT Symbols (H1, H2, H3, H4)
 *       - GUN Symbols (G1, G2)
 *       - BULLATE Symbols (B1, B2, B3)
 *       - WILD Symbols (WD)
 *       - BONUS MULTIPLIER (CN)
 *     tags: [Cowboy Keno]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 example: EXTRA_DRAW
 *                 description: The State for which request is made.
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureKenoSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//CONTINUE GAME
router.post("/continue", cowboyKeno.gameContinueMiddlewareCowboyKeno, game.postContinueKeno);

/**
 * @swagger
 * /game/cowboyKeno/continue:
 *   put:
 *     summary: Accept the Wheel Output
 *     description: |
 *       Symbols are of these Values:
 *       - SKULL Symbols (S1, S2, S3, S4, S5)
 *       - HAT Symbols (H1, H2, H3, H4)
 *       - GUN Symbols (G1, G2)
 *       - BULLATE Symbols (B1, B2, B3)
 *       - WILD Symbols (WD)
 *       - BONUS MULTIPLIER (CN)
 *     tags: [Cowboy Keno]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 example: WHEEL_BONUS
 *                 description: The State for which request is made.
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeatureKenoSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//CONTINUE GAME
router.put("/continue", cowboyKeno.gameContinueMiddlewareCowboyKeno, game.postAcceptWheelKeno);

/**
 * @swagger
 * /game/cowboyKeno/play:
 *   put:
 *     summary: Finish game
 *     tags: [Cowboy Keno]
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
router.put("/play", cowboyKeno.gameDoneMiddlewareCowboyKeno, game.postGameDoneKeno);

/**
 * @swagger
 * /game/cowboyKeno/resume:
 *   get:
 *     summary: Resume CowboyKeno Game
 *     tags: [Cowboy Keno]
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
router.get("/resume", cowboyKeno.gameResumeMiddlewareCowboyKeno, game.postGameResumeCowboyKeno);

module.exports = router;
