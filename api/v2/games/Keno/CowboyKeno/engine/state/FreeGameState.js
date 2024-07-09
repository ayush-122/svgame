// FreeGameState.js
const { GameState } = require("./GameState");
const { ResponseGenerator } = require("../responseGenerator/Response");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { randomPools } = require("../../utils/PoolUtils");
const { setFreeFeatureSymbols } = require("../../configuration/FreeGameConfig");
const { baseRewardTable } = require("../../configuration/Paytable");
const { countFeatureSymbols } = require("../../utils/calculateFeatureReward");

class FreeGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for FreeGameState
  }

  name() {
    return "FREE_GAME";
  }

  async init(request) {
    const responseMap = new Map();
    const response = new ResponseGenerator().createNew();

    //Free Game Fixed Data
    let nextState = request.nextState;
    let nextStateDetails = request.nextStateDetails;
    let extraDrawCountBase = request.nextStateDetails.extraDrawCount;
    let extraDrawCountFree = request.nextStateDetails.extraDrawCountFree;
    const playerNumbers = request.betNumbers; // player selected numbers
    let bonusMultiplier = request.bonusMultiplier;
    responseMap.set(ResponseConstants.CURRENT_STATE, "FREE");
    responseMap.set(ResponseConstants.BASE_BET, request.bet);
    responseMap.set(ResponseConstants.CREDITS, request.credits);
    responseMap.set(ResponseConstants.TOTAL_BET, request.bet * request.credits);
    responseMap.set(ResponseConstants.NUMBER_COUNT, request.numberCount);
    responseMap.set(ResponseConstants.BET_NUMBERS, playerNumbers);

    //Check for first Free Spin
    if (nextStateDetails.currentFreeSpin == 0) bonusMultiplier = 1;

    //Check for next state
    nextStateDetails.currentFreeSpin++;
    if (nextStateDetails.currentFreeSpin >= nextStateDetails.totalFreeSpin) {
      nextState = nextStateDetails.states.pop();
      nextState = nextStateDetails.states.at(-1);
    }

    //Get Random pool from RNG
    const { kenoPool, featurePool } = await new randomPools().createNew(request);

    //Set Feature Symbols
    const featureReel = setFreeFeatureSymbols(featurePool);
    responseMap.set(ResponseConstants.FEATURE_SYMBOLS, featureReel);

    //Set Keno and Feature Pool
    let absoluteKenoPool = kenoPool.slice(0, 20 - featureReel.length); //Subtracting FaceSymbols
    let remainingKenoPool = kenoPool.slice(20 - featureReel.length);

    //Find Matching Numbers
    const matchingNumbers = this.findMatchingNumbers(playerNumbers, absoluteKenoPool);
    responseMap.set(ResponseConstants.WIN_NUMBERS, matchingNumbers);
    const numMatches = matchingNumbers.length;

    //Calculate Payout
    let payoutData = parseFloat(this.calculatePayout(request.numberCount, numMatches));

    //Count Feature Symbols
    let { featureSymbolHit, featureStops } = countFeatureSymbols(playerNumbers, remainingKenoPool, featureReel);
    responseMap.set(ResponseConstants.FEATURE_SYMBOL_HIT, featureSymbolHit);

    //Add feature stops to absolutePool
    absoluteKenoPool = absoluteKenoPool.concat(featureStops);

    //Add Absolute Keno Pool to Response
    responseMap.set(ResponseConstants.DRAWN_NUMBERS, absoluteKenoPool);

    //adding isFreeTriggered flag by default true
    responseMap.set(ResponseConstants.IS_FREE_TRIGGERED, true);

    let addWin = true;

    //Check WHEEL BONUS
    if (featureSymbolHit.skullSymbols.length >= 5) {
      addWin = false;
      nextState = "WHEEL_BONUS";
      responseMap.set(ResponseConstants.IS_WHEEL_BONUS, true);
      responseMap.set(ResponseConstants.CURRENT_WHEEL_BONUS_SPIN, 0);
      responseMap.set(ResponseConstants.TOTAL_WHEEL_BONUS_SPIN, 2);
      responseMap.set(ResponseConstants.WHEEL_BONUS_WON, 0);
      responseMap.set(ResponseConstants.TOTAL_WHEEL_BONUS_WON, 0);
    }

    //Check Extra Draw GAME
    if (featureSymbolHit.bulletSymbols.length >= 2) {
      addWin = false;
      nextState = "EXTRA_DRAW";
      responseMap.set(ResponseConstants.IS_EXTRA_DRAW, true);
    }

    if (featureSymbolHit.gunSymbols.length >= 2) {
      responseMap.set(ResponseConstants.INCREASE_DRAW_COUNT, true);
      if (extraDrawCountBase < 30) extraDrawCountFree++;
    }
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT, extraDrawCountFree);
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT_BASE, extraDrawCountBase);
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT_FREE, extraDrawCountFree);

    //push next state
    responseMap.set(ResponseConstants.NEXT_STATE, nextState);

    //Check Bonus Multiplier
    if (featureSymbolHit.horseShoeSymbols.length >= 1 && bonusMultiplier < 5) bonusMultiplier++;

    //* Adding Win and Feature Wins
    let win = 0;
    if (addWin) win = parseFloat((payoutData * request.credits * bonusMultiplier).toFixed(2));
    responseMap.set(ResponseConstants.BONUS_MULTIPLIER, bonusMultiplier);
    responseMap.set(ResponseConstants.PAYOUT_MULTIPLIER, payoutData);
    responseMap.set(ResponseConstants.CURRENT_FREE_SPIN_WON, win);
    responseMap.set(ResponseConstants.TOTAL_FREE_SPIN_WON, win + nextStateDetails.totalFreeSpinWon);
    responseMap.set(ResponseConstants.WON, win);
    responseMap.set(ResponseConstants.TOTAL_WON, parseFloat((win + request.totalWon).toFixed(2)));

    //Update Next State Details
    responseMap.set(ResponseConstants.NEXT_STATE_DETAILS, nextStateDetails);

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createFreeResponse(responseMap, response);
  }

  // Function to find the common elements between two arrays
  findMatchingNumbers(arr1, arr2) {
    // const set1 = new Set(arr1);
    // return arr2.filter((item) => set1.has(item));
    return arr1.filter((value) => arr2.includes(value));
  }

  calculatePayout(numberCount, matches) {
    return baseRewardTable[matches][numberCount];
  }
}
module.exports = FreeGameState;
