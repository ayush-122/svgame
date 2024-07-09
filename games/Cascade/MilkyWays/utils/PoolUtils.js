const { SPIN_REQUEST, FREE_GAME_REQUEST, MAX_CASCADE_COUNT, NUM_REELS, DISPLAY_HEIGHT } = require("../configuration/GameConstant");
const poolConfig = require("./../configuration/RandomPools");
// const slotRng = require("../../../../api/v1/services/rng/slotRng.service");

class randomPools {
  constructor() {}

  async createNew(request) {
    // // ! QA TEST ROUTES *******************************************************
    let slotRng =
    process.env.FEATURE_RNG == "true"
    ? require("../../../../services/rng/slotRng.service")
    : require("../../../../helpers/rng/spinRng.helper");
        
    if (request.type === SPIN_REQUEST) {
      const { result } = await slotRng.getSlotNumbers(poolConfig.createBaseGameRequest());
      return this.baseGamePools(result);
    } else if (request.type === FREE_GAME_REQUEST) {
      const { result } = await slotRng.getSlotNumbers(poolConfig.createFreeGameRequest());
      return this.freeGamePools(result);
    } else throw "invalid request in pools.";
  }

  baseGamePools(list) {
    const poolSet = { base_reel_weight: list[0] };

    for (let i = 0; i < 1 + MAX_CASCADE_COUNT ; i++) {
      let j = i * 42;
    
      const pool = {
        reel1_at_0_62: list[j + 1],
        reel2_at_0_62: list[j + 2],
        reel3_at_0_62: list[j + 3],
        reel4_at_0_62: list[j + 4],
        reel5_at_0_62: list[j + 5],
        reel6_at_0_62: list[j + 6],
  };
        // Add the star values
      for (let k = 1; k <= NUM_REELS*DISPLAY_HEIGHT; k++) {
      pool[`star${k}_at_0_62`] = list[j + 6 + k];
        }
        poolSet[i] = pool;
    }
    return poolSet;
  }

   freeGamePools(list) {
  //   const pool = {
  //     reel1_at_0_62: list[0],
  //     reel2_at_0_62: list[1],
  //     reel3_at_0_62: list[2],
  //     reel4_at_0_62: list[3],
  //     reel5_at_0_62: list[4],
  //     reel6_at_0_62: list[5],
  //     featureRandomStop: Math.floor(Math.random() * 100),
  //   };
  //   return pool;
  const poolSet = { };

    for (let i = 0; i < 1 + MAX_CASCADE_COUNT ; i++) {
      let j = i * 42;
    
      const pool = {
        reel1_at_0_62: list[j + 1],
        reel2_at_0_62: list[j + 2],
        reel3_at_0_62: list[j + 3],
        reel4_at_0_62: list[j + 4],
        reel5_at_0_62: list[j + 5],
        reel6_at_0_62: list[j + 6],
  };
        // Add the star values
      for (let k = 1; k <= NUM_REELS*DISPLAY_HEIGHT; k++) {
      pool[`star${k}_at_0_62`] = list[j + 6 + k];
        }
        poolSet[i] = pool;
    }
    return poolSet;
  }
}

module.exports = { randomPools };
