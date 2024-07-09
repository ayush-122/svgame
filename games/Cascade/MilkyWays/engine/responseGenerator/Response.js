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
  STAR_FREE_SPIN_WON,
  STAR_FREE_GAME_TRIGGER,
  IS_REWARD_FREE_GAME,
  STAR_POSITION,
  STAR_COUNT,
  STAR_DATA_PRESENT,
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
  REEL_STAR_POSITION,
  CASCADEPROGRESS,
} = require("./ResponseConstants");

class ResponseGenerator {
  constructor() {}

  createNew() {
    const responseJson = {
      balance: 99753,
      baseBet: null,
      creditValue: null,
      betMultiplier: null,
      reelMode: 0,
      currentState: null,
      nextState: null,
      //    reelStops: null,
      matrix: null,
      payline: [],
      starPositions: [],
      cascadingWinProgress: {},
      star: {
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
      mainSpinCreditsWon: 0,
      creditsWonOnBaseSpin: 0,
      baseGameCascadeWon: 0,
      freeSpinCreditsWon: 0,
      freeGameCascadeWon: 0,
      freeSpinTotalWon: 0,
      totalCreditsWon: 0,
      creditsWagered: 30,
      finalWinnings: {
        TotalWon: 0,
        net: 0,
      },
      cascadeProgress: -1,
      lastCascadingReels: -1,
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
      currentState: null,
      nextState: null,
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
    response.starPositions = responseMap.get(REEL_STAR_POSITION);

    const starDataPresent = responseMap.get(STAR_DATA_PRESENT);
    const cascadeProgress = responseMap.get(CASCADEPROGRESS);
    if (cascadeProgress) {
      response.cascadingWinProgress = cascadeProgress;
    }
    if (starDataPresent) {
      response.star.count = responseMap.get(STAR_COUNT);
      response.star.position = responseMap.get(STAR_POSITION); //countScatter.position;

      const isRewardFreeGame = responseMap.get(IS_REWARD_FREE_GAME);

      if (isRewardFreeGame) {
        response.star.freegametrigger = responseMap.get(STAR_FREE_GAME_TRIGGER);
        response.star.freeSpinWon = responseMap.get(STAR_FREE_SPIN_WON);
        response.freeGame.totalFreeSpin = responseMap.get(FREE_GAME_TOTAL_FREE_SPIN);
        response.freeGame.currentFreeSpin = responseMap.get(FREE_GAME_CURRENT_FREE_SPIN);
        response.currentState = responseMap.get(STATE_CURRENT);
      }
    }

    response.nextState = responseMap.get(STATE_NEXT);
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

    response.star.count = responseMap.get(STAR_COUNT);
    response.star.position = responseMap.get(STAR_POSITION); //countScatter.position;
    response.freeGame.totalFreeSpin = responseMap.get(FREE_GAME_TOTAL_FREE_SPIN);
    response.freeGame.currentFreeSpin = responseMap.get(FREE_GAME_CURRENT_FREE_SPIN);
    response.currentState = responseMap.get(STATE_CURRENT);

    response.nextState = responseMap.get(STATE_NEXT);
    response.next = responseMap.get(NEXT);
    response.finalWinnings.TotalWon = responseMap.get(FREE_GAME_TOTAL_WON);
    response.finalWinnings.net = responseMap.get(FINAL_WINNINGS_NET);
    response.mainSpinCreditsWon = responseMap.get(MAIN_SPIN_CREDITS_WON);
    response.freeSpinTotalWon = responseMap.get(FREE_SPIN_TOTAL_WON);
    response.freeSpinCreditsWon = responseMap.get(FREE_SPIN_CREDITS_WON);
    response.totalCreditsWon = responseMap.get(TOTAL_CREDITS_WON);

    return response;
  }
}

module.exports = { ResponseGenerator };
