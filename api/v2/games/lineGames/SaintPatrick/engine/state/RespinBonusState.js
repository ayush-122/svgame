// RespinGameState.js
const GameConstant = require("../../configuration/GameConstant");
const { createRespinReelRandomMap, createReelMap } = require("../../configuration/RespinReelConfig"); //getting params from main game reel config
const { paylineWinCalculation } = require("../../payouts/PaylineWining");
const { SymbolGridCreation } = require("./../SymbolGrid");
const { changeSymbolCode } = require("../../utils/SlotConstFunct");
const { randomPools } = require("../../utils/PoolUtils");

const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { ResponseGenerator } = require("../responseGenerator/Response");
const { GameState } = require("./GameState");

class RespinGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for RespinGameState
  }

  name() {
    return "RESPIN_GAME";
  }

  async init(jsonRequestData, previousState) {
    const response = new ResponseGenerator().createNew();
    const responseMap = new Map();

    responseMap.set(ResponseConstants.CREDIT_VALUE, jsonRequestData.credits);
    responseMap.set(ResponseConstants.BET_MULTIPLIER, jsonRequestData.betMultiplier);
    responseMap.set(ResponseConstants.BASE_GAME_WON, previousState.mainSpinCreditsWon);
    responseMap.set(ResponseConstants.CREDITS_WAGERED, jsonRequestData.credits * GameConstant.BASE_CREDITS_BET);

    //creating symbol matrix
    const reelSymbols = createReelMap(GameConstant.RtpLevel);

    // ! *****************Data Till Here**************
    const pools = await new randomPools().createNew(jsonRequestData);
    // ! *****************Data Till Here**************
    // const pools = new randomPools().createNew();

    const reelStops = createRespinReelRandomMap(GameConstant.RtpLevel, pools);

    const symbolGrid = new SymbolGridCreation(
      GameConstant.DISPLAY_HEIGHT,
      GameConstant.NUM_REELS,
      reelSymbols,
      reelStops
    );

    const symbolMatrix = symbolGrid.matrixCreation();
    responseMap.set(ResponseConstants.MATRIX, symbolMatrix);
    let respinTotalWon = 0;
    let returnPaylineData = paylineWinCalculation(symbolMatrix);
    responseMap.set(ResponseConstants.PAYLINE, returnPaylineData.paylineData);
    respinTotalWon += parseFloat(returnPaylineData.totalwin * jsonRequestData.credits);

    //base
    const baseGameWon = previousState.mainSpinCreditsWon;
    responseMap.set(ResponseConstants.MAIN_SPIN_CREDITS_WON, baseGameWon);

    //respin Spin Credit Won
    responseMap.set(ResponseConstants.RESPIN_SPIN_CREDITS_WON, respinTotalWon);
    responseMap.set(
      ResponseConstants.RESPIN_GAME_TOTAL_WON,
      respinTotalWon + previousState.reSpinGame.baseRespinTotalWon
    );

    responseMap.set(
      ResponseConstants.TOTAL_CREDITS_WON,
      respinTotalWon + previousState.reSpinGame.baseRespinTotalWon + previousState.mainSpinCreditsWon
    );
    responseMap.set(ResponseConstants.RESPIN_GAME_CURRENT_SPIN, previousState.reSpinGame.currentRespin + 1);
    responseMap.set(ResponseConstants.RESPIN_GAME_TOTAL_SPIN, previousState.reSpinGame.totalRespin);

    // Change next to Completed
    if (previousState.reSpinGame.currentRespin >= previousState.reSpinGame.totalRespin - 1) {
      responseMap.set(ResponseConstants.STATE_CURRENT, "RESPIN");
      responseMap.set(ResponseConstants.STATE_NEXT, "COMPLETED");
      responseMap.set(ResponseConstants.NEXT, "COMPLETED");
    } else {
      responseMap.set(ResponseConstants.STATE_CURRENT, "RESPIN");
      responseMap.set(ResponseConstants.STATE_NEXT, "RESPIN");
      responseMap.set(ResponseConstants.NEXT, "RESPIN");
    }

    const baseRespinTotalWon =
      respinTotalWon + previousState.reSpinGame.baseRespinTotalWon + previousState.mainSpinCreditsWon;

    responseMap.set(ResponseConstants.RESPIN_GAME_TOTAL_WON, baseRespinTotalWon);
    const finalWinningsNet = (
      respinTotalWon +
      previousState.reSpinGame.baseRespinTotalWon +
      previousState.mainSpinCreditsWon -
      jsonRequestData.credits * GameConstant.BASE_CREDITS_BET
    ).toFixed(4);
    responseMap.set(ResponseConstants.FINAL_WINNINGS_NET, finalWinningsNet);
    // console.log(symbolMatrix);
    changeSymbolCode(symbolMatrix);
    // changeSymbolCode(FeatureExpandingReels);

    return new ResponseGenerator().createRespinResponse(responseMap, response);
  }
}

module.exports = RespinGameState;
