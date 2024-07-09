const GameConstant = require("../../configuration/GameConstant");

const {
  DRAWN_NUMBERS,
  EXTRA_DRAW_COUNT,
  WIN_NUMBERS,
  TOTAL_BET,
  TOTAL_WON,
  PAYOUT_MULTIPLIER,
  CURRENT_STATE,
  NEXT_STATE,
  BONUS_MULTIPLIER,
  FEATURE_SYMBOLS,
  FEATURE_SYMBOL_HIT,
  WON,
  BET_NUMBERS,
  IS_WHEEL_BONUS,
  CURRENT_WHEEL_BONUS_SPIN,
  TOTAL_WHEEL_BONUS_SPIN,
  IS_FREE_GAME,
  CURRENT_FREE_SPIN,
  TOTAL_FREE_SPIN,
  CURRENT_FREE_SPIN_WON,
  TOTAL_FREE_SPIN_WON,
  IS_EXTRA_DRAW,
  INCREASE_DRAW_COUNT,
  NUMBER_COUNT,
  NEXT_STATE_DETAILS,
  IS_FREE_TRIGGERED,
  WHEEL_BONUS_WON,
  BASE_BET,
  CREDITS,
  TOTAL_WHEEL_BONUS_WON,
  EXTRA_DRAWN_NUMBERS,
  EXTRA_DRAW_WON,
  EXTRA_DRAW_COUNT_FREE,
  EXTRA_DRAW_COUNT_BASE,
} = require("./ResponseConstants");

class ResponseGenerator {
  constructor() {}

  createNew() {
    const responseJson = {
      gameId: null,
      balance: null,
      balanceType: "WALLET",
      currentState: "BASE",
      bet: 2,
      credits: 1,
      numberCount: 0,
      nextState: "BASE",
      nextStateDetails: {
        states: ["COMPLETED"],

        //Bonus
        isWheelBonusTriggered: false,
        currentWheelBonusSpin: 0,
        totalWheelBonusSpin: 0,
        wheelBonusWin: 0,
        totalWheelBonusWon: 0,

        //Extra Draw
        increaseDrawCount: false,
        extraDrawnNumbers: [],
        extraDrawCount: 8,
        extraDrawCountFree: 6,
        extraDrawWon: 0,

        //Free Spin
        isFreeTriggered: false,
        currentFreeSpin: 0,
        totalFreeSpin: 0,
        currentFreeSpinWon: 0,
        totalFreeSpinWon: 0,
      },
      betNumbers: [],
      drawnNumbers: [
        // 10 numbers coming from UI
      ],
      extraDrawCount: 8,
      winNumbers: [
        // Winning Numbers
      ],
      featureSymbols: [],
      featureSymbolHit: {},
      // {
      //   skullSymbols = [];
      //   hatSymbols = [];
      //   bullateSymbols = [];
      //   gunSymbols = [];
      //   horseShoeSymbols = [];
      //   wildSymbols = [];
      // }
      payoutMultiplier: 0.0,
      bonusMultiplier: 1,
      totalBet: 0.0,
      win: 0.0,
      totalWon: 0.0,
    };
    return responseJson;
  }

