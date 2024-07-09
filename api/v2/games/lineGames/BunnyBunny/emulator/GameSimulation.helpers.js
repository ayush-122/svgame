function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 40,
    type: "BASE",
    playerId: "1",
    gameId: "1003",
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
    gameId: "1003",
  };
  return freeRequest;
}

module.exports = { createBaseRequest, createFreeRequest };