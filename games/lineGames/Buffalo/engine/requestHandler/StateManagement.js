const {
  SPIN_REQUEST,
  FREE_GAME_REQUEST,
  DONE_REQUEST,
  BUY_FEATURE_SPIN_REQUEST,
  WHEEL_BONUS_REQUEST
} = require("../../configuration/GameConstant");
const BaseGameState = require("../state/BaseGameState");
const FreeGameState = require("../state/FreeGameState");
const WheelBonusState = require("../state/WheelBonusState");

const DoneState = require("../state/CompletedState");

async function stateHandler(nextState, payload, previousState) {
  if (nextState == SPIN_REQUEST || nextState == BUY_FEATURE_SPIN_REQUEST) {
    return await new BaseGameState().init(payload);
  } else if (nextState === WHEEL_BONUS_REQUEST) {
    return await new WheelBonusState().init(payload, previousState);
  } else if (nextState === FREE_GAME_REQUEST) {
    return await new FreeGameState().init(payload, previousState);
  } else if (nextState === DONE_REQUEST) {
    return await new DoneState().init(payload, previousState);
  }
}
module.exports = { stateHandler };
