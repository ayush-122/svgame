const {
  TOTAL_CREDITS_WON,
  MAIN_SPIN_CREDITS_WON,
  FINAL_WINNINGS_NET,
  FINAL_WINNINGS_TOTAL_WON,
  NEXT,
  STATE_NEXT,
  STATE_CURRENT,
  FREE_GAME_CURRENT_FREE_SPIN,
  FREE_GAME_TOTAL_FREE_SPIN,
  SCATTER_FREE_SPIN_WON,
  SCATTER_FREE_GAME_TRIGGER,
  IS_REWARD_FREE_GAME,
  SCATTER_POSITION,
  SCATTER_COUNT,
  SCATTER_DATA_PRESENT,
  // FEATURE_PAYLINES,
  // FEATURE_REELS,
  // IS_FEATURE_DATA_PRESENT,
  // IS_FEATURE_EXPANDED,
  // EXPANDING_POSITION,
  // EXPANDING_WILD,
  PAYLINE,
  MATRIX,
  REEL_STOPS,
  CREDIT_VALUE,
  BET_MULTIPLIER,
  FREE_SPIN_CREDITS_WON,
  FREE_SPIN_TOTAL_WON,
  FREE_GAME_TOTAL_WON,
  BONUS_DATA_PRESENT,
  BONUS_COUNT,
  BONUS_POSITION,
  TOTAL_BONUS_WIN,
  IS_FREE_GAME_RETRIGGER,
  PICK_BONUS_DATA,
  CREDITS_WAGERED,
} = require("./ResponseConstants");

class ResponseGenerator {
  constructor() {}

  createNew() {
    const responseJson = {
      balance: 99753,
      baseBet: 40,
      creditValue: null,
      betMultiplier: 1,
      reelMode: 0,
      state: {
        current: "",
        next: "",
      },
      reelStops: null,
      matrix: null,
      payline: [],
      scatter: {
        count: 0,
        position: [],
        freeGameTrigger: false,
        freeGameRetrigger: false,
        creditWon: 0,
        freeSpinWon: 0,
      },
      freeGame: {
        currentFreeSpin: 0,
        totalFreeSpin: 0,
        remainingFreeSpin: 0,
        freeSpinCreditsWon: 0,
        freeSpinTotalWon: 0,
      },
      bonus: {
        // wheelSpin: {
        //   award: "",
        //   amount: 0,
        // },
        bonusTrigger: false,
        count: 0,
        position: [],
        totalBonusWin: 0,
      },
      mainSpinCreditsWon: 0,
      creditsWonOnBaseSpin: 0,
      totalCreditsWon: 0,
      creditsWagered: 40,
      finalWinnings: {
        TotalWon: 0,
        net: 0,
      },
      next: {
        nextState: "",
      },
    };
    return responseJson;
  }

  createWheelNew() {
    const responseJson = {
      pickBonus: {
        rewards: [],
        amount: 0,
        totalBonusWin: 0,
      },
      state: {
        current: "",
        next: "",
      },
      next: "",
    };
    return responseJson;
  }

  createResponse(responseMap, response) {
    response.reelStops = responseMap.get(REEL_STOPS); //setting reels
    response.matrix = responseMap.get(MATRIX); // matrix
    response.payline = responseMap.get(PAYLINE); //paylines
    response.creditValue = responseMap.get(CREDIT_VALUE);
    // response.betMultiplier = responseMap.get(BET_MULTIPLIER);

    // response.expandingWild = responseMap.get(EXPANDING_WILD); //expanding wild
    // response.expandingPosition = responseMap.get(EXPANDING_POSITION); //expanding wild positions

    // const isFeatureExpanded = responseMap.get(IS_FEATURE_EXPANDED);
    // const isFeatureDataPresent = responseMap.get(IS_FEATURE_DATA_PRESENT);

    // if (isFeatureExpanded && isFeatureDataPresent) {
    //   response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    //   response.featureReels = responseMap.get(FEATURE_REELS);
    // } else {
    //   response.featureReels = responseMap.get(FEATURE_REELS);
    //   response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    // }

    const scatterDataPresent = responseMap.get(SCATTER_DATA_PRESENT);

    const bonusTriggerData = responseMap.get(BONUS_DATA_PRESENT);
    if (bonusTriggerData) {
      response.bonus.bonusTrigger = bonusTriggerData;
      response.bonus.count = responseMap.get(BONUS_COUNT);
      response.bonus.position = responseMap.get(BONUS_POSITION);
    }

    if (scatterDataPresent) {
      response.scatter.count = responseMap.get(SCATTER_COUNT);
      response.scatter.position = responseMap.get(SCATTER_POSITION); //countScatter.position;

      const isRewardFreeGame = responseMap.get(IS_REWARD_FREE_GAME);

      if (isRewardFreeGame) {
        response.scatter.freeGameTrigger = responseMap.get(SCATTER_FREE_GAME_TRIGGER);
        response.scatter.freeSpinWon = responseMap.get(SCATTER_FREE_SPIN_WON);
        response.freeGame.totalFreeSpin = responseMap.get(FREE_GAME_TOTAL_FREE_SPIN);
        response.freeGame.currentFreeSpin = responseMap.get(FREE_GAME_CURRENT_FREE_SPIN);
        response.freeGame.remainingFreeSpin = response.freeGame.totalFreeSpin - response.freeGame.currentFreeSpin;
        response.state.current = responseMap.get(STATE_CURRENT);
      }
    }
    response.creditsWagered = responseMap.get(CREDITS_WAGERED);
    response.state.next = responseMap.get(STATE_NEXT);
    response.next = responseMap.get(NEXT);
    response.finalWinnings.TotalWon = responseMap.get(FINAL_WINNINGS_TOTAL_WON);
    response.finalWinnings.net = responseMap.get(FINAL_WINNINGS_NET);
    response.mainSpinCreditsWon = responseMap.get(MAIN_SPIN_CREDITS_WON);
    response.totalCreditsWon = responseMap.get(TOTAL_CREDITS_WON);

    return response;
  }

