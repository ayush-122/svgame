const {
  TOTAL_CREDITS_WON,
  MAIN_SPIN_CREDITS_WON,
  FINAL_WINNINGS_NET,
  FINAL_WINNINGS_TOTAL_WON,
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
  FEATURE_PAYLINES,
  FEATURE_REELS,
  IS_FEATURE_DATA_PRESENT,
  IS_FEATURE_EXPANDED,
  EXPANDING_POSITION,
  EXPANDING_WILD,
  PAYLINE,
  MATRIX,
  REEL_STOPS,
  CREDIT_VALUE,
  BET_MULTIPLIER,
  FREE_SPIN_CREDITS_WON,
  FREE_SPIN_TOTAL_WON,
  FREE_GAME_TOTAL_WON,
  RESPIN_GAME_TOTAL_SPIN,
  RESPIN_GAME_CURRENT_SPIN,
  RESPIN_SPIN_CREDITS_WON,
  RESPIN_GAME_TOTAL_WON,
  BONUS_DATA_PRESENT,
  BONUS_COUNT,
  BONUS_POSITION,
  TOTAL_BONUS_WIN,
} = require("./ResponseConstants");

class ResponseGenerator {
  constructor() {}

  createNew() {
    const responseJson = {
      balance: 99753,
      baseBet: null,
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
        position: 0,
        freegametrigger: false,
        freeGameRetrigger: false,
        creditWon: 0,
        freeSpinWon: 0,
      },
      freeGame: {
        currentFreeSpin: 0,
        totalFreeSpin: 0,
      },
      // bonus: {
      //   wheelSpin: {
      //     award: "",
      //     amount: 0
      //   },
      //   bonusTrigger: false,
      //   bonusSymbolCount: 0,
      //   bonusSymbolPos: "",
      //   TotalBonusWin: 0
      // },
      bonus: {
        count: 0,
        position: 0,
        bonusGameTrigger: false,
        creditWon: 0,
        RespinWon: 0,
      },
      reSpinGame: {
        // currentRespin: 0,
        // totalRespin: 0,
      },
      mainSpinCreditsWon: 0,
      creditsWonOnBaseSpin: 0,
      freeSpinCreditsWon: 0,
      freeSpinTotalWon: 0,
      baseRespinCreditWon: 0,
      baseRespinTotalWon: 0,
      totalCreditsWon: 0,
      creditsWagered: 30,
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
      wheelSpin: {
        award: "",
        amount: 0,
      },
      state: {
        current: "",
        next: "",
      },
      freeGame: {},
      next: "",
      totalBonusWin: 0,
    };
    return responseJson;
  }

  createResponse(responseMap, response) {
    response.reelStops = responseMap.get(REEL_STOPS); //setting reels
    response.matrix = responseMap.get(MATRIX); // matrix
    response.payline = responseMap.get(PAYLINE); //paylines
    response.creditValue = responseMap.get(CREDIT_VALUE);
    // response.betMultiplier = responseMap.get(BET_MULTIPLIER);

    response.expandingWild = responseMap.get(EXPANDING_WILD); //expanding wild
    response.expandingPosition = responseMap.get(EXPANDING_POSITION); //expanding wild positions

    const isFeatureExpanded = responseMap.get(IS_FEATURE_EXPANDED);
    const isFeatureDataPresent = responseMap.get(IS_FEATURE_DATA_PRESENT);

    if (isFeatureExpanded && isFeatureDataPresent) {
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
      response.featureReels = responseMap.get(FEATURE_REELS);
    } else {
      response.featureReels = responseMap.get(FEATURE_REELS);
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    }

    const scatterDataPresent = responseMap.get(SCATTER_DATA_PRESENT);

    response.reSpinGame.totalRespin = responseMap.get(RESPIN_GAME_TOTAL_SPIN);
    response.reSpinGame.currentRespin = responseMap.get(RESPIN_GAME_CURRENT_SPIN);

    //Bonus
    const bonusTriggerData = responseMap.get(BONUS_DATA_PRESENT);
    if (bonusTriggerData) {
      response.bonus.bonusGameTrigger = bonusTriggerData;
      response.bonus.count = responseMap.get(BONUS_COUNT);
      response.bonus.position = responseMap.get(BONUS_POSITION);
    }

    if (scatterDataPresent) {
      response.scatter.count = responseMap.get(SCATTER_COUNT);
      response.scatter.position = responseMap.get(SCATTER_POSITION); //countScatter.position;

      const isRewardFreeGame = responseMap.get(IS_REWARD_FREE_GAME);

      if (isRewardFreeGame) {
        response.scatter.freegametrigger = responseMap.get(SCATTER_FREE_GAME_TRIGGER);
        response.scatter.freeSpinWon = responseMap.get(SCATTER_FREE_SPIN_WON);
        response.freeGame.totalFreeSpin = responseMap.get(FREE_GAME_TOTAL_FREE_SPIN);
        response.freeGame.currentFreeSpin = responseMap.get(FREE_GAME_CURRENT_FREE_SPIN);
        response.state.current = responseMap.get(STATE_CURRENT);
      }
    }
    response.state.current = responseMap.get(STATE_CURRENT);
    response.state.next = responseMap.get(STATE_NEXT);
    response.next = responseMap.get(STATE_NEXT);
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

    response.expandingWild = responseMap.get(EXPANDING_WILD); //expanding wild
    response.expandingPosition = responseMap.get(EXPANDING_POSITION); //expanding wild positions

    const isFeatureExpanded = responseMap.get(IS_FEATURE_EXPANDED);
    const isFeatureDataPresent = responseMap.get(IS_FEATURE_DATA_PRESENT);

    if (isFeatureExpanded && isFeatureDataPresent) {
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
      response.featureReels = responseMap.get(FEATURE_REELS);
    } else {
      response.featureReels = responseMap.get(FEATURE_REELS);
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    }

    response.scatter.count = responseMap.get(SCATTER_COUNT);
    response.scatter.position = responseMap.get(SCATTER_POSITION); //countScatter.position;
    response.freeGame.totalFreeSpin = responseMap.get(FREE_GAME_TOTAL_FREE_SPIN);
    response.freeGame.currentFreeSpin = responseMap.get(FREE_GAME_CURRENT_FREE_SPIN);
    response.state.current = responseMap.get(STATE_CURRENT);

    response.state.next = responseMap.get(STATE_NEXT);
    response.next = responseMap.get(STATE_NEXT);
    response.finalWinnings.TotalWon = responseMap.get(FREE_GAME_TOTAL_WON);
    response.finalWinnings.net = responseMap.get(FINAL_WINNINGS_NET);
    response.mainSpinCreditsWon = responseMap.get(MAIN_SPIN_CREDITS_WON);
    response.freeSpinTotalWon = responseMap.get(FREE_SPIN_TOTAL_WON);
    response.freeSpinCreditsWon = responseMap.get(FREE_SPIN_CREDITS_WON);
    response.totalCreditsWon = responseMap.get(TOTAL_CREDITS_WON);

    return response;
  }

  createRespinResponse(responseMap, response) {
    response.reelStops = responseMap.get(REEL_STOPS); //setting reels
    response.matrix = responseMap.get(MATRIX); // matrix
    response.payline = responseMap.get(PAYLINE); //paylines
    response.creditValue = responseMap.get(CREDIT_VALUE);
    response.betMultiplier = responseMap.get(BET_MULTIPLIER);

    response.expandingWild = responseMap.get(EXPANDING_WILD); //expanding wild
    response.expandingPosition = responseMap.get(EXPANDING_POSITION); //expanding wild positions

    const isFeatureExpanded = responseMap.get(IS_FEATURE_EXPANDED);
    const isFeatureDataPresent = responseMap.get(IS_FEATURE_DATA_PRESENT);

    if (isFeatureExpanded && isFeatureDataPresent) {
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
      response.featureReels = responseMap.get(FEATURE_REELS);
    } else {
      response.featureReels = responseMap.get(FEATURE_REELS);
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    }

    // //Bonus
    // response.bonus.bonusGameTrigger = responseMap.get(BONUS_DATA_PRESENT);
    // response.bonus.count = responseMap.get(BONUS_COUNT);
    // response.bonus.position = responseMap.get(BONUS_POSITION);

    // response.scatter.count = responseMap.get(SCATTER_COUNT);
    // response.scatter.position = responseMap.get(SCATTER_POSITION); //countScatter.position;
    response.reSpinGame.totalRespin = responseMap.get(RESPIN_GAME_TOTAL_SPIN);
    response.reSpinGame.currentRespin = responseMap.get(RESPIN_GAME_CURRENT_SPIN);
    response.state.current = responseMap.get(STATE_CURRENT);

    response.state.next = responseMap.get(STATE_NEXT);
    response.next = responseMap.get(STATE_NEXT);
    response.finalWinnings.TotalWon = responseMap.get(FREE_GAME_TOTAL_WON);
    response.finalWinnings.net = responseMap.get(FINAL_WINNINGS_NET);
    response.mainSpinCreditsWon = responseMap.get(MAIN_SPIN_CREDITS_WON);
    response.freeSpinTotalWon = responseMap.get(FREE_SPIN_TOTAL_WON);
    response.freeSpinCreditsWon = responseMap.get(FREE_SPIN_CREDITS_WON);
    response.baseRespinTotalWon = responseMap.get(RESPIN_GAME_TOTAL_WON);
    response.baseRespinCreditWon = responseMap.get(RESPIN_SPIN_CREDITS_WON);
    response.totalCreditsWon = responseMap.get(TOTAL_CREDITS_WON);

    return response;
  }

  createWheelResponse(responseMap, response) {
    response.reelStops = responseMap.get(REEL_STOPS); //setting reels
    response.matrix = responseMap.get(MATRIX); // matrix
    response.payline = responseMap.get(PAYLINE); //paylines
    response.creditValue = responseMap.get(CREDIT_VALUE);
    // response.betMultiplier = responseMap.get(BET_MULTIPLIER);

    response.expandingWild = responseMap.get(EXPANDING_WILD); //expanding wild
    response.expandingPosition = responseMap.get(EXPANDING_POSITION); //expanding wild positions

    const isFeatureExpanded = responseMap.get(IS_FEATURE_EXPANDED);
    const isFeatureDataPresent = responseMap.get(IS_FEATURE_DATA_PRESENT);

    if (isFeatureExpanded && isFeatureDataPresent) {
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
      response.featureReels = responseMap.get(FEATURE_REELS);
    } else {
      response.featureReels = responseMap.get(FEATURE_REELS);
      response.featurePaylines = responseMap.get(FEATURE_PAYLINES);
    }

    //Bonus
    response.totalBonusWin = responseMap.get(TOTAL_BONUS_WIN);
    response.state.current = responseMap.get(STATE_CURRENT);
    response.state.next = responseMap.get(STATE_NEXT);
    response.next = responseMap.get(STATE_NEXT);
    response.finalWinnings.TotalWon = responseMap.get(FINAL_WINNINGS_TOTAL_WON);
    response.finalWinnings.net = responseMap.get(FINAL_WINNINGS_NET);
    response.mainSpinCreditsWon = responseMap.get(MAIN_SPIN_CREDITS_WON);
    response.totalCreditsWon = responseMap.get(TOTAL_CREDITS_WON);

    return response;
  }
}

module.exports = { ResponseGenerator };
