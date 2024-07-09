// FreeGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const { SymbolGridCreation } = require("../SymbolGrid");
const { changeSymbolCode, FindPositionOfStars, calculatedStarMultiplier } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { waysWinCalculation } = require("../../payouts/WaysWinning");
const { removeWiningPosition, pushDownSymbols, fillBlankPositions } = require("../../payouts/CascadeWining");
const { createFreeReelRandomMap, createFreeReelMap } = require("../../configuration/FreeGameReelConfig1");
const { createStarReelRandomMap } = require("../../configuration/StarMainGameReelConfig1");
 
 
class FreeGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return "FREE_GAME";
  }

  async init(jsonRequestData, previousState) {
    console.log("free request : ",jsonRequestData);
    const response = new ResponseGenerator().createNew();
    const responseMap = new Map();
  
    //pools for free game
    const pools = await new randomPools().createNew(jsonRequestData);
    console.log("star multiplier weight", pools.star_multiplier_weight);
    
    //Set Credit and Bet Multiplier
    responseMap.set(ResponseConstants.CREDIT_VALUE, jsonRequestData.credits);
    responseMap.set(ResponseConstants.BASE_GAME_WON, previousState.mainSpinCreditsWon);
    
    const reelSymbols = createFreeReelMap(GameConstant.RtpLevel);
    const reelStops = createFreeReelRandomMap(GameConstant.RtpLevel, pools[0]);

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
    );  
    const starSymbolMatrix = starSymbolGrid.starMatrixCreation(starReelStops);

    let positionOfStars = FindPositionOfStars(starSymbolMatrix);
    let starMultiplier  = 0;
    let starCount = positionOfStars.elementCount; 

    if(starCount>6){
      starMultiplier = calculatedStarMultiplier(starCount,pools[0]);
    }
    console.log(starMultiplier);
    responseMap.set(ResponseConstants.REEL_STAR_POSITION, positionOfStars);
    responseMap.set(ResponseConstants.MATRIX, this.matrixToObject(symbolMatrix));

    let freeTotalWon = 0;
    let returnPaylineData = waysWinCalculation(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    freeTotalWon += parseFloat(returnPaylineData.totalWin*jsonRequestData.credits);
   
    let cluster = {};
    let cascadeFreeTotalWin = 0;
    let cascadeCount = 1;

    if (freeTotalWon > 0) {
      let cascadeProgress = true;
      let winningPosition = returnPaylineData.winningPositions;
      let copiedMatrix = symbolMatrix.map((row) => [...row]);
      while (cascadeProgress) {
        removeWiningPosition(copiedMatrix, winningPosition);
        const updatedMatrix = pushDownSymbols(copiedMatrix);

        const reelSymbolsForTumbling = createFreeReelMap(GameConstant.RtpLevel);

        const reelStopsForTumbling = createFreeReelRandomMap(GameConstant.RtpLevel, pools[cascadeCount]);

          createFreeReelRandomMap(GameConstant.RtpLevel, pools[cascadeCount]);

        const symbolGrid = new SymbolGridCreation(
          GameConstant.DISPLAY_HEIGHT,
          GameConstant.NUM_REELS,
          reelSymbolsForTumbling,
          reelStopsForTumbling
        ); // add here the buy feature
        const symbolMatrixForTumbling = symbolGrid.matrixCreation();
        // symbolMatrixForTumbling[0][0] = "AA";
        // symbolMatrixForTumbling[1][1] = "AA";
        // symbolMatrixForTumbling[2][2] = "AA";
        // symbolMatrixForTumbling[3][3] = "AA";

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
        cascadeFreeTotalWin = cascadeFreeTotalWin + returnPaylineData1.totalWin;
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
     
    freeTotalWon += parseFloat(cascadeFreeTotalWin*jsonRequestData.credits);
    //free Spin Credit Won
    responseMap.set(ResponseConstants.FREE_SPIN_CREDITS_WON, freeTotalWon);
    responseMap.set(ResponseConstants.FREE_SPIN_TOTAL_WON, freeTotalWon + previousState.freeSpinTotalWon);
    responseMap.set(ResponseConstants.CASCADE_FREE_TOTAL_WON,cascadeFreeTotalWin);
    responseMap.set(ResponseConstants.STAR_DATA_PRESENT, false);

     // Check For Free Spin
     if (positionOfStars.elementCount >= 3) {
      responseMap.set(ResponseConstants.STAR_DATA_PRESENT, true);
      responseMap.set(ResponseConstants.STAR_COUNT, positionOfStars.elementCount);
      responseMap.set(ResponseConstants.STAR_POSITION, positionOfStars.matrixDataPos);
   }
    //update the current free spin
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
  

    // FIX NO CHANGE
    responseMap.set(ResponseConstants.FINAL_WINNINGS_TOTAL_WON, freeTotalWon * jsonRequestData.credits);

 
    responseMap.set(
        ResponseConstants.FINAL_WINNINGS_NET,
        (freeTotalWon * jsonRequestData.credits - jsonRequestData.credits * GameConstant.BASE_CREDITS_BET).toFixed(3)
      );
    
    changeSymbolCode(symbolMatrix);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createFreeResponse(responseMap, response);
  }

  matrixToObject(matrix) {
    const obj = {};
    for (let i = 0; i < matrix.length; i++) {
      obj[i + 1] = matrix[i];
    }
    return obj;
  }
}
module.exports = FreeGameState;