  createFreeResponse(responseMap, response) {
    response.reelStops = responseMap.get(REEL_STOPS); //setting reels
    response.matrix = responseMap.get(MATRIX); // matrix
    response.payline = responseMap.get(PAYLINE); //paylines
    response.creditValue = responseMap.get(CREDIT_VALUE);
    response.betMultiplier = responseMap.get(BET_MULTIPLIER);

    // response.expandingWild = responseMap.get(EXPANDING_WILD); //expanding wild
    // response.expandingPosition = responseMap.get(EXPANDING_POSITION); //expanding wild positions

    // const isFeatureExpanded = responseMap.get(IS_FEATURE_EXPANDED);
    // const isFeatureDataPresent = responseMap.get(IS_FEATURE_DATA_PRESENT);

    // if (isFeatureExpanded && isFeatureDataPresent) {
    //   response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    //   response.featureReels = responseMap.get(FEATURE_REELS);
    // } else {
    //   response.featureReels = responseMap.get(FEATURE_REELS);
    //   response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    // }

    response.scatter.freeGameTrigger = true;
    if (responseMap.get(IS_FREE_GAME_RETRIGGER)) {
      response.scatter.count = responseMap.get(SCATTER_COUNT);
      response.scatter.position = responseMap.get(SCATTER_POSITION); //countScatter.position;
      response.scatter.freeGameRetrigger = responseMap.get(IS_FREE_GAME_RETRIGGER);
      response.scatter.freeSpinWon = responseMap.get(SCATTER_FREE_SPIN_WON);
    }
    response.freeGame.totalFreeSpin = responseMap.get(FREE_GAME_TOTAL_FREE_SPIN);
    response.freeGame.currentFreeSpin = responseMap.get(FREE_GAME_CURRENT_FREE_SPIN);
    response.state.current = responseMap.get(STATE_CURRENT);

    response.creditsWagered = responseMap.get(CREDITS_WAGERED);
    response.state.next = responseMap.get(STATE_NEXT);
    response.next = responseMap.get(NEXT);
    response.finalWinnings.TotalWon = responseMap.get(FREE_GAME_TOTAL_WON);
    response.finalWinnings.net = responseMap.get(FINAL_WINNINGS_NET);
    response.mainSpinCreditsWon = responseMap.get(MAIN_SPIN_CREDITS_WON);
    response.freeGame.freeSpinTotalWon = responseMap.get(FREE_SPIN_TOTAL_WON);
    response.freeGame.freeSpinCreditsWon = responseMap.get(FREE_SPIN_CREDITS_WON);
    response.freeGame.remainingFreeSpin = response.freeGame.totalFreeSpin - response.freeGame.currentFreeSpin;
    response.totalCreditsWon = responseMap.get(TOTAL_CREDITS_WON);

    return response;
  }

  createPickBonusResponse(responseMap, response) {
    response.pickBonus = responseMap.get(PICK_BONUS_DATA);
    response.pickBonus.totalBonusWin = responseMap.get(TOTAL_BONUS_WIN);
    response.state.current = responseMap.get(STATE_CURRENT);
    response.state.next = responseMap.get(NEXT);
    response.next = responseMap.get(NEXT);
    return response;
  }
}

module.exports = { ResponseGenerator };
