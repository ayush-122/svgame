const {
  SPIN_REQUEST,
  FREE_GAME_REQUEST,
  WHEEL_BONUS_REQUEST,
  RESPIN_REQUEST,
} = require("../configuration/GameConstant");
const poolConfig = require("./../configuration/RandomPools");

class randomPools {
  constructor() {}

  async createNew(request) {
    //NOTE - RNG Enable Disable
    let slotRng =
      process.env.FEATURE_RNG == "true"
        ? require("../../../../api/v1/services/rng/slotRng.service")
        : require("../../../../api/v1/helpers/rng/spinRng.helper");
    // // ! QA TEST ROUTES *******************************************************
    // if (process.env.FEATURE_QA == "true") {
    //   const qatestutil = require("../../../../test/qatest/qatest.utils");

    //   if (await qatestutil.checkAvailability(parseInt(request.playerId), parseInt(request.gameId), request.type)) {
    //     const record = await qatestutil.getQaTestData(request.playerId, request.gameId, request.type);

    //     qatestutil.deleteQaTestDataById(record, request.type);

    //     const randomValues = record.data;
    //     const list = randomValues.split(",");

    //     //Check if list is of required length
    //     if ((request.type == "WHEEL_BONUS" && list.length == 1) || list.length >= 5) {
    //       if (request.type === SPIN_REQUEST) {
    //         const baseGamePools = {
    //           reel1_at_0_62: parseInt(list[0]),
    //           reel2_at_0_62: parseInt(list[1]),
    //           reel3_at_0_62: parseInt(list[2]),
    //           reel4_at_0_62: parseInt(list[3]),
    //           reel5_at_0_62: parseInt(list[4]),
    //           featureRandomStop: parseInt(list[5]),
    //         };
    //         return baseGamePools;
    //       } else if (request.type === FREE_GAME_REQUEST) {
    //         const freeGamePools = {
    //           reel1_at_0_62: parseInt(list[0]),
    //           reel2_at_0_62: parseInt(list[1]),
    //           reel3_at_0_62: parseInt(list[2]),
    //           reel4_at_0_62: parseInt(list[3]),
    //           reel5_at_0_62: parseInt(list[4]),
    //           featureRandomStop: parseInt(list[5]),
    //         };
    //         return freeGamePools;
    //       } else if (request.type === WHEEL_BONUS_REQUEST) {
    //         const wheelBonusPools = {
    //           wheelTrigger1_at_0_62: parseInt(list[0]),
    //         };
    //         console.log(wheelBonusPools);
    //         return wheelBonusPools;
    //       } else throw "invalid request in pools.";
    //     }
    //   }
    // }

    // // ! QA TEST ROUTES *******************************************************

    if (request.type === SPIN_REQUEST) {
      const { result } = await slotRng.getSlotNumbers(poolConfig.baseGameRequest);
      return this.baseGamePools(result);
    } else if (request.type === FREE_GAME_REQUEST) {
      const { result } = await slotRng.getSlotNumbers(poolConfig.freeGameRequest);
      return this.freeGamePools(result);
    } else if (request.type === WHEEL_BONUS_REQUEST) {
      const { result } = await slotRng.getSlotNumbers(poolConfig.wheelGameRequest);
      return this.wheelBonusPools(result);
    } else if (request.type === RESPIN_REQUEST) {
      const { result } = await slotRng.getSlotNumbers(poolConfig.respinGameRequest);
      return this.respinGamePools(result);
    } else throw "invalid request in pools.";
  }

  baseGamePools(list) {
    const pool = {
      reel1_at_0_62: list[0],
      reel2_at_0_62: list[1],
      reel3_at_0_62: list[2],
      reel4_at_0_62: list[3],
      reel5_at_0_62: list[4],
      featureRandomStop: Math.floor(Math.random() * 100),
    };
    return pool;
  }

  freeGamePools(list) {
    const pool = {
      reel1_at_0_62: list[0],
      reel2_at_0_62: list[1],
      reel3_at_0_62: list[2],
      reel4_at_0_62: list[3],
      reel5_at_0_62: list[4],
      featureRandomStop: Math.floor(Math.random() * 100),
    };
    return pool;
  }

  respinGamePools(list) {
    const pool = {
      reel1_at_0_62: list[0],
      reel2_at_0_62: list[1],
      reel3_at_0_62: list[2],
      reel4_at_0_62: list[3],
      reel5_at_0_62: list[4],
      featureRandomStop: Math.floor(Math.random() * 100),
    };
    return pool;
  }

  wheelBonusPools(list) {
    const pool = {
      wheelTrigger1_at_0_62: list[0],
    };
    return pool;
  }
}

module.exports = { randomPools };
