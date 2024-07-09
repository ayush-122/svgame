const { SPIN_REQUEST } = require("../../configuration/GameConstant");
const BaseGameState = require("../state/BaseGameState");

async function stateHandler(nextState, payload) {
  if (nextState == SPIN_REQUEST) {
    return await new BaseGameState().init(payload);
    // }  else if (nextState === DONE_REQUEST) {
    //   return await new DoneState().init(payload, previousState);
    // }
  }
}
module.exports = { stateHandler };
