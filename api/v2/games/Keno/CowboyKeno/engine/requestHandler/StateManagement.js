const {
  SPIN_REQUEST,
  EXTRA_DRAW,
  FREE_GAME_REQUEST,
  WHEEL_BONUS_REQUEST,
} = require("../../configuration/GameConstant");
const BaseGameState = require("../state/BaseGameState");
const ExtraDrawState = require("../state/ExtraDrawState");
const FreeGameState = require("../state/FreeGameState");
const BonusGameState = require("../state/BonusGameState");

async function stateHandler(nextState, payload) {
  if (nextState == SPIN_REQUEST) {
    return await new BaseGameState().init(payload);
  } else if (nextState == FREE_GAME_REQUEST) {
    return await new FreeGameState().init(payload);
  } else if (nextState == WHEEL_BONUS_REQUEST) {
    return await new BonusGameState().init(payload);
  } else if (nextState === EXTRA_DRAW) {
    return await new ExtraDrawState().init(payload);
  }
}
module.exports = { stateHandler };