  createResponse(responseMap, response) {
    response.currentState = responseMap.get(CURRENT_STATE);
    response.betNumbers = responseMap.get(BET_NUMBERS);
    response.drawnNumbers = responseMap.get(DRAWN_NUMBERS);
    response.extraDrawCount = responseMap.get(EXTRA_DRAW_COUNT);
    response.winNumbers = responseMap.get(WIN_NUMBERS);
    response.nextState = responseMap.get(NEXT_STATE);
    response.bonusMultiplier = responseMap.get(BONUS_MULTIPLIER);
    response.featureSymbols = responseMap.get(FEATURE_SYMBOLS);
    response.featureSymbolHit = responseMap.get(FEATURE_SYMBOL_HIT);
    response.totalWon = responseMap.get(TOTAL_WON);
    response.bet = responseMap.get(BASE_BET);
    response.credits = responseMap.get(CREDITS);
    response.totalBet = responseMap.get(TOTAL_BET);
    response.win = responseMap.get(WON);
    response.payoutMultiplier = responseMap.get(PAYOUT_MULTIPLIER);
    response.numberCount = responseMap.get(NUMBER_COUNT);
    response.nextStateDetails.extraDrawCount = responseMap.get(EXTRA_DRAW_COUNT_BASE);
    response.nextStateDetails.extraDrawCountFree = responseMap.get(EXTRA_DRAW_COUNT_FREE);

    //Next State Details
    // response.nextStateDetails = responseMap.get(NEXT_STATE_DETAILS);

    //Bonus
    if (responseMap.get(IS_WHEEL_BONUS)) {
      response.nextStateDetails.states.push(GameConstant.WHEEL_BONUS_REQUEST);
      response.nextStateDetails.currentWheelBonusSpin = responseMap.get(CURRENT_WHEEL_BONUS_SPIN);
      response.nextStateDetails.isWheelBonusTriggered = responseMap.get(IS_WHEEL_BONUS);
      response.nextStateDetails.totalWheelBonusSpin = responseMap.get(TOTAL_WHEEL_BONUS_SPIN);
      response.nextStateDetails.totalWheelBonusWon = responseMap.get(TOTAL_WHEEL_BONUS_WON);
      response.nextStateDetails.wheelBonusWin = responseMap.get(WHEEL_BONUS_WON);
    }

    //Free
    if (responseMap.get(IS_FREE_GAME)) {
      response.nextStateDetails.states.push(GameConstant.FREE_GAME_REQUEST);
      response.nextStateDetails.isFreeTriggered = responseMap.get(IS_FREE_TRIGGERED);
      response.nextStateDetails.currentFreeSpin = responseMap.get(CURRENT_FREE_SPIN);
      response.nextStateDetails.totalFreeSpin = responseMap.get(TOTAL_FREE_SPIN);
      response.nextStateDetails.currentFreeSpinWon = responseMap.get(CURRENT_FREE_SPIN_WON);
      response.nextStateDetails.totalFreeSpinWon = responseMap.get(TOTAL_FREE_SPIN_WON);
      // response.nextStateDetails.extraDrawCountFree = responseMap.get(EXTRA_DRAW_COUNT_FREE);
    }

    //Extra Draw
    if (responseMap.get(IS_EXTRA_DRAW)) {
      response.nextStateDetails.states.push(GameConstant.EXTRA_DRAW);
      // response.nextStateDetails.isFreeTriggered = responseMap.get(IS_FREE_TRIGGERED);
      // response.nextStateDetails.extraDrawWon = responseMap.get(EXTRA_DRAW_WON);
    }

    //Increase Draw Count
    if (responseMap.get(INCREASE_DRAW_COUNT)) {
      response.nextStateDetails.increaseDrawCount = true;
    }

    return response;
  }

  createWheelBonusResponse(responseMap, response) {
    response.currentState = responseMap.get(CURRENT_STATE);
    response.betNumbers = responseMap.get(BET_NUMBERS);
    response.drawnNumbers = responseMap.get(DRAWN_NUMBERS);
    response.extraDrawCount = responseMap.get(EXTRA_DRAW_COUNT);
    response.winNumbers = responseMap.get(WIN_NUMBERS);
    response.nextState = responseMap.get(NEXT_STATE);
    response.bonusMultiplier = responseMap.get(BONUS_MULTIPLIER);
    response.featureSymbols = responseMap.get(FEATURE_SYMBOLS);
    response.featureSymbolHit = responseMap.get(FEATURE_SYMBOL_HIT);
    response.totalWon = responseMap.get(TOTAL_WON);
    response.bet = responseMap.get(BASE_BET);
    response.credits = responseMap.get(CREDITS);
    response.totalBet = responseMap.get(TOTAL_BET);
    response.win = responseMap.get(WON);
    response.payoutMultiplier = responseMap.get(PAYOUT_MULTIPLIER);
    response.numberCount = responseMap.get(NUMBER_COUNT);

    //Next State Details
    response.nextStateDetails = responseMap.get(NEXT_STATE_DETAILS);
    response.nextStateDetails.isFreeTriggered = responseMap.get(IS_FREE_TRIGGERED);

    // response.nextStateDetails.currentWheelBonusSpin = responseMap.get(CURRENT_WHEEL_BONUS_SPIN);
    // response.nextStateDetails.totalWheelBonusSpin = responseMap.get(TOTAL_WHEEL_BONUS_SPIN);
    response.nextStateDetails.totalWheelBonusWon = responseMap.get(TOTAL_WHEEL_BONUS_WON);
    response.nextStateDetails.wheelBonusWin = responseMap.get(WHEEL_BONUS_WON);

    return response;
  }

