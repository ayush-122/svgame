// BaseGameState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const { randomPools } = require("../../utils/PoolUtils");
const StateUtils = require("../../utils/StateUtils");
const { ResponseGenerator } = require("../responseGenerator/Response");
const ResponseConstants = require("../responseGenerator/ResponseConstants");

class WheelBonusState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return GameConstant.WHEEL_BONUS_REQUEST;
  }

  async init(request) {
    const responseMap = new Map();
    const response = new ResponseGenerator().createWheelNew();

    // ! *****************Data Till Here**************
    const pools = await new randomPools().createNew(request);
    // ! *****************Data Till Here**************

    let wheelBonusData = StateUtils.wheelBonus(pools);
    let amount = parseFloat(wheelBonusData.amount * request.credits);
    let totalBonusWin = amount;
    responseMap.set("wheelSpinData", wheelBonusData);
    responseMap.set(ResponseConstants.TOTAL_BONUS_WIN, totalBonusWin);
    responseMap.set(ResponseConstants.STATE_CURRENT, GameConstant.WHEEL_BONUS_REQUEST);
    responseMap.set(ResponseConstants.STATE_NEXT, GameConstant.DONE_REQUEST);
    responseMap.set(ResponseConstants.NEXT, GameConstant.DONE_REQUEST);

    return new ResponseGenerator().createWheelResponse(responseMap, response);
  }
}

module.exports = WheelBonusState;
