// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const StateUtils = require("../../utils/StateUtils");
const { createBuyReelRandomMap, createBuyReelMap } = require("../../configuration/BuyGameReelConfig"); //getting params from main game reel config
const { SymbolGridCreation } = require("../SymbolGrid");
const { changeSymbolCode, FindPositionOfStars } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { baseGameFixedData } = require("./StateFixedData");
const { waysWinCalculation } = require("../../payouts/WaysWinning");
const { removeWiningPosition, pushDownSymbols, fillBlankPositions } = require("../../payouts/CascadeWining");
 
const { createStarReelRandomMap } = require("../../configuration/StarMainGameReelConfig1");

class BaseGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return "BASE_GAME";
  }

  async init(request) {
    console.log("base request : ",request);
    const response = new ResponseGenerator().createNew();
    const isBuyFeature = request.isBuyFeature;
    const responseMap = new Map();
    const pools = await new randomPools().createNew(request);
    
    const { createReelRandomMap, createReelMap } =
      pools.base_reel_weight < 50
        ? require("../../configuration/MainGameReelConfig1")
        : require("../../configuration/MainGameReelConfig2"); //need to change the values

    //Set Credit and Bet Multiplier
     responseMap.set(ResponseConstants.CREDIT_VALUE, request.credits);

    baseGameFixedData(request, isBuyFeature, response);
    const reelSymbols = isBuyFeature ? createBuyReelMap(GameConstant.RtpLevel) : createReelMap(GameConstant.RtpLevel);

    const reelStops = isBuyFeature
      ? createBuyReelRandomMap(GameConstant.RtpLevel, pools[0])
      : createReelRandomMap(GameConstant.RtpLevel, pools[0]);
     
    const log_reelstops = JSON.stringify(reelStops);
    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    );  
    const symbolMatrix = symbolGrid.matrixCreation();

    // star reels
    const starReelStops = createStarReelRandomMap(GameConstant.RtpLevel, pools[0]);
    const starReelSymbols = null;

    const starSymbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      starReelSymbols,
      starReelStops
    ); // add here the buy feature
    const starSymbolMatrix = starSymbolGrid.starMatrixCreation(starReelStops);

    let positionOfStars = FindPositionOfStars(starSymbolMatrix);

    responseMap.set(ResponseConstants.REEL_STAR_POSITION, positionOfStars);
    responseMap.set(ResponseConstants.MATRIX, this.matrixToObject(symbolMatrix));

    let totalWin = 0;
    let returnPaylineData = waysWinCalculation(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    totalWin += parseFloat(returnPaylineData.totalWin * request.credits);

    let cluster = {};
    let cascadeTotalWin = 0;
    let cascadeCount = 1;
    if (totalWin > 0) {
      let cascadeProgress = true;
      let winningPosition = returnPaylineData.winningPositions;
      let copiedMatrix = symbolMatrix.map((row) => [...row]);
      while (cascadeProgress) {
        removeWiningPosition(copiedMatrix, winningPosition);
        const updatedMatrix = pushDownSymbols(copiedMatrix);

        baseGameFixedData(request, isBuyFeature, response);
        const reelSymbolsForTumbling = isBuyFeature
          ? createReelRandomMap(GameConstant.RtpLevel)
          : createReelMap(GameConstant.RtpLevel);

        const reelStopsForTumbling = isBuyFeature
          ? createBuyReelRandomMap(GameConstant.RtpLevel, pools[cascadeCount])
          : createReelRandomMap(GameConstant.RtpLevel, pools[cascadeCount]);

        createReelRandomMap(GameConstant.RtpLevel, pools[cascadeCount]);

        const symbolGrid = new SymbolGridCreation(
          GameConstant.DISPLAY_HEIGHT,
          GameConstant.NUM_REELS,
          reelSymbolsForTumbling,
          reelStopsForTumbling
        ); // add here the buy feature
        const symbolMatrixForTumbling = symbolGrid.matrixCreation();
        symbolMatrixForTumbling[0][0] = "AA";
        symbolMatrixForTumbling[1][1] = "AA";
        symbolMatrixForTumbling[2][2] = "AA";
        symbolMatrixForTumbling[3][3] = "AA";

        // console.log(symbolMatrixForTumbling);
        const finalSymbolGrid = fillBlankPositions(updatedMatrix, symbolMatrixForTumbling);
        let returnPaylineData1 = waysWinCalculation(finalSymbolGrid.matrix);

        let CascadeProgressD = {
          cascadeId: 0,
          matrix: [],
          payline: [],
          cascade: [], //2,3,1,2,3,3
          won: 0,
        };
        CascadeProgressD.cascadeId = cascadeCount;

        const finalM = finalSymbolGrid.matrix.map((row) => [...row]);

        CascadeProgressD.matrix = this.matrixToObject(changeSymbolCode(finalM));
        CascadeProgressD.cascade = this.matrixToObject(changeSymbolCode(finalSymbolGrid.InsertSymbol));
        CascadeProgressD.payline = returnPaylineData1.paylineData;
        CascadeProgressD.won = returnPaylineData1.totalWin;
        cascadeTotalWin = cascadeTotalWin + returnPaylineData1.totalWin;
        cluster[cascadeCount] = CascadeProgressD;
         
        copiedMatrix = finalSymbolGrid.matrix;

        winningPosition.slice(0, 0);

        winningPosition = returnPaylineData1.winningPositions;

        if (returnPaylineData1.totalWin == 0) {
          cascadeProgress = false;
        }
        responseMap.set(ResponseConstants.CASCADEPROGRESS, cluster);

        cascadeCount++;
        if (cascadeCount == 8) break;
      }
    }
    totalWin+=parseFloat(cascadeTotalWin*request.credits);
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, totalWin);
    responseMap.set(ResponseConstants.CASCADE_TOTAL_WON, cascadeTotalWin);
    responseMap.set(ResponseConstants.STAR_DATA_PRESENT, false);

    // Check For Free Spin
    if (positionOfStars.elementCount >= 3) {
      responseMap.set(ResponseConstants.STAR_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.STAR_COUNT, positionOfStars.elementCount);
      responseMap.set(ResponseConstants.STAR_POSITION, positionOfStars.matrixDataPos);

      let rewardFreeGame = StateUtils.freeGameCalculation(positionOfStars.elementCount);
      responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, false);

      if (rewardFreeGame.reward === "FG") {
        responseMap.set(ResponseConstants.IS_REWARD_FREE_GAME, true);
        responseMap.set(ResponseConstants.STAR_FREE_GAME_TRIGGER, true);
        responseMap.set(ResponseConstants.STAR_FREE_SPIN_WON, rewardFreeGame.amount);
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

    // FIX NO CHANGE
    responseMap.set(ResponseConstants.FINAL_WINNINGS_TOTAL_WON, totalWin * request.credits);

    // Check for Buy Feature
    if (!isBuyFeature) {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        (totalWin * request.credits - request.credits * GameConstant.BASE_CREDITS_BET).toFixed(3)
      );
    } else {
      responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        (totalWin * request.credits - request.credits * GameConstant.BUY_FEATURE_BET).toFixed(3)
      );
    }

    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, totalWin);
    responseMap.set(ResponseConstants.TOTAL_CREDITS_WON, totalWin);
    console.log(symbolMatrix); // remove later
    console.log(log_reelstops);// remove later
    changeSymbolCode(symbolMatrix);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createResponse(responseMap, response);
  }

  matrixToObject(matrix) {
    const obj = {};
    for (let i = 0; i < matrix.length; i++) {
      obj[i + 1] = matrix[i];
    }
    return obj;
  }
}
module.exports = BaseGameState;
