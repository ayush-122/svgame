// const {
//   TOTAL_CREDITS_WON,
//   MAIN_SPIN_CREDITS_WON,
//   FINAL_WINNINGS_NET,
//   FINAL_WINNINGS_TOTAL_WON,
//   NEXT,
//   STATE_NEXT,
//   STATE_CURRENT,
// } = require("./ResponseConstants");

const { DRAWN_NUMBERS, WIN_NUMBERS, TOTAL_BET, TOTAL_WON, PAYOUT_MULTIPLIER } = require("./ResponseConstants");

class ResponseGenerator {
  constructor() {}

  createNew() {
    const responseJson = {
      gameId: null,
      balance: null,
      balanceType: "WALLET",
      drawnNumbers: [
        // 10 numbers coming from UI
      ],
      winNumbers: [
        // Winning Numbers
      ],
      payoutMultiplier: 0.0,
      totalWon: 0.0,
      totalBet: 0.0,
      win: 0.0,
      provablyFair: {
        serverSeed: "d7b183e0-f7b5-4980-a9d8-3b85c842663f",
        playerSeed: "test",
        initialShuffle:
          "32,24,33,9,18,13,3,31,37,20,39,38,16,1,29,19,6,14,22,2,7,21,35,4,40,15,36,10,34,30,28,26,5,25,11,27,12,8,17,23",
        finalShuffle:
          "22,1,37,17,38,4,27,24,2,28,35,16,39,19,13,3,36,40,11,25,12,23,14,31,34,18,21,20,7,26,29,15,10,33,6,5,32,9,30,8",
        hash: "619693d8e47bd671ac457e71d27a1b41db19ecf811bc4ad6ed138e95b692bceb",
        blockCount: 1,
      },
      winCoef: 0.0,
      protocolVersion: 1,
    };
    return responseJson;
  }

  createResponse(responseMap, response) {
    response.drawnNumbers = responseMap.get(DRAWN_NUMBERS); //setting reels
    response.winNumbers = responseMap.get(WIN_NUMBERS); // matrix
    response.totalWon = responseMap.get(TOTAL_WON); //paylines
    response.totalBet = responseMap.get(TOTAL_BET);
    response.win = responseMap.get(TOTAL_WON);
    response.payoutMultiplier = responseMap.get(PAYOUT_MULTIPLIER);

    return response;
  }

  // createFreeResponse(responseMap, response) {

  //   return response;
  // }
}

module.exports = { ResponseGenerator };