  createExtraDrawResponse(responseMap, response) {
    response.currentState = responseMap.get(CURRENT_STATE);
    response.betNumbers = responseMap.get(BET_NUMBERS);
    response.drawnNumbers = responseMap.get(DRAWN_NUMBERS);
    response.extraDrawCount = responseMap.get(EXTRA_DRAW_COUNT);
    response.winNumbers = responseMap.get(WIN_NUMBERS);
    response.nextState = responseMap.get(NEXT_STATE);
    response.bonusMultiplier = responseMap.get(BONUS_MULTIPLIER);
    response.featureSymbols = responseMap.get(FEATURE_SYMBOLS);
    response.featureSymbolHit = responseMap.get(FEATURE_SYMBOL_HIT);
    response.totalWon = responseMap.get(TOTAL_WON);
    response.bet = responseMap.get(BASE_BET);
    response.credits = responseMap.get(CREDITS);
    response.totalBet = responseMap.get(TOTAL_BET);
    response.win = responseMap.get(WON);
    response.payoutMultiplier = responseMap.get(PAYOUT_MULTIPLIER);
    response.numberCount = responseMap.get(NUMBER_COUNT);

    //Next State Details
    response.nextStateDetails = responseMap.get(NEXT_STATE_DETAILS);
    response.nextStateDetails.isFreeTriggered = responseMap.get(IS_FREE_TRIGGERED);

    response.nextStateDetails.extraDrawCount = responseMap.get(EXTRA_DRAW_COUNT_BASE);
    response.nextStateDetails.extraDrawCountFree = responseMap.get(EXTRA_DRAW_COUNT_FREE);
    response.nextStateDetails.extraDrawWon = responseMap.get(EXTRA_DRAW_WON);
    response.nextStateDetails.extraDrawnNumbers = responseMap.get(EXTRA_DRAWN_NUMBERS);

    return response;
  }

  createFreeResponse(responseMap, response) {
    response.currentState = responseMap.get(CURRENT_STATE);
    response.betNumbers = responseMap.get(BET_NUMBERS);
    response.drawnNumbers = responseMap.get(DRAWN_NUMBERS);
    response.extraDrawCount = responseMap.get(EXTRA_DRAW_COUNT);
    response.winNumbers = responseMap.get(WIN_NUMBERS);
    response.nextState = responseMap.get(NEXT_STATE);
    response.bonusMultiplier = responseMap.get(BONUS_MULTIPLIER);
    response.featureSymbols = responseMap.get(FEATURE_SYMBOLS);
    response.featureSymbolHit = responseMap.get(FEATURE_SYMBOL_HIT);
    response.totalWon = responseMap.get(TOTAL_WON);
    response.bet = responseMap.get(BASE_BET);
    response.credits = responseMap.get(CREDITS);
    response.totalBet = responseMap.get(TOTAL_BET);
    response.win = responseMap.get(WON);
    response.payoutMultiplier = responseMap.get(PAYOUT_MULTIPLIER);
    response.numberCount = responseMap.get(NUMBER_COUNT);

    //Next State Details
    response.nextStateDetails = responseMap.get(NEXT_STATE_DETAILS);
    response.nextStateDetails.extraDrawCount = responseMap.get(EXTRA_DRAW_COUNT_BASE);
    response.nextStateDetails.extraDrawCountFree = responseMap.get(EXTRA_DRAW_COUNT_FREE);

    //Bonus
    if (responseMap.get(IS_WHEEL_BONUS)) {
      response.nextStateDetails.states.push(GameConstant.WHEEL_BONUS_REQUEST);
      response.nextStateDetails.currentWheelBonusSpin = responseMap.get(CURRENT_WHEEL_BONUS_SPIN);
      response.nextStateDetails.isWheelBonusTriggered = responseMap.get(IS_WHEEL_BONUS);
      response.nextStateDetails.totalWheelBonusSpin = responseMap.get(TOTAL_WHEEL_BONUS_SPIN);
      response.nextStateDetails.totalWheelBonusWon = responseMap.get(TOTAL_WHEEL_BONUS_WON);
      response.nextStateDetails.wheelBonusWin = responseMap.get(WHEEL_BONUS_WON);
    }

    //Extra Draw
    if (responseMap.get(IS_EXTRA_DRAW)) {
      response.nextStateDetails.states.push(GameConstant.EXTRA_DRAW);
      // response.nextStateDetails.isFreeTriggered = responseMap.get(IS_FREE_TRIGGERED);
      // response.nextStateDetails.extraDrawWon = responseMap.get(EXTRA_DRAW_WON);
    }

    //Increase Draw Count
    if (responseMap.get(INCREASE_DRAW_COUNT)) response.nextStateDetails.increaseDrawCount = true;
    else response.nextStateDetails.increaseDrawCount = false;

    //Free Game Data
    response.nextStateDetails.isFreeTriggered = responseMap.get(IS_FREE_TRIGGERED);
    // response.nextStateDetails.currentFreeSpin = responseMap.get(CURRENT_FREE_SPIN);
    // response.nextStateDetails.totalFreeSpin = responseMap.get(TOTAL_FREE_SPIN);
    response.nextStateDetails.currentFreeSpinWon = responseMap.get(CURRENT_FREE_SPIN_WON);
    response.nextStateDetails.totalFreeSpinWon = responseMap.get(TOTAL_FREE_SPIN_WON);

    return response;
  }
}

module.exports = { ResponseGenerator };
