const GameConstant = require("../../configuration/GameConstant");

function baseGameFixedData(request, isBuyFeature, response) {
  console.log("base foxed data ",request);
  response.baseBet = isBuyFeature
    ? GameConstant.BUY_FEATURE_BET * request.credits
    : GameConstant.BASE_CREDITS_BET * request.credits;
  response.creditValue = 1;
  response.betMultiplier = 1;
  response.freeGame.totalFreeSpin = 0;
  response.freeGame.currentFreeSpin = 0;
  response.mainSpinCreditsWon = 0;
  response.freeSpinCreditsWon = 0;
  response.freeSpinTotalWon = 0;
  response.currentState = isBuyFeature ? "BUYFEATURE" : "BASE";

  if (isBuyFeature) {
    response.nextState = "FREE";
    response.next = "FREE";
  } else response.nextState = "COMPLETED";
}

module.exports = { baseGameFixedData };
