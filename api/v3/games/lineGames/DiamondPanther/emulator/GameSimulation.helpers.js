function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 20,
    type: "BASE",
    playerId: "1",
    gameId: "1002",
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
    gameId: "1002",
  };
  return freeRequest;
}

module.exports = { createBaseRequest, createFreeRequest };