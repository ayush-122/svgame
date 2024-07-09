// ExtraDrawState.js
const { GameState } = require("./GameState");

const { ResponseGenerator } = require("../responseGenerator/Response");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { randomPools } = require("../../utils/PoolUtils");
const { baseRewardTable } = require("../../configuration/Paytable");

class ExtraDrawState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for ExtraDrawState
  }

  name() {
    return "EXTRA_DRAW";
  }

  async init(request) {
    const responseMap = new Map();
    const response = new ResponseGenerator().createNew();
    let nextState = request.nextState;
    let nextStateDetails = request.nextStateDetails;
    let extraDrawCount = request.nextStateDetails.extraDrawCount;
    let extraDrawCountFree = request.nextStateDetails.extraDrawCountFree;
    let currentExtraDraw = 0;
    if (request.nextStateDetails.currentFreeSpin > 0) {
      currentExtraDraw = extraDrawCountFree;
    } else {
      currentExtraDraw = extraDrawCount;
    }
    extraDrawCountFree = 6;
    extraDrawCount = 8;
    request.currentExtraDraw = currentExtraDraw;
    const playerNumbers = request.betNumbers; // player selected numbers
    const featureReel = request.featureSymbols;
    let featureSymbolHit = request.featureSymbolHit;

    //Add Fixed Data
    responseMap.set(ResponseConstants.NUMBER_COUNT, request.numberCount);
    responseMap.set(ResponseConstants.BASE_BET, request.bet);
    responseMap.set(ResponseConstants.CREDITS, request.credits);
    responseMap.set(ResponseConstants.TOTAL_BET, request.bet * request.credits);
    responseMap.set(ResponseConstants.CURRENT_STATE, "EXTRA_DRAW");
    responseMap.set(ResponseConstants.BET_NUMBERS, playerNumbers);
    responseMap.set(ResponseConstants.FEATURE_SYMBOLS, featureReel);
    responseMap.set(ResponseConstants.FEATURE_SYMBOL_HIT, featureSymbolHit);
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT, currentExtraDraw);
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT_BASE, extraDrawCount);
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT_FREE, extraDrawCountFree);
    responseMap.set(ResponseConstants.BONUS_MULTIPLIER, request.bonusMultiplier);
    responseMap.set(ResponseConstants.IS_FREE_TRIGGERED, nextStateDetails.isFreeTriggered);

    // Get Random Numbers from RNG
    let { kenoPool } = await new randomPools().createNew(request);
    responseMap.set(ResponseConstants.EXTRA_DRAWN_NUMBERS, kenoPool);
    responseMap.set(ResponseConstants.DRAWN_NUMBERS, request.drawnNumbers);

    // Adding previous drawn numbers to new ones.
    kenoPool = kenoPool.concat(request.drawnNumbers);

    //Calculate Win
    const matchingNumbers = this.findMatchingNumbers(playerNumbers, kenoPool);
    responseMap.set(ResponseConstants.WIN_NUMBERS, matchingNumbers);
    const numMatches = matchingNumbers.length;
    let payoutData = this.calculatePayout(request.numberCount, numMatches);

    //Adding Wins to respective fields
    responseMap.set(ResponseConstants.PAYOUT_MULTIPLIER, payoutData);
    let win = parseFloat((payoutData * request.credits * request.bonusMultiplier).toFixed(2));
    responseMap.set(ResponseConstants.EXTRA_DRAW_WON, win);
    responseMap.set(ResponseConstants.WON, win);
    responseMap.set(ResponseConstants.TOTAL_WON, parseFloat((request.totalWon + win).toFixed(2)));

    //Check for free game
    if (request.nextStateDetails.currentFreeSpin > 0) {
      nextStateDetails.currentFreeSpinWon = win;
      nextStateDetails.totalFreeSpinWon = nextStateDetails.totalFreeSpinWon + win;
    }

    //Edit Next State Details
    nextStateDetails.states.pop();
    nextState = nextStateDetails.states.at(-1);
    responseMap.set(ResponseConstants.NEXT_STATE, nextState);
    responseMap.set(ResponseConstants.NEXT_STATE_DETAILS, nextStateDetails);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createExtraDrawResponse(responseMap, response);
  }

  // Function to find the common elements between two arrays
  findMatchingNumbers(arr1, arr2) {
    return arr1.filter((value) => arr2.includes(value));
  }

  calculatePayout(numberCount, matches) {
    return baseRewardTable[matches][numberCount];
  }
}
module.exports = ExtraDrawState;
