function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 40,
    type: "BASE",
    playerId: "1",
    gameId: "1006",
  };
  return baseRequest;
}

function createFreeRequest() {
  let freeRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 40,
    type: "FREE",
    playerId: "1",
    gameId: "1006",
  };
  return freeRequest;
}

function createWheelRequest(baseRawRequest) {
  let wheelRequest = {
    credits: 1,
    noOfPaylineData: 40,
    betMultiplier: 1,
    isBuyFeature: false,
    playerId: 3,
    gameId: "1006",
    type: "PICK_BONUS",
    raw_request: baseRawRequest,
  };
  return wheelRequest;
}

module.exports = { createBaseRequest, createFreeRequest, createWheelRequest };
