const {
  SPIN_REQUEST,
  FREE_GAME_REQUEST,
  WHEEL_BONUS_REQUEST,
  RtpLevel
} = require("./GameConstant");

class randomPools {
  constructor() { }

  async createNew(request) {
    // ! QA TEST ROUTES *******************************************************
    const qatestutil = require("../../../../test/qatest/qatest.utils");

    if (
      await qatestutil.checkAvailability(
        parseInt(request.playerId),
        parseInt(request.gameId),
        request.type
      )
    ) {
      const record = await qatestutil.getQaTestData(
        request.playerId,
        request.gameId,
        request.type
      );

      qatestutil.deleteQaTestDataById(record, request.type);

      const randomValues = record.data;
      const list = randomValues.split(",");

      if (request.type === SPIN_REQUEST) {
        const baseGamePools = {
          reel1_at_0_62: parseInt(list[0]),
          reel2_at_0_62: parseInt(list[1]),
          reel3_at_0_62: parseInt(list[2]),
          reel4_at_0_62: parseInt(list[3]),
          reel5_at_0_62: parseInt(list[4]),
          featureRandomStop: parseInt(list[5])
        };
        return baseGamePools;
      } else if (request.type === FREE_GAME_REQUEST) {
        const freeGamePools = {
          reel1_at_0_62: parseInt(list[0]),
          reel2_at_0_62: parseInt(list[1]),
          reel3_at_0_62: parseInt(list[2]),
          reel4_at_0_62: parseInt(list[3]),
          reel5_at_0_62: parseInt(list[4]),
          featureRandomStop: parseInt(list[5])
        };
        return freeGamePools;
      } else if (request.type === WHEEL_BONUS_REQUEST) {
        const wheelBonusPools = {
          wheelTrigger1_at_0_62: parseInt(list[0])
        };
        console.log(wheelBonusPools);
        return wheelBonusPools;
      } else throw "invalid request in pools.";
    }

    // ! QA TEST ROUTES *******************************************************

    const rtpLength = {
      1: [78, 77, 76, 73, 68], 
      2: [78, 77, 76, 73, 69],  
      3: [79, 77, 76, 73, 72], 
      4: [78, 77, 76, 73, 68],
      5: [78, 77, 76, 73, 68],
    }

    const rtpLengthFreeGame = {
      1: [46, 45, 41, 45, 44],
      2: [41, 38, 37, 40, 37],
      3: [40, 46, 47, 45, 44],
      4: [47, 47, 45, 52, 47],
      5: [43, 45, 45, 44, 44],
    }

    const baseGamePools = {
      reel1_at_0_62: Math.floor(Math.random() * rtpLength[RtpLevel][0]),
      reel2_at_0_62: Math.floor(Math.random() * rtpLength[RtpLevel][1]),
      reel3_at_0_62: Math.floor(Math.random() * rtpLength[RtpLevel][2]),
      reel4_at_0_62: Math.floor(Math.random() * rtpLength[RtpLevel][3]),
      reel5_at_0_62: Math.floor(Math.random() * rtpLength[RtpLevel][4]),
      featureRandomStop: Math.floor(Math.random() * 100)
    };

    const freeGamePools = {
      reel1_at_0_62: Math.floor(Math.random() * rtpLengthFreeGame[RtpLevel][0]),
      reel2_at_0_62: Math.floor(Math.random() * rtpLengthFreeGame[RtpLevel][1]),
      reel3_at_0_62: Math.floor(Math.random() * rtpLengthFreeGame[RtpLevel][2]),
      reel4_at_0_62: Math.floor(Math.random() * rtpLengthFreeGame[RtpLevel][3]),
      reel5_at_0_62: Math.floor(Math.random() * rtpLengthFreeGame[RtpLevel][4]),
      featureRandomStop: Math.floor(Math.random() * 100)
    };

    const wheelBonusPools = {
      wheelTrigger1_at_0_62: Math.floor(Math.random() * 1000)
    };

    if (request.type === SPIN_REQUEST) {
      return baseGamePools;
    } else if (request.type === FREE_GAME_REQUEST) {
      return freeGamePools;
    } else if (request.type === WHEEL_BONUS_REQUEST) {
      return wheelBonusPools;
    } else throw "invalid request in pools.";
  }
}

module.exports = { randomPools };
