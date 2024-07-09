let express = require("express");
const game = require("./monkeyKeno.controller");
const monkeyKeno = require("./monkeyKeno.middleware");
const isAuthenticated = require("../../../../api/v1/middleware/authMiddleware/isAuthenticated");
let router = express.Router();

/**
 * @swagger
 * /game/monkeyKeno/play:
 *   post:
 *     summary: Start base game
 *     tags: [Monkey Keno]
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
 *               betNumbers:
 *                 type: array
 *                 example: [27,5,21,9,13,29,24,35,32,25]
 *                 description: Bet Values to be added here
 *               bet:
 *                 type: integer
 *                 example: 40
 *                 description: The bet amount.
 *               riskLevel:
 *                 type: string
 *                 example: "LOW"
 *                 description: Can have values "HIGH" / "LOW" / "MEDIUM" / "CLASSIC",
 *     responses:
 *       200:
 *         description: Successful operation. Returns player details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/KenoSchema'
 *       400:
 *         $ref: '#/components/responses/IncorrectParameters'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//BASE GAME
router.post(
  "/play",
  isAuthenticated,
  monkeyKeno.gamePlayMiddlewareMonkeyKeno,
  game.postGamePlayKeno
);

/**
 * @swagger
 * /game/monkeyKeno/play:
 *   put:
 *     summary: Finish game
 *     tags: [Monkey Keno]
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
router.put(
  "/play",
  isAuthenticated,
  monkeyKeno.gameDoneMiddlewareMonkeyKeno,
  game.postGameDoneKeno
);

module.exports = router;
