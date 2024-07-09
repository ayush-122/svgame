const { SPIN_REQUEST, FREE_GAME_REQUEST, EXTRA_DRAW, WHEEL_BONUS_REQUEST } = require("../configuration/GameConstant");
const poolConfig = require("./../configuration/RandomPools");

class randomPools {
  constructor() {}

  async createNew(request) {
    // ! QA TEST ROUTES *******************************************************
    if (process.env.FEATURE_QA == "true") {
      const qaTestUtil = require("../../../../test/qatest/qatest.utils");

      if (await qaTestUtil.checkAvailability(parseInt(request.playerId), parseInt(request.gameId), request.type)) {
        const record = await qaTestUtil.getQaTestData(request.playerId, request.gameId, request.type);

        qaTestUtil.deleteQaTestDataById(record, request.type);

        const randomValues = record.data;
        const list = randomValues.split(",").map((value) => parseInt(value.trim()));

        //list.length>=8 && list.length<=30

        if (list.length <= 26) {
          //Base Game
          if (request.type === SPIN_REQUEST && list.length === 26) {
            const featurePool = list.slice(0, 6);
            const kenoPool = list.slice(6);
            return { kenoPool, featurePool };
          }
          //Free Game
          else if (request.type === FREE_GAME_REQUEST && list.length === 26) {
            const featurePool = list.slice(0, 6);
            const kenoPool = list.slice(6);
            return { kenoPool, featurePool };
          }

          //EXTRA DRAW
          else if (request.type === EXTRA_DRAW && list.length >= 8 && list.length <= 30) {
            const kenoPool = list.slice(0, request.extraDrawCount);
            return { kenoPool };
          }
          //WHEEL BONUS
          else if (request.type === WHEEL_BONUS_REQUEST && list.length == 1) {
            const result = list[0];
            return result;
          } else throw "invalid request in pools.";
        }
      }
    }
    // ! QA TEST ROUTES *******************************************************

    //NOTE - RNG Enable Disable
    let kenoRng =
      // process.env.FEATURE_RNG == "true"
      //   ? require("../../../../api/v1/services/rng/kenoRng.service"):
      require("../../../../api/v1/helpers/rng/kenoRng.helper");
    let slotRng =
      // process.env.FEATURE_RNG == "true"
      //   ? require("../../../../api/v1/services/rng/slotRng.service"):
      require("../../../../api/v1/helpers/rng/spinRng.helper");

    if (request.type === SPIN_REQUEST) {
      const { kenoNumbers, featureNumbers } = poolConfig.baseGameRequest;
      const kenoPromise = kenoRng.getKenoNumbers(
        kenoNumbers.min_number,
        kenoNumbers.max_number,
        kenoNumbers.draw_count
      );

      const featurePromise = slotRng.getSlotNumbers(featureNumbers);

      let [kenoPool, featurePool] = await Promise.all([kenoPromise, featurePromise]);

      featurePool = featurePool.result;

      return { kenoPool, featurePool };
    } else if (request.type === FREE_GAME_REQUEST) {
      const { kenoNumbers, featureNumbers } = poolConfig.baseGameRequest;
      const kenoPromise = kenoRng.getKenoNumbers(
        kenoNumbers.min_number,
        kenoNumbers.max_number,
        kenoNumbers.draw_count
      );

      const featurePromise = slotRng.getSlotNumbers(featureNumbers);

      let [kenoPool, featurePool] = await Promise.all([kenoPromise, featurePromise]);

      featurePool = featurePool.result;

      return { kenoPool, featurePool };
    } else if (request.type === EXTRA_DRAW) {
      // console.log(request.extraDrawCount);
      const { kenoNumbers } = poolConfig.extraDrawRequest(request.currentExtraDraw);
      // let drawnNumbers = request.drawnNumbers;
      const kenoPool = await kenoRng.getExcludingKenoNumbers(
        kenoNumbers.min_number,
        kenoNumbers.max_number,
        kenoNumbers.draw_count,
        request.drawnNumbers
      );

      // //Check for duplicate elements in array kenoPool and request.drawnNumbers
      // const duplicates = kenoPool.filter((num) => drawnNumbers.includes(num));
      // console.log(duplicates);
      return { kenoPool };
    } else if (request.type === WHEEL_BONUS_REQUEST) {
      // let slotRng =
      //   process.env.FEATURE_RNG == "true"
      //     ? require("../../../../api/v1/services/rng/slotRng.service")
      //     : require("../../../../api/v1/helpers/rng/spinRng.helper");
      const { result } = await slotRng.getSlotNumbers(poolConfig.bonusGameRequest);
      return result[0];
    } else throw "invalid request in pools.";
  }
}

module.exports = { randomPools };
