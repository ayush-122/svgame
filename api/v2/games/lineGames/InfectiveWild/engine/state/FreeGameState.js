// FreeGameState.js
const GameConstant = require("../../configuration/GameConstant");
const { paylineWinCalculation } = require("../../payouts/PaylineWining");
const { SymbolGridCreation } = require("./../SymbolGrid");
const { changeSymbolCode, stickWild } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { GameState } = require("./GameState");
const { checkAndInfectWild } = require("../../utils/InfectUtil");

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

    // ! *****************Data Till Here*****************************
    const pools = await new randomPools().createNew(jsonRequestData);
    // ! *****************Data Till Here*****************************

    const REEL_CHOICE = pools.reelPool < 10 ? 1 : 2; //Choose ReelSet and Pool
    const { createFreeReelRandomMap, createReelMap } = require(`../../configuration/FreeGameReelConfig${REEL_CHOICE}`);

    responseMap.set(ResponseConstants.CREDIT_VALUE, jsonRequestData.credits);
    responseMap.set(ResponseConstants.BET_MULTIPLIER, jsonRequestData.betMultiplier);
    responseMap.set(ResponseConstants.BASE_GAME_WON, previousState.mainSpinCreditsWon);

    //creating symbol matrix
    const reelSymbols = createReelMap(GameConstant.RTP_LEVEL);
    const reelStops = createFreeReelRandomMap(GameConstant.RTP_LEVEL, pools[REEL_CHOICE]);

    //Add feature stops and seed
    reelStops.featureRandomStop = pools.featureRandomStop;
    reelStops.rolledData = pools.rolledData;
    responseMap.set(ResponseConstants.REEL_STOPS, reelStops);

    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    );
    let symbolMatrix = symbolGrid.matrixCreation();
    // Add Sticky Wild
    let wildPositions = [];
    if (previousState.freeGame.currentFreeSpin > 0) {
      wildPositions = previousState.infectiveWildFeature.infectiveWild;
      symbolMatrix = stickWild(symbolMatrix, wildPositions);
    }
    let winMatrix = symbolMatrix;
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);

    //SECTION -  INFECTIVE WILD
    let featureInfectiveData = checkAndInfectWild(symbolMatrix);
    responseMap.set(ResponseConstants.INFECTIVE_WILD, featureInfectiveData.wildPositions);
    responseMap.set(ResponseConstants.INFECTIVE_POSITION, featureInfectiveData.infectionOrder);

    // Feature Reels and Paylines
    let FeatureInfectedReels = featureInfectiveData.newMatrix;

    //Credits Wagered
    responseMap.set(ResponseConstants.CREDITS_WAGERED, jsonRequestData.credits * GameConstant.BASE_CREDITS_BET);

    if (featureInfectiveData.isFeatureTrigger) {
      console.log(FeatureInfectedReels);
      console.log(featureInfectiveData.infectionOrder);
      winMatrix = JSON.parse(JSON.stringify(FeatureInfectedReels));
      // responseMap.set(ResponseConstants.MATRIX, symbolMatrix);
      // let FeatureReturnPaylineData = paylineWinCalculation(FeatureInfectedReels);
      // responseMap.set(ResponseConstants.FEATURE_PAYLINES, FeatureReturnPaylineData.paylineData);
      responseMap.set(ResponseConstants.FEATURE_REELS, changeSymbolCode(FeatureInfectedReels));
      // responseMap.set(ResponseConstants.FEATURE_WIN, FeatureReturnPaylineData.totalwin); //TODO - Remove this feature (Just for Emulator)
      // totalwin += parseFloat(FeatureReturnPaylineData.totalwin * request.credits);
    } else {
      responseMap.set(ResponseConstants.FEATURE_REELS, []);
      // responseMap.set(ResponseConstants.FEATURE_PAYLINES, []);
      responseMap.set(ResponseConstants.INFECTIVE_WILD, []);
      responseMap.set(ResponseConstants.INFECTIVE_POSITION, []);
    }
    //!SECTION

    let freeTotalWon = 0;
    
    let returnPaylineData = paylineWinCalculation(winMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    freeTotalWon += parseFloat(returnPaylineData.totalwin * jsonRequestData.credits);

    //base
    const baseGameWon = previousState.mainSpinCreditsWon;
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, baseGameWon);
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
