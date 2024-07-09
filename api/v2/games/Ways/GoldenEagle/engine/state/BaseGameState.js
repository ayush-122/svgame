// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const StateUtils = require("../../configuration/StateUtilsConfig");

const { createReelRandomMap, createReelMap } = require("../../configuration/MainGameReelConfig"); //getting params from main game reel config
const { createBuyReelRandomMap, createBuyReelMap } = require("../../configuration/BuyGameReelConfig"); //getting params from main game reel config
const { waysPayout } = require("../../payouts/WaysWinning");
const { SymbolGridCreation } = require("../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");

const { randomPools } = require("../../utils/PoolUtils");
const { Scatter } = require("../../utils/Scatter");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const FeatureConfig = require("../../configuration/FeatureConfig");

class BaseGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
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

    //TODO - Fixed Data
    responseMap.set(ResponseConstants.BASE_BET, GameConstant.BASE_CREDITS_BET);
    responseMap.set(ResponseConstants.STATE_CURRENT, "BASE");
    const reelSymbols = isBuyFeature ? createBuyReelMap(GameConstant.RTP_LEVEL) : createReelMap(GameConstant.RTP_LEVEL);
    const pools = await new randomPools().createNew(request);

    const reelStops = isBuyFeature
      ? createBuyReelRandomMap(GameConstant.RTP_LEVEL, pools)
      : createReelRandomMap(GameConstant.RTP_LEVEL, pools);

    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    ); // add here the buy feature

    const symbolMatrix = symbolGrid.matrixCreation();
    // symbolMatrix[0] = ["H1", "WC", "H1"];
    // symbolMatrix[4] = ["SC", "SC", "SC"];
    // symbolMatrix[4] = ["BO", "BO", "BO"];
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);

    let totalwin = 0;
    let returnPaylineData = waysPayout(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    totalwin += returnPaylineData.totalWin;
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, totalwin);

    let countScatter = new Scatter(symbolMatrix, GameConstant.SCATTER_SYMBOL).scatterCount();
    let countBonus = new Scatter(symbolMatrix, GameConstant.BONUS_SYMBOL).scatterCount(); // ! Counting Bonus

    responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, false);

    //Check For Wheel Bonus
    if (FeatureConfig.WHEEL_BONUS && countBonus.count >= FeatureConfig.BONUS_GAME_TRIGGER) {
      responseMap.set(ResponseConstants.BONUS_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.BONUS_COUNT, countBonus.count);
      responseMap.set(ResponseConstants.BONUS_POSITION, countBonus.position);
      responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.RESPIN_REQUEST);
    }

    // Check For Free Spin
    else if (FeatureConfig.FREE_GAME && countScatter.count >= FeatureConfig.FREE_GAME_TRIGGER) {
      responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.SCATTER_COUNT, countScatter.count);
      responseMap.set(ResponseConstants.SCATTER_POSITION, countScatter.position);

      let rewardFreeGame = StateUtils.freeGameCalculation(countScatter.count);
      responseMap.set(ResponseConstants.SCATTER_FREE_GAME_TRIGGER, false);

      if (rewardFreeGame.reward === "FG") {
        responseMap.set(ResponseConstants.SCATTER_FREE_GAME_TRIGGER, true);
        responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, true);
        // responseMap.set(ResponseConstants.SCATTER_FREE_SPIN_WON, rewardFreeGame.amount);
        responseMap.set(ResponseConstants.FREE_SPIN_CREDITS_WON, 0);
        responseMap.set(ResponseConstants.FREE_SPIN_TOTAL_WON, 0);
        responseMap.set(ResponseConstants.FREE_GAME_TOTAL_FREE_SPIN, rewardFreeGame.totalFreeSpin);
        responseMap.set(ResponseConstants.FREE_GAME_CURRENT_FREE_SPIN, 0);

        if (isBuyFeature) responseMap.set(ResponseConstants.STATE_CURRENT, "BUYFEATURE");
        else responseMap.set(ResponseConstants.STATE_CURRENT, "BASE");

        responseMap.set(ResponseConstants.STATE_NEXT, "FREE");
      }
    }

    //Check for Respin
    else if (FeatureConfig.BASE_RESPIN && countBonus.count >= FeatureConfig.BONUS_GAME_TRIGGER) {
      responseMap.set(ResponseConstants.BONUS_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.BONUS_COUNT, countBonus.count);
      responseMap.set(ResponseConstants.BONUS_POSITION, countBonus.position);

      let rewardRespinGame = StateUtils.respinGameCalculation(countBonus.count);
      if (rewardRespinGame.reward === "BRS") {
        responseMap.set(ResponseConstants.IS_REWARD_RESPIN_GAME, true);
        // responseMap.set(ResponseConstants.BONUS_RESPIN_WON, rewardRespinGame.amount);
        responseMap.set(ResponseConstants.RESPIN_GAME_TOTAL_SPIN, rewardRespinGame.totalRespinSpin);
        responseMap.set(ResponseConstants.RESPIN_GAME_CURRENT_SPIN, 0);
        responseMap.set(ResponseConstants.RESPIN_SPIN_CREDITS_WON, 0);
        responseMap.set(ResponseConstants.RESPIN_GAME_TOTAL_WON, 0);
        if (isBuyFeature) responseMap.set(ResponseConstants.STATE_CURRENT, "BUYFEATURE");
        else responseMap.set(ResponseConstants.STATE_CURRENT, "BASE");

        responseMap.set(ResponseConstants.STATE_NEXT, "RESPIN");
      }
    }

    //Mark State as Completed
    else {
      responseMap.set(ResponseConstants.STATE_NEXT, "COMPLETED");
      responseMap.set(ResponseConstants.NEXT, "COMPLETED");
    }

    // FIX NO CHANGE
    responseMap.set(ResponseConstants.FINAL_WINNINGS_TOTAL_WON, totalwin * request.credits);
    responseMap.set(ResponseConstants.CREDITS_WAGERED, GameConstant.BASE_CREDITS_BET * request.credits);
    responseMap.set(ResponseConstants.BET_MULTIPLIER, 1);

    // Check for Buy Feature
    if (!isBuyFeature) {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        parseFloat((totalwin * request.credits - request.credits * GameConstant.BASE_CREDITS_BET).toFixed(3))
      );
    } else {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        parseFloat((totalwin * request.credits - request.credits * GameConstant.BUY_FEATURE_BET).toFixed(3))
      );
    }

    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, totalwin);
    // responseMap.set(ResponseConstants.CURRENT_SPIN_CREDITS_WON, totalwin);
    responseMap.set(ResponseConstants.TOTAL_CREDITS_WON, totalwin);

    try {
      changeSymbolCode(symbolMatrix);
    } catch (error) {
      console.log("RandomPool: ", pools);
      console.log("symbolMatrix: ", symbolMatrix);
    }
    // changeSymbolCode(FeatureExpandingReels);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createResponse(responseMap, response);
  }
}
module.exports = BaseGameState;
