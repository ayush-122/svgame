const {
  SPIN_REQUEST,
  FREE_GAME_REQUEST,
  DONE_REQUEST,
  BUY_FEATURE_SPIN_REQUEST,
  CASCADE_PROCESS_REQUEST,
} = require("../../configuration/GameConstant");
const BaseGameState = require("../state/BaseGameState");
const FreeGameState = require("../state/FreeGameState");

const DoneState = require("../state/CompletedState");
 

async function stateHandler(nextState, payload, previousState) {
  if (nextState == SPIN_REQUEST || nextState == BUY_FEATURE_SPIN_REQUEST) {
    return await new BaseGameState().init(payload);
  } else if (nextState == CASCADE_PROCESS_REQUEST ) {
    return await new BaseGameState().init(payload);
  } else if (nextState === FREE_GAME_REQUEST) {
    return await new FreeGameState().init(payload, previousState);
  } else if (nextState === DONE_REQUEST) {
    return await new DoneState().init(payload, previousState);
  }
}
module.exports = { stateHandler };
