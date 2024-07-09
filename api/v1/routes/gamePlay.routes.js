const express = require("express");
const gamePlayController = require("../controllers/gameplay.controller");
// const buffalo = require("../../../games/lineGames/Buffalo/routes/buffalo.routes");
// const diamondPanther = require("../../../games/lineGames/DiamondPanther/routes/diamondPanther.routes");
// const monkeyKeno = require("../../../games/Keno/MonkeyKeno/routes/monkeyKeno.routes");
const cowboyKeno = require("../../../games/Keno/CowboyKeno/routes/cowboyKeno.routes");
const milkyWays = require("../../../games/Cascade/MilkyWays/routes/milkyways.routes");
const goldenEagle = require("../../../games/Ways/GoldenEagle/routes/goldenEagle.routes");
// const chiliChili = require("../../../games/lineGames/ChilliChilli/routes/chiliChili.routes");
// const wildGold = require("../../../games/lineGames/WildGold/routes/wildGold.routes");
// const samuraiFortune = require("../../../games/lineGames/SamuraiFortune/routes/samuraiFortune.routes");
// const sweepStake = require("../../../games/lineGames/SweepStake/routes/sweepStake.routes");
// const bookOfEgypt = require("../../../games/lineGames/BookOfEgypt/routes/bookOfEgypt.routes");
// const rollingRocking = require("../../../games/lineGames/RollingRocking/routes/rollingRocking.routes");
// const saintPatrick = require("../../../games/lineGames/SaintPatrick/routes/saintPatrick.routes");
// const fireShortInferno = require("../../../games/lineGames/FireShortInferno/routes/fireShortInferno.routes");
// const bunnyBunny = require("../../../games/lineGames/BunnyBunny/routes/bunnyBunny.routes");
// const thunderGod = require("../../../games/lineGames/ThunderGod/routes/thunderGod.routes");
// const stampedeFury = require("../../../games/lineGames/StampedeFury/routes/stampedeFury.routes");
// const fruitFiesta = require("../../../games/lineGames/FruitFiesta/routes/fruitFiesta.routes");

let router = express.Router();

const isAuthenticated = require("../middleware/authMiddleware/isAuthenticated");

// //Buffalo Routes
// router.use("/buffalo", buffalo);

// // Diamond Panther Routes
// router.use("/diamond-panther", diamondPanther);

// // Samurai's Fortune Routes
// router.use("/samuraiFortune", samuraiFortune);

// // Sweep Stake Routes
// router.use("/sweepStake", sweepStake);

// // Book Of Egypt
// router.use("/bookOfEgypt", bookOfEgypt);

// // Rolling Rocking Routes
// router.use("/rollingRocking", rollingRocking);

// // Saint Patrick Routes
// router.use("/saintPatrick", saintPatrick);

// // FireShortInferno Routes
// router.use("/fireShortInferno", fireShortInferno);

// // Bunny Bunny Routes
// router.use("/bunnyBunny", bunnyBunny);

// // Thunder God Routes
// router.use("/thunderGod", thunderGod);

// // StampedeFury Routes
// router.use("/stampedeFury", stampedeFury);

// // Fruit Fiesta Routes
// router.use("/fruitFiesta", fruitFiesta);

// //Chili Chili Routes
// router.use("/chiliChili", chiliChili);

// //Wild Gold Routes
// router.use("/wildGold", wildGold);

// //Monkey Keno Routes
// router.use("/monkeyKeno", monkeyKeno);

//Monkey Keno Routes
router.use("/cowboyKeno", cowboyKeno);

//Milky Ways Routes
router.use("/milkyWays", milkyWays);

//Golden Eagle Routes
router.use("/goldenEagle", goldenEagle);

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
