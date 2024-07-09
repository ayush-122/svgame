// FreeGameState.js
const GameConstant = require("../../configuration/GameConstant");
const { createFreeReelRandomMap, createReelMap } = require("../../configuration/FreeGameReelConfig"); //getting params from main game reel config
const { waysPayout } = require("../../payouts/WaysWinning");
const { SymbolGridCreation } = require("./../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { GameState } = require("./GameState");

class FreeGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for FreeGameState
  }

  name() {
    return "FREE_GAME";
  }

  async init(jsonRequestData, previousState) {
    // console.log(previousState);
    const response = new ResponseGenerator().createNew();
    const responseMap = new Map();
    responseMap.set(ResponseConstants.BASE_BET, GameConstant.BASE_CREDITS_BET);
    responseMap.set(ResponseConstants.CREDIT_VALUE, jsonRequestData.credits);
    responseMap.set(ResponseConstants.BET_MULTIPLIER, jsonRequestData.betMultiplier);

    //creating symbol matrix
    const reelSymbols = createReelMap(GameConstant.RTP_LEVEL);

    // ! *****************Data Till Here**************
    const pools = await new randomPools().createNew(jsonRequestData);
    // ! *****************Data Till Here**************

    const reelStops = createFreeReelRandomMap(GameConstant.RTP_LEVEL, pools);

    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    );

    const symbolMatrix = symbolGrid.matrixCreation();
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);
    let freeTotalWon = 0;
    let returnPaylineData = waysPayout(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    freeTotalWon += returnPaylineData.totalWin;

    //base
    const baseGameWon = previousState.mainSpinCreditsWon;
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, baseGameWon);

    //free Spin Credit Won
    // responseMap.set(ResponseConstants.CURRENT_SPIN_CREDITS_WON, freeTotalWon * jsonRequestData.credits);
    responseMap.set(ResponseConstants.FREE_SPIN_CREDITS_WON, freeTotalWon * jsonRequestData.credits);
    responseMap.set(
      ResponseConstants.FREE_SPIN_TOTAL_WON,
      freeTotalWon + previousState.freeSpinTotalWon || 0
    );

    responseMap.set(
      ResponseConstants.TOTAL_CREDITS_WON,
      freeTotalWon + previousState.freeSpinTotalWon + previousState.mainSpinCreditsWon
    );

    responseMap.set(ResponseConstants.FREE_GAME_CURRENT_FREE_SPIN, previousState.freeGame.currentFreeSpin + 1);
    responseMap.set(ResponseConstants.FREE_GAME_TOTAL_FREE_SPIN, previousState.freeGame.totalFreeSpin);

    // Change next to Completed
    if (previousState.freeGame.currentFreeSpin >= previousState.freeGame.totalFreeSpin - 1) {
      responseMap.set(ResponseConstants.STATE_CURRENT, "FREE");
      responseMap.set(ResponseConstants.STATE_NEXT, "COMPLETED");
      responseMap.set(ResponseConstants.NEXT, "COMPLETED");
    } else {
      responseMap.set(ResponseConstants.STATE_CURRENT, "FREE");
      responseMap.set(ResponseConstants.STATE_NEXT, "FREE");
      responseMap.set(ResponseConstants.NEXT, "FREE");
    }

    const freeGameTotalWon =
      (freeTotalWon + previousState.freeSpinTotalWon + previousState.mainSpinCreditsWon) *
      jsonRequestData.credits;

    responseMap.set(
      ResponseConstants.FINAL_WINNINGS_TOTAL_WON,
      previousState.totalCreditsWon + freeTotalWon * jsonRequestData.credits
    );
    responseMap.set(ResponseConstants.FREE_GAME_TOTAL_WON, freeGameTotalWon);
    responseMap.set(ResponseConstants.CREDITS_WAGERED, GameConstant.BASE_CREDITS_BET * jsonRequestData.credits);
    const finalWinningsNet = parseFloat(
      (
        (freeTotalWon + previousState.freeSpinTotalWon + previousState.mainSpinCreditsWon) *
          jsonRequestData.credits -
        jsonRequestData.credits * GameConstant.BASE_CREDITS_BET
      ).toFixed(4)
    );
    responseMap.set(ResponseConstants.FINAL_WINNINGS_NET, finalWinningsNet);
    // console.log(symbolMatrix);
    changeSymbolCode(symbolMatrix);
    // changeSymbolCode(FeatureExpandingReels);

    return new ResponseGenerator().createFreeResponse(responseMap, response);
  }
}

module.exports = FreeGameState;
