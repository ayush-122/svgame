/* eslint-disable no-undef */
//REVIEW - Enable eslint When Work reaches here
// BuyFeatureBaseState.js
const { GameState } = require("./GameState");

class BuyFeatureBaseState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for FreeGameState
  }

  name() {
    return "BUYFEATURE";
  }

  init(jsonRequestData, previousState) {
    this.responseObj.creditValue = jsonRequestData.credits;
    this.responseObj.betMultiplier = jsonRequestData.betMultiplier;
    let baseGameWon = previousState.mainSpinCreditsWon;
    this.responseObj.state.current = "FREE";
    this.responseObj.state.next = "FREE";
    this.responseObj.next = "FREE";
    const mainGameReelConfig = freeGameReels;
    const reelSymbols = mainGameReelConfig.reel(RtpLevel, reelNumber);

    let symbolGrid = new SymbolGridCreation(
      DISPLAY_HEIGHT,
      NUM_REELS,
      reelSymbols
    );
    let matrixData = symbolGrid.matrixCreation();
    this.responseObj.reelStops = matrixData.reelStops;

    let matrix = matrixData.symbolGrid;

    this.responseObj.matrix = matrix;

    let returnPaylineData = paylineWinCalculation(matrix);
    let freeTotalWon = returnPaylineData.totalwin;
    this.responseObj.payline = returnPaylineData.paylineData;
    // Expanding Feature of Wild
    let featureExpandingData = expandingWild(matrix);
    this.responseObj.expandingWild = featureExpandingData.expandingReels;
    this.responseObj.expandingPosition = featureExpandingData.expandingPosition;

    //   // Feature Reels and Paylines
    let FeatureExpandingReels = this.symbolGridExpandingReels(
      matrix,
      featureExpandingData.expandingReels
    );

    if (featureExpandingData.expandingReels.includes(1)) {
      let random = Math.floor(Math.random() * 100);
      if (random < 8) {
        let FeatureReturnPaylineData = paylineWinCalculation(
          FeatureExpandingReels
        );
        this.responseObj.featurePaylines = FeatureReturnPaylineData.paylineData;
        this.responseObj.featureReels = FeatureExpandingReels;
        freeTotalWon += FeatureReturnPaylineData.totalwin;
      }
    } else {
      this.responseObj.featureReels = matrix;
      this.responseObj.featurePaylines = [];
    }
    //   won

    //base
    this.responseObj.mainSpinCreditsWon = baseGameWon;
    this.responseObj.creditsWonOnBaseSpin = baseGameWon;
    //free
    this.responseObj.freeSpinCreditsWon = freeTotalWon;
    this.responseObj.freeSpinTotalWon =
      freeTotalWon + previousState.freeSpinTotalWon;
    this.responseObj.totalCreditsWon =
      freeTotalWon +
      previousState.freeSpinTotalWon +
      previousState.mainSpinCreditsWon;

    this.responseObj.freeGame.currentFreeSpin =
      previousState.freeGame.currentFreeSpin + 1;
    this.responseObj.freeGame.totalFreeSpin =
      previousState.freeGame.totalFreeSpin;

    if (
      previousState.freeGame.currentFreeSpin >=
      previousState.freeGame.totalFreeSpin - 1
    ) {
      this.responseObj.state.current = "FREE";
      this.responseObj.state.next = "COMPLETED";
      this.responseObj.next = "BASE";
    }
    this.responseObj.finalWinnings.TotalWon =
      (freeTotalWon +
        previousState.freeSpinTotalWon +
        previousState.mainSpinCreditsWon) *
      jsonRequestData.credits;
    this.responseObj.finalWinnings.net = (
      (freeTotalWon +
        previousState.freeSpinTotalWon +
        previousState.mainSpinCreditsWon) *
        jsonRequestData.credits -
      jsonRequestData.credits * BASE_CREDITS_BET
    ).toFixed(4);

    changeSymbolCode(matrix);
    changeSymbolCode(FeatureExpandingReels);

    return this.responseObj;
  }
}

module.exports = { BuyFeatureBaseState };
