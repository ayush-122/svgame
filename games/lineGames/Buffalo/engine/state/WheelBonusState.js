// WheelBonusState.js
const { GameState } = require("./GameState");
const GameConstant = require("../../configuration/GameConstant");
const { randomPools } = require("../../utils/PoolUtils");

const StateUtils = require("../../utils/StateUtils");

class WheelBonusState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for WheelBonusState
  }

  name() {
    return GameConstant.WHEEL_BONUS_REQUEST;
  }

  async init(request, previousState) {
    let responseObj = {
      wheelSpin: {
        award: "",
        amount: 0,
      },
    };

    // ! *****************Data Till Here**************
    const pools = await new randomPools().createNew(request);
    // ! *****************Data Till Here**************

    let wheelBonusData = StateUtils.wheelBonus(pools, previousState);
    responseObj.wheelSpin = wheelBonusData;
    responseObj.state = {};
    responseObj.freeGame = {};
    responseObj.state.current = GameConstant.WHEEL_BONUS_REQUEST;
    responseObj.next = GameConstant.DONE_REQUEST;

    return responseObj;
  }
}

module.exports = WheelBonusState;
