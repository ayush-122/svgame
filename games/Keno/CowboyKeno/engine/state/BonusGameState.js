// BonusGameState.js
const { GameState } = require("./GameState");
const { ResponseGenerator } = require("../responseGenerator/Response");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { randomPools } = require("../../utils/PoolUtils");
const { calculateBonusWin } = require("../../configuration/BonusGameConfig");

class BonusGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BonusGameState
  }

  name() {
    return "WHEEL_BONUS";
  }

  async init(request) {
    const responseMap = new Map();
    const response = new ResponseGenerator().createNew();
    let nextStateDetails = request.nextStateDetails;

    //Add Fixed Data
    let nextState = request.nextState;
    responseMap.set(ResponseConstants.CURRENT_STATE, "WHEEL_BONUS");
    responseMap.set(ResponseConstants.BET_NUMBERS, request.betNumbers);
    responseMap.set(ResponseConstants.DRAWN_NUMBERS, request.drawnNumbers);
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT, request.extraDrawCount);
    responseMap.set(ResponseConstants.WIN_NUMBERS, request.winNumbers);
    responseMap.set(ResponseConstants.NUMBER_COUNT, request.numberCount);
    responseMap.set(ResponseConstants.BASE_BET, request.bet);
    responseMap.set(ResponseConstants.CREDITS, request.credits);
    responseMap.set(ResponseConstants.TOTAL_BET, request.bet * request.credits);
    responseMap.set(ResponseConstants.FEATURE_SYMBOLS, request.featureSymbols);
    responseMap.set(ResponseConstants.FEATURE_SYMBOL_HIT, request.featureSymbolHit);
    responseMap.set(ResponseConstants.BONUS_MULTIPLIER, request.bonusMultiplier);
    responseMap.set(ResponseConstants.IS_FREE_TRIGGERED, nextStateDetails.isFreeTriggered);

    //Check for next state
    nextStateDetails.currentWheelBonusSpin++;
    if (nextStateDetails.currentWheelBonusSpin >= nextStateDetails.totalWheelBonusSpin) {
      nextState = nextStateDetails.states.pop();
      nextState = nextStateDetails.states.at(-1);
    }
    responseMap.set(ResponseConstants.NEXT_STATE, nextState); //push next state
    responseMap.set(ResponseConstants.NEXT_STATE_DETAILS, nextStateDetails);

    //Set Bonus Pool
    const bonusPool = await new randomPools().createNew(request);

    //BONUS WIN
    let payoutData = calculateBonusWin(bonusPool);
    let win = parseFloat(
      (payoutData * request.payoutMultiplier * request.credits * request.bonusMultiplier).toFixed(2)
    );

    responseMap.set(ResponseConstants.WHEEL_BONUS_WON, payoutData);
    responseMap.set(ResponseConstants.PAYOUT_MULTIPLIER, payoutData);
    responseMap.set(ResponseConstants.TOTAL_WHEEL_BONUS_SPIN, win);
    responseMap.set(ResponseConstants.WON, win);
    responseMap.set(ResponseConstants.TOTAL_WON, parseFloat((win + request.totalWon).toFixed(2)));

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createWheelBonusResponse(responseMap, response);
  }
}
module.exports = BonusGameState;
