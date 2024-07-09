// BaseGameState.js
const { GameState } = require("./GameState");

const { ResponseGenerator } = require("../responseGenerator/Response");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
const { randomPools } = require("../../utils/PoolUtils");
const { setBaseFeatureSymbols } = require("../../configuration/BaseGameConfig");
const { baseRewardTable } = require("../../configuration/Paytable");
const { countFeatureSymbols } = require("../../utils/calculateFeatureReward");

class BaseGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return "BASE_GAME";
  }

  async init(request) {
    const responseMap = new Map();
    const response = new ResponseGenerator().createNew();

    //Base Fixed Values
    let nextState = "COMPLETED";
    let extraDrawCount = request.extraDrawCount;
    const playerNumbers = request.betNumbers; // player selected numbers
    responseMap.set(ResponseConstants.CURRENT_STATE, "BASE");
    responseMap.set(ResponseConstants.BASE_BET, request.bet);
    responseMap.set(ResponseConstants.CREDITS, request.credits);
    responseMap.set(ResponseConstants.TOTAL_BET, request.bet * request.credits);
    responseMap.set(ResponseConstants.NUMBER_COUNT, request.numberCount);
    responseMap.set(ResponseConstants.BET_NUMBERS, playerNumbers);

    //Get Random Pool from RNG
    const { kenoPool, featurePool } = await new randomPools().createNew(request);

    //Set Feature Symbols
    const featureReel = setBaseFeatureSymbols(featurePool);
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
    let { featureSymbolHit, featureStops } = countFeatureSymbols(matchingNumbers, remainingKenoPool, featureReel);
    responseMap.set(ResponseConstants.FEATURE_SYMBOL_HIT, featureSymbolHit);

    //Add feature stops to absolutePool
    absoluteKenoPool = absoluteKenoPool.concat(featureStops);

    //Add Absolute Keno Pool to Response
    responseMap.set(ResponseConstants.DRAWN_NUMBERS, absoluteKenoPool);

    let addWin = true;

    // Check FREE GAME
    if (featureSymbolHit.hatSymbols.length >= 4) {
      nextState = "FREE";
      responseMap.set(ResponseConstants.IS_FREE_GAME, true);
      responseMap.set(ResponseConstants.CURRENT_FREE_SPIN, 0);
      responseMap.set(ResponseConstants.TOTAL_FREE_SPIN, 10);
      responseMap.set(ResponseConstants.CURRENT_FREE_SPIN_WON, 0);
      responseMap.set(ResponseConstants.TOTAL_FREE_SPIN_WON, 0);
      responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT_FREE, 6);

      responseMap.set(ResponseConstants.IS_FREE_TRIGGERED, true);
    } else {
      responseMap.set(ResponseConstants.IS_FREE_TRIGGERED, false);
    }

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

    if (featureSymbolHit.gunSymbols.length >= 2 && extraDrawCount < 30) {
      responseMap.set(ResponseConstants.INCREASE_DRAW_COUNT, true);
      extraDrawCount++;
    }

    //Extra Draw Count
    responseMap.set(ResponseConstants.EXTRA_DRAW_COUNT, extraDrawCount);

    //push next state
    responseMap.set(ResponseConstants.NEXT_STATE, nextState);

    // Check Bonus Multiplier
    let bonusMultiplier = 1;
    if (featureSymbolHit.horseShoeSymbols.length >= 1) bonusMultiplier = 2;

    //* Adding Win and Feature Wins
    let win = 0;
    if (addWin) win = parseFloat((payoutData * request.credits * bonusMultiplier).toFixed(2));
    responseMap.set(ResponseConstants.BONUS_MULTIPLIER, bonusMultiplier);
    responseMap.set(ResponseConstants.PAYOUT_MULTIPLIER, payoutData);
    responseMap.set(ResponseConstants.WON, win);
    responseMap.set(ResponseConstants.TOTAL_WON, parseFloat(win.toFixed(2)));

    // call the response generation util pass responseMap as a parameter
    return new ResponseGenerator().createResponse(responseMap, response);
  }

  // Function to generate an array of random numbers within a given range
  generateRandomNumbers(min, max, count) {
    const randomNumbers = [];
    while (randomNumbers.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  }

  // Function to find the common elements between two arrays
  findMatchingNumbers(arr1, arr2) {
    return arr1.filter((value) => arr2.includes(value));
  }
  setMatchingSymbols(featureReel, kenoPool) {
    let matchingReel = {};
    for (let key in featureReel) {
      if (kenoPool.includes(parseInt(key))) {
        matchingReel[key] = featureReel[key];
      }
    }
    return matchingReel;
  }

  calculatePayout(numberCount, matches) {
    return baseRewardTable[matches][numberCount];
  }
}
module.exports = BaseGameState;
