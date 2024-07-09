function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 30,
    type: "BASE",
    playerId: "1",
    gameId: "1009",
  };
  return baseRequest;
}

function createFreeRequest() {
  let freeRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 30,
    type: "FREE",
    playerId: "1",
    gameId: "1009",
  };
  return freeRequest;
}

function createRespinRequest(baseRawRequest) {
  let wheelRequest = {
    credits: 1,
    noOfPaylineData: 30,
    betMultiplier: 1,
    isBuyFeature: false,
    playerId: "1",
    gameId: "1009",
    type: "RESPIN",
    raw_request: baseRawRequest,
  };
  return wheelRequest;
}

module.exports = { createBaseRequest, createFreeRequest, createRespinRequest };
