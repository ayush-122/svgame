// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const StateUtils = require("../../utils/StateUtils");
const { createReelRandomMap, createReelMap } = require("../../configuration/MainGameReelConfig"); //getting params from main game reel config
const { createBuyReelRandomMap, createBuyReelMap } = require("../../configuration/BuyGameReelConfig"); //getting params from main game reel config
const { paylineWinCalculation } = require("../../payouts/PaylineWining");
const { SymbolGridCreation } = require("../SymbolGrid");
const { changeSymbolCode, expandingWild } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");
const { Scatter } = require("../../utils/Scatter");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { baseGameFixedData } = require("./StateFixedData");

class BaseGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return "BASE_GAME";
  }

  async init(request) {
    // debugger;
    const response = new ResponseGenerator().createNew();
    const isBuyFeature = request.isBuyFeature;
    const responseMap = new Map();

    //Set Credit and Bet Multiplier
    responseMap.set(ResponseConstants.CREDIT_VALUE, request.credits);

    baseGameFixedData(request, isBuyFeature, response);
    const reelSymbols = isBuyFeature ? createBuyReelMap(GameConstant.RtpLevel) : createReelMap(GameConstant.RtpLevel);
    const pools = await new randomPools().createNew(request);
    // pools.reel1_at_0_62 = 77;
    // pools.reel2_at_0_62 = 75;
    // pools.reel3_at_0_62 = 29;
    // pools.reel4_at_0_62 = 63;
    // pools.reel5_at_0_62 = 69;
    // pools.featureRandomStop = 4;

    const reelStops = isBuyFeature
      ? createBuyReelRandomMap(GameConstant.RtpLevel, pools)
      : createReelRandomMap(GameConstant.RtpLevel, pools);

    //Add feature stops and seed
    reelStops.featureRandomStop = pools.featureRandomStop;
    reelStops.rolledData = pools.rolledData;
    responseMap.set(ResponseConstants.REEL_STOPS, reelStops);
    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    ); // add here the buy feature
    const symbolMatrix = symbolGrid.matrixCreation();
    // symbolMatrix[0] = ["H1", "WC", "H1"];
    // symbolMatrix[4] = ["SC", "SC", "SC"];
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);

    let totalwin = 0;
    let returnPaylineData = paylineWinCalculation(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    totalwin += parseFloat(returnPaylineData.totalwin * request.credits);

    // Check For Free Spin
    let countScatter = new Scatter(symbolMatrix, GameConstant.SCATTER_SYMBOL).scatterCount();
    responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, false);
    if (countScatter.count >= 3) {
      responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.SCATTER_COUNT, countScatter.count);
      responseMap.set(ResponseConstants.SCATTER_POSITION, countScatter.position);

      let rewardFreeGame = StateUtils.freeGameCalculation(countScatter.count);
      responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, false);

      if (rewardFreeGame.reward === "FG") {
        responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, true);
        responseMap.set(ResponseConstants.SCATTER_FREE_GAME_TRIGGER, true);
        responseMap.set(ResponseConstants.SCATTER_FREE_SPIN_WON, rewardFreeGame.amount);
        responseMap.set(ResponseConstants.FREE_GAME_TOTAL_FREE_SPIN, rewardFreeGame.totalFreeSpin);
        responseMap.set(ResponseConstants.FREE_GAME_CURRENT_FREE_SPIN, 0);

        if (isBuyFeature) responseMap.set(ResponseConstants.STATE_CURRENT, "BUYFEATURE");
        else responseMap.set(ResponseConstants.STATE_CURRENT, "BASE");

        responseMap.set(ResponseConstants.STATE_NEXT, "FREE");
        responseMap.set(ResponseConstants.NEXT, "FREE");
      }
    }

    //Mark State as Completed
    else {
      responseMap.set(ResponseConstants.STATE_NEXT, "COMPLETED");
      responseMap.set(ResponseConstants.NEXT, "COMPLETED");
    }

    //SECTION -  EXPANDING WILD
    let featureExpandingData = expandingWild(symbolMatrix, pools.featureRandomStop, GameConstant.BASE_FEAT_WEIGHT);
    responseMap.set(ResponseConstants.EXPANDING_WILD, featureExpandingData.expandingReels);
    responseMap.set(ResponseConstants.EXPANDING_POSITION, featureExpandingData.expandingPosition);

    // Feature Reels and Paylines
    let FeatureExpandingReels = StateUtils.symbolGridExpandingReels(symbolMatrix, featureExpandingData.expandingReels);

    //Credits Wagered
    responseMap.set(ResponseConstants.CREDITS_WAGERED, request.credits * GameConstant.BASE_CREDITS_BET);

    if (featureExpandingData.expandingReels.includes(1)) {
      let FeatureReturnPaylineData = paylineWinCalculation(FeatureExpandingReels);
      responseMap.set(ResponseConstants.FEATURE_PAYLINES, FeatureReturnPaylineData.paylineData);
      responseMap.set(ResponseConstants.FEATURE_REELS, changeSymbolCode(FeatureExpandingReels));
      responseMap.set(ResponseConstants.FEATURE_WIN, FeatureReturnPaylineData.totalwin); //TODO - Remove this feature (Just for Emulator)
      totalwin += parseFloat(FeatureReturnPaylineData.totalwin * request.credits);
    } else {
      responseMap.set(ResponseConstants.FEATURE_REELS, symbolMatrix);
      responseMap.set(ResponseConstants.FEATURE_PAYLINES, []);
    }
    //!SECTION

    // FIX NO CHANGE
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, totalwin);
    responseMap.set(ResponseConstants.FINAL_WINNINGS_TOTAL_WON, totalwin);

    // Check for Buy Feature
    if (!isBuyFeature) {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        (totalwin - request.credits * GameConstant.BASE_CREDITS_BET).toFixed(3)
      );
    } else {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        (totalwin - request.credits * GameConstant.BUY_FEATURE_BET).toFixed(3)
      );
    }

    responseMap.set(ResponseConstants.TOTAL_CREDITS_WON, totalwin);

    changeSymbolCode(symbolMatrix);
    // try {
    // } catch (error) {
    //   console.log(error);
    // }
    // changeSymbolCode(FeatureExpandingReels);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createResponse(responseMap, response);
  }
}
module.exports = BaseGameState;
