const kenoRng = require("../../../../api/v1/helpers/rng/kenoRng.helper");

function createBaseRequest(last_state) {
  let numCount = Math.floor(Math.random() * 8) + 2;
  let drawnNumbers = kenoRng.getKenoNumbers(0, 80, numCount);
  let baseRequest = {
    type: "BASE",
    credits: 1,
    bet: 2,
    // betNumbers: [27, 5, 21, 9, 13, 29, 24, 35, 32, 25],
    betNumbers: drawnNumbers,
    // numberCount: 10,
    numberCount: numCount,
    extraDrawCount: last_state ? last_state.extraDrawCount : 8,
    //Details
    playerId: "1",
    gameId: "2010",
  };
  return baseRequest;
}

function createFreeRequest(last_state) {
  let numCount = Math.floor(Math.random() * 8) + 2;
  let drawnNumbers = kenoRng.getKenoNumbers(0, 80, numCount);
  let freeRequest = {
    credits: 1,
    bet: 2,
    betNumbers: drawnNumbers,
    numberCount: numCount,
    type: "FREE",
    extraDrawCount: last_state.extraDrawCount,

    //Details
    nextState: last_state.nextState,
    nextStateDetails: last_state.nextStateDetails,
    bonusMultiplier: last_state.bonusMultiplier,
    win: last_state.win,
    totalWon: last_state.total_won,

    // fot qa
    playerId: "1",
    gameId: "2010",
  };
  return freeRequest;
}

function createWheelRequest(last_state) {
  let wheelRequest = {
    credits: 1,
    bet: 2,
    betNumbers: last_state.betNumbers,
    numberCount: last_state.numberCount,
    type: "WHEEL_BONUS",
    extraDrawCount: last_state.extraDrawCount,

    //Details
    nextState: last_state.nextState,
    nextStateDetails: last_state.nextStateDetails,
    drawnNumbers: last_state.drawnNumbers,
    featureSymbols: last_state.featureSymbols,
    winNumbers: last_state.winNumbers,
    featureSymbolHit: last_state.featureSymbolHit,
    bonusMultiplier: last_state.bonusMultiplier,
    payoutMultiplier: last_state.payoutMultiplier,
    win: last_state.win,
    totalWon: last_state.totalWon,

    //for qa
    playerId: 1,
    gameId: "2010",
  };
  return wheelRequest;
}

function createExtraDrawRequest(last_state) {
  let extraDrawRequest = {
    type: "EXTRA_DRAW",
    credits: 1,
    bet: 2,
    betNumbers: last_state.betNumbers,
    numberCount: last_state.numberCount,
    extraDrawCount: last_state.extraDrawCount,

    //Details
    drawnNumbers: last_state.drawnNumbers,
    bonusMultiplier: last_state.bonusMultiplier,
    nextState: last_state.nextState,
    nextStateDetails: last_state.nextStateDetails,
    featureSymbols: last_state.featureSymbols,
    featureSymbolHit: last_state.featureSymbolHit,
    totalWon: last_state.totalWon,
    win: last_state.win,

    //for qa
    playerId: 1,
    gameId: "2010",
  };
  return extraDrawRequest;
}

module.exports = { createBaseRequest, createFreeRequest, createWheelRequest, createExtraDrawRequest };
