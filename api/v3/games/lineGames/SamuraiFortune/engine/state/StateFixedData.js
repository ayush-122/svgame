const GameConstant = require("../../configuration/GameConstant");

function baseGameFixedData(request, isBuyFeature, response) {
  response.baseBet = isBuyFeature ? GameConstant.BUY_FEATURE_BET : GameConstant.BASE_CREDITS_BET;
  response.creditValue = 1;
  response.betMultiplier = 1;
  response.freeGame.totalFreeSpin = 0;
  response.freeGame.currentFreeSpin = 0;
  response.mainSpinCreditsWon = 0;
  response.freeGame.freeSpinCreditsWon = 0;
  response.freeGame.freeSpinTotalWon = 0;
  response.state.current = isBuyFeature ? "BUYFEATURE" : "BASE";

  if (isBuyFeature) {
    response.state.next = "FREE";
    response.next = "FREE";
  } else response.state.next = "COMPLETED";
}

module.exports = { baseGameFixedData };
