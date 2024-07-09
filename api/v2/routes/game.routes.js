const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
//TODO - Authentication Middleware to be added

/**
 * @swagger
 * /admin/game:
 *   post:
 *     summary: Create a New Game
 *     tags: [Game]
 *     description: This API is used to Create a New Game in Database 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: integer
 *                 example: 1001
 *                 description: GameId of Game.
 *               game_name:
 *                 type: string
 *                 example: buffalo
 *                 description: Name of The Game.
 *               type:
 *                 type: string
 *                 example: slot
 *                 description: Type of the Game.

 *     responses:
 *       200:
 *         description: Successful operation. Creates a New Game.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/GameData'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
//Route to Create a Game
router.post(
  "/",
  (req, res) => {
    res.send("For backend Use Only");
  },
  gameController.createGame
); //NOTE - Disabled

/**
 * @swagger
 * /admin/game/{id}:
 *   get:
 *     summary: Get Game Details
 *     tags: [Game]
 *     description: Retrieve details of a game using its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the game to retrieve
 *     responses:
 *       200:
 *         description: Successful operation. Returns the details of the game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameData'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

//Route to Get Game Details
router.get("/:id", gameController.getGameById);

/**
 * @swagger
 * /admin/game:
 *   get:
 *     summary: Get All Games
 *     tags: [Game]
 *     description: Retrieve All Games
 *     responses:
 *       200:
 *         description: Successful operation. Returns List of all games.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GameData'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

//Route to Get Game Details
router.get("/", gameController.getGames);

module.exports = router;
