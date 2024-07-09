// BaseGameState.js
const { GameState } = require("./GameState");

const { ResponseGenerator } = require("../responseGenerator/Response");
const { lowPaytable } = require("../../Paytable/Low");
const { ClassicPaytable } = require("../../Paytable/Classic");
const { mediumPaytable } = require("../../Paytable/Medium");
const { HighPaytable } = require("../../Paytable/High");
const ResponseConstants = require("../responseGenerator/ResponseConstants");
// const { checkForNull } = require("../requestHandler/ExceptionHandler");

class BaseGameState extends GameState {
  constructor() {
    super(); // Call the constructor of the base class (GameState)
    // Additional initialization for BaseGameState
  }

  name() {
    return "BASE_GAME";
  }

  async init(request) {
    // debugger;
    const responseMap = new Map();
    const response = new ResponseGenerator().createNew();
    responseMap.set(ResponseConstants.TOTAL_BET, request.bet);
    // Generate 10 random numbers between 1 and 40
    const drawnNumbers = this.generateRandomNumbers(1, 40, 10);

    const playerNumbers = request.betNumbers; // player selected numbers

    console.log("drawnNumbers  " + drawnNumbers);
    console.log("playerNumbers  " + playerNumbers);

    responseMap.set(ResponseConstants.DRAWN_NUMBERS, drawnNumbers);

    const typeOfGame = request.riskLevel;

    const matchingNumbers = this.findMatchingNumbers(playerNumbers, drawnNumbers);
    responseMap.set(ResponseConstants.WIN_NUMBERS, matchingNumbers);

    const numMatches = matchingNumbers.length;
    console.log(numMatches, "   ", request.betNumbers.length);

    let payoutData = this.calculatePayout(typeOfGame, numMatches, request.betNumbers.length);
    console.log("payoutData  " + payoutData);
    responseMap.set(ResponseConstants.PAYOUT_MULTIPLIER, payoutData);
    responseMap.set(ResponseConstants.TOTAL_WON, (payoutData * request.bet).toFixed(2));

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

  calculatePayout(typeOfGame, matches, symbolSelected) {
    if (matches >= 0 && matches <= 10) {
      if (typeOfGame === "CLASSIC") {
        return ClassicPaytable[matches][symbolSelected - 1];
      } else if (typeOfGame === "LOW") {
        console.log("i am in ", matches, "  ", symbolSelected);
        return lowPaytable[matches][symbolSelected - 1];
      } else if (typeOfGame === "MEDIUM") {
        return mediumPaytable[matches][symbolSelected - 1];
      } else if (typeOfGame === "HIGH") {
        return HighPaytable[matches][symbolSelected - 1];
      }
    } else {
      console.error("Invalid number of matches. Please enter a number between 0 and 10.");
      return 0;
    }
  }
}
module.exports = BaseGameState;
