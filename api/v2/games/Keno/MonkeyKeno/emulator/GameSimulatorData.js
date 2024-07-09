const { stateHandler } = require("../engine/requestHandler/StateManagement");
const runlimit = {
  1: 1000000, //10,00,000  MILLION
  2: 1000000000, //1,00,00,00,000 BILLION
  3: 1000000000000 //10,00,00,00,00,000 TRILLION
};
async function run() {
  var cycles = runlimit[2];
  var totalBet = 0;
  var totalBaseWon = 0;
  var totalFreeWon = 0;
  var totalGameWin = 0;
  var doPrint = false;
  var freeGameOdds3 = 0;
  var freeGameOdds4 = 0;
  var freeGameOdds5 = 0;
  var freeGameOddsAll = 0;

  for (var i = 1; i <= cycles; i++) {
    var req = createBaseRequest();
    var previousState = null;
    const baseStateRes = await stateHandler("BASE", req, previousState);
    previousState = baseStateRes;

    if (doPrint) {
      console.log(baseStateRes);
      console.log("Response: \n", baseStateRes);
    }

    // Extracting values from baseStateRes
    var currentState = baseStateRes.state.current;
    var nextState = baseStateRes.state.next;
    var baseBet = baseStateRes.baseBet;
    var scatterCount = baseStateRes.scatter.count;
    var mainSpinCreditsWon = baseStateRes.mainSpinCreditsWon;
    if (scatterCount == 3) {
      freeGameOdds3++;
      freeGameOddsAll++;
    } else if (scatterCount == 4) {
      freeGameOdds4++;
      freeGameOddsAll++;
    } else if (scatterCount == 5) {
      freeGameOdds5++;
      freeGameOddsAll++;
    }
    // Performing calculations
    totalBet = totalBet + baseBet;
    totalBaseWon = totalBaseWon + mainSpinCreditsWon;
    totalGameWin = totalGameWin + mainSpinCreditsWon;
    var firstFreeSpin = true;

    while (
      nextState == "FREE" &&
      (firstFreeSpin ||
        freeStateRes.freeGame.currentFreeSpin !=
          freeStateRes.freeGame.totalFreeSpin)
    ) {
      firstFreeSpin = false;
      req = createFreeRequest();
      var freeStateRes = await stateHandler("FREE", req, previousState);
      previousState = freeStateRes;
      nextState = freeStateRes.state.next;
      var freeSpinCreditsWon = freeStateRes.freeSpinCreditsWon;
      totalFreeWon = totalFreeWon + freeSpinCreditsWon;
      totalGameWin = totalGameWin + freeSpinCreditsWon;
    }

    // Output the results
    if (doPrint) {
      console.log(`Current State: ${currentState}`);
      console.log(`Next State: ${nextState}`);
      console.log(`Base Bet: ${baseBet}`);
      console.log(`Main Spin Credits Won: ${mainSpinCreditsWon}`);
      console.log(`Total Bet: ${totalBet}`);
      console.log(`Total Won: ${totalGameWin}`);
    }

    // read base game response , add to base win
    // call continue if next state is free , add to free win
    // call continue for other states too , add to there respective wins
    // calculate the rtp = totalwin/totalbet
    // also calculate the standard deviation

    if (i % 10000 == 0) console.log("At : ", i);
  }
  console.log(`#simulations: ${cycles}`);
  console.log(`Total Bet: ${totalBet}`);
  console.log(`Total Free game won : ${totalFreeWon}`);
  console.log(`Total Base game won : ${totalBaseWon}`);
  console.log(`Total Won: ${totalGameWin}`);
  const baseWinPercentage = (totalBaseWon / totalBet) * 100;
  const freeWinPercentage = (totalFreeWon / totalBet) * 100;
  const totalWinPercentage = (totalGameWin / totalBet) * 100;
  const scatter3odds = cycles / freeGameOdds3;
  const scatter4odds = cycles / freeGameOdds4;
  const scatter5odds = cycles / freeGameOdds5;
  const scatterTotalOdds = cycles / freeGameOddsAll;

  console.log(`Base Win Percentage: ${baseWinPercentage}%`);
  console.log(`Free Win Percentage: ${freeWinPercentage}%`);
  console.log(`Total Win Percentage: ${totalWinPercentage}%`);
  console.log(`Free Game odds 3 scatter: ${scatter3odds}%`);
  console.log(`Free Game odds 4 scatter: ${scatter4odds}%`);
  console.log(`Free Game odds 5 scatter: ${scatter5odds}%`);
  console.log(`Free Game odds total scatter: ${scatterTotalOdds}%`);
}

function createBaseRequest() {
  let baseRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 40,
    type: "BASE",
    playerId: "1",
    gameId: "1001"
  };
  return baseRequest;
}

function createFreeRequest() {
  let freeRequest = {
    credits: 1,
    isBuyFeature: false,
    bet: 40,
    type: "FREE",
    playerId: "1",
    gameId: "1001"
  };
  return freeRequest;
}

run();
