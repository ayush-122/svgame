const express = require("express");
const gamePlayController = require("../controllers/gameplay.controller");
const buffalo = require("../games/lineGames/Buffalo/routes/buffalo.routes");
const diamondPanther = require("../games/lineGames/DiamondPanther/routes/diamondPanther.routes");
const monkeyKeno = require("../games/Keno/MonkeyKeno/routes/monkeyKeno.routes");
const cowboyKeno = require("../games/Keno/CowboyKeno/routes/cowboyKeno.routes");
const milkyWays = require("../games/CascadeWays/MilkyWays/routes/milkyways.routes");
const goldenEagle = require("../games/Ways/GoldenEagle/routes/goldenEagle.routes");
const wildGold = require("../games/lineGames/WildGold/routes/wildGold.routes");
const samuraiFortune = require("../games/lineGames/SamuraiFortune/routes/samuraiFortune.routes");
const sweepStake = require("../games/lineGames/SweepStake/routes/sweepStake.routes");
const bookOfEgypt = require("../games/lineGames/BookOfEgypt/routes/bookOfEgypt.routes");
const rollingRocking = require("../games/lineGames/RollingRocking/routes/rollingRocking.routes");
const saintPatrick = require("../games/lineGames/SaintPatrick/routes/saintPatrick.routes");
const fireShortInferno = require("../games/lineGames/FireShortInferno/routes/fireShortInferno.routes");
const bunnyBunny = require("../games/lineGames/BunnyBunny/routes/bunnyBunny.routes");
const thunderGod = require("../games/lineGames/ThunderGod/routes/thunderGod.routes");
const stampedeFury = require("../games/lineGames/StampedeFury/routes/stampedeFury.routes");
const fruitFiesta = require("../games/lineGames/FruitFiesta/routes/fruitFiesta.routes");
const infectiveWild = require("../games/lineGames/InfectiveWild/routes/infectiveWild.routes");
const chiliChiliNew = require("../games/lineGames/ChiliChili/routes/chiliChili.routes");

let router = express.Router();

const isAuthenticated = require("../middleware/authMiddleware/isAuthenticated");

//Buffalo Routes
router.use("/buffalo", isAuthenticated, buffalo);

// Diamond Panther Routes
router.use("/diamond-panther", isAuthenticated, diamondPanther);

// Samurai's Fortune Routes
router.use("/samuraiFortune", isAuthenticated, samuraiFortune);

// Sweep Stake Routes
router.use("/sweepStake", isAuthenticated, sweepStake);

// Book Of Egypt
router.use("/bookOfEgypt", isAuthenticated, bookOfEgypt);

// Rolling Rocking Routes
router.use("/rollingRocking", isAuthenticated, rollingRocking);

// Saint Patrick Routes
router.use("/saintPatrick", isAuthenticated, saintPatrick);

// FireShortInferno Routes
router.use("/fireShortInferno", isAuthenticated, fireShortInferno);

// Bunny Bunny Routes
router.use("/bunnyBunny", isAuthenticated, bunnyBunny);

// Thunder God Routes
router.use("/thunderGod", isAuthenticated, thunderGod);

// StampedeFury Routes
router.use("/stampedeFury", isAuthenticated, stampedeFury);

// Fruit Fiesta Routes
router.use("/fruitFiesta", isAuthenticated, fruitFiesta);

//Chili Chili Routes
router.use("/chiliChili", isAuthenticated, chiliChiliNew);

//Wild Gold Routes
router.use("/wildGold", isAuthenticated, wildGold);

//Wild Gold Routes
router.use("/infectiveWild", isAuthenticated, infectiveWild);

//Monkey Keno Routes
router.use("/monkeyKeno", isAuthenticated, monkeyKeno);

//Cowboy Keno Routes
router.use("/cowboyKeno", isAuthenticated, cowboyKeno);

//Milky Ways Routes
router.use("/milkyWays", isAuthenticated, milkyWays);

//Golden Eagle Routes
router.use("/goldenEagle", isAuthenticated, goldenEagle);

/**
 * @swagger
 * /game/resume:
 *   get:
 *     summary: Resume Game
 *     tags: [Resume]
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
router.get("/resume", isAuthenticated, gamePlayController.postResume);

module.exports = router;
