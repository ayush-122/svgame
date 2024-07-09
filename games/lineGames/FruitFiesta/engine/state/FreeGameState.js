// FreeGameState.js
const GameConstant = require("../../configuration/GameConstant");
const { createFreeReelRandomMap, createReelMap } = require("../../configuration/FreeGameReelConfig"); //getting params from main game reel config
const { paylineWinCalculation } = require("../../payouts/PaylineWining");
const { SymbolGridCreation } = require("./../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");
const { Scatter } = require("../../utils/Scatter");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { GameState } = require("./GameState");
const StateUtils = require("../../utils/StateUtils");

class FreeGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for FreeGameState
  }

  name() {
    return "FREE_GAME";
  }

  async init(jsonRequestData, previousState) {
    const response = new ResponseGenerator().createNew();
    const responseMap = new Map();

    responseMap.set(ResponseConstants.CREDIT_VALUE, jsonRequestData.credits);
    responseMap.set(ResponseConstants.BET_MULTIPLIER, jsonRequestData.betMultiplier);
    responseMap.set(ResponseConstants.BASE_GAME_WON, previousState.mainSpinCreditsWon);

    //creating symbol matrix
    const reelSymbols = createReelMap(GameConstant.RtpLevel);

    // ! *****************Data Till Here**************
    const pools = await new randomPools().createNew(jsonRequestData);
    // ! *****************Data Till Here**************
    // const pools = new randomPools().createNew();

    const reelStops = createFreeReelRandomMap(GameConstant.RtpLevel, pools);

    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    );

    const symbolMatrix = symbolGrid.matrixCreation();
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);
    let freeTotalWon = 0;
    let returnPaylineData = paylineWinCalculation(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    freeTotalWon += returnPaylineData.totalwin;

    //base
    const baseGameWon = previousState.mainSpinCreditsWon;
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, baseGameWon);

    //SECTION -  FREE GAME RETRIGGER
    // symbolMatrix[4] = ["BN", "BN", "BN"];
    let countScatter = new Scatter(symbolMatrix, GameConstant.SCATTER_SYMBOL).scatterCount();
    responseMap.set(ResponseConstants.IS_FREE_GAME_RETRIGGER, false);

    if (countScatter.count >= 3) {
      responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.SCATTER_COUNT, countScatter.count);
      responseMap.set(ResponseConstants.SCATTER_POSITION, countScatter.position);

      let rewardFreeGame = StateUtils.freeGameRetriggerCalculation(countScatter.count);
      responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, false);

      if (rewardFreeGame.reward === "FGR") {
        responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, true);
        responseMap.set(ResponseConstants.IS_FREE_GAME_RETRIGGER, true);
        responseMap.set(ResponseConstants.SCATTER_FREE_GAME_TRIGGER, true);
        responseMap.set(ResponseConstants.SCATTER_FREE_SPIN_WON, rewardFreeGame.amount);
        previousState.freeGame.totalFreeSpin += rewardFreeGame.totalFreeSpin;
      }
    }
    //!SECTION

    //free Spin Credit Won
    responseMap.set(ResponseConstants.FREE_SPIN_CREDITS_WON, freeTotalWon);
    responseMap.set(ResponseConstants.FREE_SPIN_TOTAL_WON, freeTotalWon + previousState.freeSpinTotalWon);

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
      (freeTotalWon + previousState.freeSpinTotalWon + previousState.mainSpinCreditsWon) * jsonRequestData.credits;

    responseMap.set(ResponseConstants.FREE_GAME_TOTAL_WON, freeGameTotalWon);
    const finalWinningsNet = (
      (freeTotalWon + previousState.freeSpinTotalWon + previousState.mainSpinCreditsWon) * jsonRequestData.credits -
      jsonRequestData.credits * GameConstant.BASE_CREDITS_BET
    ).toFixed(4);
    responseMap.set(ResponseConstants.FINAL_WINNINGS_NET, finalWinningsNet);
    // console.log(symbolMatrix);
    changeSymbolCode(symbolMatrix);
    // changeSymbolCode(FeatureExpandingReels);

    return new ResponseGenerator().createFreeResponse(responseMap, response);
  }
}

module.exports = FreeGameState;
