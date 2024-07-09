function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 20,
    type: "BASE",
    playerId: "1",
    gameId: "1001",
  };
  return baseRequest;
}

function createFreeRequest() {
  let freeRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 20,
    type: "FREE",
    playerId: "1",
    gameId: "1004",
  };
  return freeRequest;
}

function createRespinRequest(baseRawRequest) {
  let wheelRequest = {
    credits: 1,
    noOfPaylineData: 20,
    betMultiplier: 1,
    isBuyFeature: false,
    playerId: 3,
    gameId: "1004",
    type: "RESPIN",
    raw_request: baseRawRequest,
  };
  return wheelRequest;
}

module.exports = { createBaseRequest, createFreeRequest, createRespinRequest };
