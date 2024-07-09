// FreeGameState.js
const GameConstant = require("../../configuration/GameConstant");
const { createFreeReelRandomMap, createReelMap } = require("../../configuration/FreeGameReelConfig"); //getting params from main game reel config
const { paylineWinCalculation } = require("../../payouts/PaylineWining");
const { SymbolGridCreation } = require("./../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { GameState } = require("./GameState");
const StateUtils = require("../../utils/StateUtils");
const { expandingWild } = require("../../utils/SlotConstFunct");

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
    freeTotalWon += parseFloat(returnPaylineData.totalwin * jsonRequestData.credits);

    //base
    const baseGameWon = previousState.mainSpinCreditsWon;
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, baseGameWon);

    //SECTION -  EXPANDING WILD
    let featureExpandingData = expandingWild(symbolMatrix, pools.featureRandomStop, GameConstant.FREE_FEAT_WEIGHT);
    responseMap.set(ResponseConstants.EXPANDING_WILD, featureExpandingData.expandingReels);
    responseMap.set(ResponseConstants.EXPANDING_POSITION, featureExpandingData.expandingPosition);

    // Feature Reels and Paylines
    let FeatureExpandingReels = StateUtils.symbolGridExpandingReels(symbolMatrix, featureExpandingData.expandingReels);

    if (featureExpandingData.expandingReels.includes(1)) {
      let FeatureReturnPaylineData = paylineWinCalculation(FeatureExpandingReels);
      responseMap.set(ResponseConstants.FEATURE_PAYLINES, FeatureReturnPaylineData.paylineData);
      responseMap.set(ResponseConstants.FEATURE_REELS, changeSymbolCode(FeatureExpandingReels));
      responseMap.set(ResponseConstants.FEATURE_WIN, FeatureReturnPaylineData.totalwin); //TODO - Remove this feature (Just for Emulator)
      freeTotalWon += parseFloat(FeatureReturnPaylineData.totalwin * jsonRequestData.credits);
    } else {
      responseMap.set(ResponseConstants.FEATURE_REELS, symbolMatrix);
      responseMap.set(ResponseConstants.FEATURE_PAYLINES, []);
    }
    //!SECTION

    //free Spin Credit Won
    responseMap.set(ResponseConstants.FREE_SPIN_CREDITS_WON, freeTotalWon);
    responseMap.set(ResponseConstants.FREE_SPIN_TOTAL_WON, freeTotalWon + previousState.freeGame.freeSpinTotalWon);

    responseMap.set(
      ResponseConstants.TOTAL_CREDITS_WON,
      freeTotalWon + previousState.freeGame.freeSpinTotalWon + previousState.totalCreditsWon
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

    const freeGameTotalWon = freeTotalWon + previousState.freeGame.freeSpinTotalWon + previousState.mainSpinCreditsWon;

    responseMap.set(ResponseConstants.FREE_GAME_TOTAL_WON, freeGameTotalWon);
    const finalWinningsNet = (
      freeTotalWon +
      previousState.freeGame.freeSpinTotalWon +
      previousState.mainSpinCreditsWon -
      jsonRequestData.credits * GameConstant.BASE_CREDITS_BET
    ).toFixed(4);
    responseMap.set(ResponseConstants.FINAL_WINNINGS_NET, finalWinningsNet);

    //Credits Wagered
    responseMap.set(ResponseConstants.CREDITS_WAGERED, previousState.creditsWagered);

    changeSymbolCode(symbolMatrix);
    // changeSymbolCode(FeatureExpandingReels);

    return new ResponseGenerator().createFreeResponse(responseMap, response);
  }
}

module.exports = FreeGameState;
