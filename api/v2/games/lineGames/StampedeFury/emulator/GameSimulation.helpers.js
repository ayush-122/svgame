function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 30,
    type: "BASE",
    playerId: "1",
    gameId: "1013",
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
    gameId: "1013",
  };
  return freeRequest;
}

module.exports = { createBaseRequest, createFreeRequest };
