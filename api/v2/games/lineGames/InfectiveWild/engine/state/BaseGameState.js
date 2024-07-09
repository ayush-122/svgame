// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const StateUtils = require("../../utils/StateUtils");
const { paylineWinCalculation } = require("../../payouts/PaylineWining");
const { SymbolGridCreation } = require("../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");
const { Scatter } = require("../../utils/Scatter");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { baseGameFixedData } = require("./StateFixedData");
const { checkAndInfectWild } = require("../../utils/InfectUtil");

class BaseGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return GameConstant.SPIN_REQUEST; //"BASE"
  }

  async init(request) {
    const response = new ResponseGenerator().createNew();
    const isBuyFeature = request.isBuyFeature;
    const responseMap = new Map();
    const pools = await new randomPools().createNew(request);

    const REEL_CHOICE = pools.reelPool < 10 ? 1 : 2; //Choose ReelSet and Pool

    const { createReelRandomMap, createReelMap } = require(`../../configuration/BaseGameReelConfig${REEL_CHOICE}`);

    const { createBuyReelRandomMap, createBuyReelMap } = require("../../configuration/BuyGameReelConfig"); //getting params from main game reel config

    //Set Credit and Bet Multiplier
    responseMap.set(ResponseConstants.CREDIT_VALUE, request.credits);

    baseGameFixedData(request, isBuyFeature, response);
    const reelSymbols = isBuyFeature ? createBuyReelMap(GameConstant.RTP_LEVEL) : createReelMap(GameConstant.RTP_LEVEL);

    const reelStops = isBuyFeature
      ? createBuyReelRandomMap(GameConstant.RTP_LEVEL, pools[REEL_CHOICE])
      : createReelRandomMap(GameConstant.RTP_LEVEL, pools[REEL_CHOICE]);

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
    let symbolMatrix = symbolGrid.matrixCreation();
    symbolMatrix = [
      ["JJ", "JJ", "WD", "AA", "BB"],
      ["AA", "JJ", "JJ", "WD", "AA"],
      ["JJ", "JJ", "JJ", "DD", "DD"],
      ["EE", "EE", "GG", "GG", "GG"],
      ["BB", "BB", "BB", "FF", "FF"],
    ];
    let winMatrix = symbolMatrix;
    // symbolMatrix[0] = ["H1", "WC", "H1"];
    // symbolMatrix[4] = ["SC", "SC", "SC"];
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);

    //SECTION -  INFECTIVE WILD
    let featureInfectiveData = checkAndInfectWild(symbolMatrix);
    responseMap.set(ResponseConstants.INFECTIVE_WILD, featureInfectiveData.wildPositions);
    responseMap.set(ResponseConstants.INFECTIVE_POSITION, featureInfectiveData.infectionOrder);

    // Feature Reels and Paylines
    let FeatureInfectedReels = featureInfectiveData.newMatrix;

    //Credits Wagered
    responseMap.set(ResponseConstants.CREDITS_WAGERED, request.credits * GameConstant.BASE_CREDITS_BET);

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

    let totalwin = 0;
    let returnPaylineData = paylineWinCalculation(winMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    totalwin += parseFloat(returnPaylineData.totalwin * request.credits);

    //SECTION - //? FREE GAME
    let countScatter = new Scatter(symbolMatrix, GameConstant.SCATTER_SYMBOL).scatterCount();
    responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, false);
    if (countScatter.count >= 10) {
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

        if (isBuyFeature) responseMap.set(ResponseConstants.STATE_CURRENT, GameConstant.BUY_FEATURE_SPIN_REQUEST);
        else responseMap.set(ResponseConstants.STATE_CURRENT, GameConstant.SPIN_REQUEST);

        responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.FREE_GAME_REQUEST);
        responseMap.set(ResponseConstants.NEXT, GameConstant.FREE_GAME_REQUEST);
      }
    }
    //!SECTION

    //Mark State as Completed
    else {
      responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.DONE_REQUEST);
      responseMap.set(ResponseConstants.NEXT, GameConstant.DONE_REQUEST);
    }

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

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createResponse(responseMap, response);
  }
}
module.exports = BaseGameState;
