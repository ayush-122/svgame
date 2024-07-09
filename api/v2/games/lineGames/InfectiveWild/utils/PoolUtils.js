const { SPIN_REQUEST, FREE_GAME_REQUEST } = require("../configuration/GameConstant");
const poolConfig = require("./../configuration/RandomPools");

class randomPools {
  constructor() {}

  async createNew(request) {
    //NOTE - RNG Enable Disable
    let slotRng =
      process.env.FEATURE_RNG == "true"
        ? require("../../../../services/rng/slotRng.service")
        : require("../../../../helpers/rng/spinRng.helper");
    // ! QA TEST ROUTES *******************************************************
    if (process.env.FEATURE_QA == "true") {
      const qatestutil = require("../../../../../../test/qatest/qatest.utils");

      if (await qatestutil.checkAvailability(parseInt(request.playerId), parseInt(request.gameId), request.type)) {
        const record = await qatestutil.getQaTestData(request.playerId, request.gameId, request.type);

        qatestutil.deleteQaTestDataById(record, request.type);

        const randomValues = record.data;
        const list = randomValues.split(",");

        //Convert string to integer
        for (let i = 0; i < list.length; i++) list[i] = parseInt(list[i]);

        //Check if list is of required length
        if (list.length >= 5) {
          if (request.type === SPIN_REQUEST) {
            const baseGamePools = {
              reelPool: list[0],
              1: {
                reel1_at_0_62: list[1],
                reel2_at_0_62: list[2],
                reel3_at_0_62: list[3],
                reel4_at_0_62: list[4],
                reel5_at_0_62: list[5],
              },
              2: {
                reel1_at_0_62: list[6],
                reel2_at_0_62: list[7],
                reel3_at_0_62: list[8],
                reel4_at_0_62: list[9],
                reel5_at_0_62: list[10],
              },
              rolledData: "QA DASHBOARD RANDOM ",
            };
            return baseGamePools;
          } else if (request.type === FREE_GAME_REQUEST) {
            const freeGamePools = {
              reelPool: list[0],
              1: {
                reel1_at_0_62: list[1],
                reel2_at_0_62: list[2],
                reel3_at_0_62: list[3],
                reel4_at_0_62: list[4],
                reel5_at_0_62: list[5],
              },
              2: {
                reel1_at_0_62: list[6],
                reel2_at_0_62: list[7],
                reel3_at_0_62: list[8],
                reel4_at_0_62: list[9],
                reel5_at_0_62: list[10],
              },
              rolledData: "QA DASHBOARD RANDOM ",
            };
            return freeGamePools;
          } else throw "invalid request in pools.";
        }
      }
    }
    // ! QA TEST ROUTES *******************************************************

    if (request.type === SPIN_REQUEST) {
      const { result, rolledData } = await slotRng.getSlotNumbers(poolConfig.baseGameRequest);
      return this.baseGamePools(result, rolledData);
    } else if (request.type === FREE_GAME_REQUEST) {
      const { result, rolledData } = await slotRng.getSlotNumbers(poolConfig.freeGameRequest);
      return this.freeGamePools(result, rolledData);
    } else throw "invalid request in pools.";
  }

  baseGamePools(list, rolledData) {
    const pool = {
      reelPool: list[0],
      1: {
        reel1_at_0_62: list[1],
        reel2_at_0_62: list[2],
        reel3_at_0_62: list[3],
        reel4_at_0_62: list[4],
        reel5_at_0_62: list[5],
      },
      2: {
        reel1_at_0_62: list[6],
        reel2_at_0_62: list[7],
        reel3_at_0_62: list[8],
        reel4_at_0_62: list[9],
        reel5_at_0_62: list[10],
      },
      rolledData: rolledData || "Normal RNG",
    };
    return pool;
  }

  freeGamePools(list, rolledData) {
    const pool = {
      reelPool: list[0],
      1: {
        reel1_at_0_62: list[1],
        reel2_at_0_62: list[2],
        reel3_at_0_62: list[3],
        reel4_at_0_62: list[4],
        reel5_at_0_62: list[5],
      },
      2: {
        reel1_at_0_62: list[6],
        reel2_at_0_62: list[7],
        reel3_at_0_62: list[8],
        reel4_at_0_62: list[9],
        reel5_at_0_62: list[10],
      },
      rolledData: rolledData || "Normal RNG",
    };
    return pool;
  }
}

module.exports = { randomPools };
