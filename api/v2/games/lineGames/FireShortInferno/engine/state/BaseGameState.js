// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const StateUtils = require("../../utils/StateUtils");

const { createReelRandomMap, createReelMap } = require("../../configuration/MainGameReelConfig"); //getting params from main game reel config
const { createBuyReelRandomMap, createBuyReelMap } = require("../../configuration/BuyGameReelConfig"); //getting params from main game reel config
const { paylineWinCalculation } = require("../../payouts/PaylineWining");
const { SymbolGridCreation } = require("../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");

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
    responseMap.set(ResponseConstants.CREDITS_WAGERED, request.credits * GameConstant.BASE_CREDITS_BET);

    baseGameFixedData(request, isBuyFeature, response);
    const reelSymbols = isBuyFeature ? createBuyReelMap(GameConstant.RtpLevel) : createReelMap(GameConstant.RtpLevel);
    const pools = await new randomPools().createNew(request);

    const reelStops = isBuyFeature
      ? createBuyReelRandomMap(GameConstant.RtpLevel, pools)
      : createReelRandomMap(GameConstant.RtpLevel, pools);
    responseMap.set(ResponseConstants.REEL_STOPS, reelStops);
    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    ); // add here the buy feature
    const symbolMatrix = symbolGrid.matrixCreation();
    // symbolMatrix[0] = ["H1", "WC", "H1"];
  //  symbolMatrix[4] = ["BN", "BN", "BN"];
    // symbolMatrix[4] = ["BO", "BO", "BO"];
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);

    let totalwin = 0;
    let returnPaylineData = paylineWinCalculation(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    totalwin += parseFloat(returnPaylineData.totalwin * request.credits);

    let countScatter = new Scatter(symbolMatrix, GameConstant.SCATTER_SYMBOL).scatterCount();
    let countBonus = new Scatter(symbolMatrix, GameConstant.BONUS_SYMBOL).scatterCount(); // ! Counting Bonus

    responseMap.set(ResponseConstants.SCATTER_DATA_PRESENT, false);

    //Check For Respin
    if (countBonus.count >= 3) {
      responseMap.set(ResponseConstants.BONUS_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.BONUS_COUNT, countBonus.count);
      responseMap.set(ResponseConstants.BONUS_POSITION, countBonus.position);

      let rewardRespinGame = StateUtils.countRespinBonus(countBonus.count);

      if (rewardRespinGame.reward === "RB") {
        responseMap.set(ResponseConstants.RESPIN_GAME_TOTAL_SPIN, rewardRespinGame.totalRespinBonus);
        responseMap.set(ResponseConstants.RESPIN_GAME_CURRENT_SPIN, 0);

        if (isBuyFeature) responseMap.set(ResponseConstants.STATE_CURRENT, "BUYFEATURE");
        else responseMap.set(ResponseConstants.STATE_CURRENT, "BASE");

        responseMap.set(ResponseConstants.STATE_NEXT, "RESPIN");
        responseMap.set(ResponseConstants.NEXT, "RESPIN");
      }

      responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.RESPIN_REQUEST);
      responseMap.set(ResponseConstants.NEXT, GameConstant.RESPIN_REQUEST);
    }

    // Check For Free Spin
    else if (countScatter.count >= 3) {
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
      responseMap.set(ResponseConstants.STATE_CURRENT, "BASE");
    }

    // FIX NO CHANGE
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

    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, totalwin);
    responseMap.set(ResponseConstants.TOTAL_CREDITS_WON, totalwin);

    changeSymbolCode(symbolMatrix);
    // changeSymbolCode(FeatureExpandingReels);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createResponse(responseMap, response);
  }
}
module.exports = BaseGameState;