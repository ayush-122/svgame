// Define the run function outside of the else block
const { stateHandler } = require("../engine/requestHandler/StateManagement");
const helper = require("./GameSimulation.helpers");
const runlimit = {
  1: 1000000, // 10,00,000  MILLION
  2: 100000000, // 10,00,00,000  100 MILLION
  3: 1000000000, // 1,00,00,00,000 BILLION
  4: 1000000000000, // 10,00,00,00,00,000 TRILLION
  5: 1000, // 1000      // Thousand
};

async function run(numCPUs) {
  try {
    let cycles = runlimit[3] / numCPUs;
    let totalBet = 0;
    let totalBaseWon = 0;
    let totalBaseFeatWon = 0;
    let totalFreeWon = 0;
    let totalFreeFeatWon = 0;
    let totalPickBonusWon = 0;
    let totalGameWin = 0;
    let doPrint = false;

    console.log(`Worker ${process.pid} running simulation`);

    for (let i = 1; i <= cycles; i++) {
      let req = helper.createBaseRequest();
      // console.log("This is the start ********");
      let previousState = null;
      const baseStateRes = await stateHandler("BASE", req, previousState);
      baseStateRes.raw_request = req;
      previousState = baseStateRes;

      if (doPrint) {
        console.log(baseStateRes);
        console.log("Response: \n", baseStateRes);
      }

      // Extracting values from baseStateRes
      let currentState = baseStateRes.state.current;
      let nextState = baseStateRes.state.next;
      let baseBet = baseStateRes.baseBet;
      let mainSpinCreditsWon = baseStateRes.mainSpinCreditsWon - baseStateRes.featureWin;
      totalBaseFeatWon += baseStateRes.featureWin;
      // Performing calculations
      totalBet = totalBet + baseBet;
      totalBaseWon = totalBaseWon + mainSpinCreditsWon;
      totalGameWin = totalGameWin + mainSpinCreditsWon + baseStateRes.featureWin;
      let firstFreeSpin = true;
      let freeStateRes = {};
      let currentFreeSpin = 0;
      let totalFreeSpin = 0;

      while (nextState == "FREE" && (firstFreeSpin || currentFreeSpin != totalFreeSpin)) {
        firstFreeSpin = false;
        req = helper.createFreeRequest();
        freeStateRes = await stateHandler("FREE", req, previousState);
        currentFreeSpin = freeStateRes.freeGame.currentFreeSpin;
        totalFreeSpin = freeStateRes.freeGame.totalFreeSpin;
        previousState = freeStateRes;
        nextState = freeStateRes.state.next;
        let freeSpinCreditsWon = freeStateRes.freeGame.freeSpinCreditsWon - freeStateRes.featureWin;
        totalFreeFeatWon += freeStateRes.featureWin;
        totalFreeWon = totalFreeWon + freeSpinCreditsWon;
        totalGameWin = totalGameWin + freeSpinCreditsWon + freeStateRes.featureWin;
      }

      while (nextState == "PICK_BONUS") {
        req = helper.createWheelRequest();
        let pickStateRes = await stateHandler("PICK_BONUS", req, previousState);
        previousState = pickStateRes;
        nextState = pickStateRes.state.next;
        let pickBonusCreditsWon = pickStateRes.pickBonus.totalBonusWin;
        totalPickBonusWon = totalPickBonusWon + pickBonusCreditsWon;
        totalGameWin = totalGameWin + pickBonusCreditsWon;
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

      if (i % 1000000 == 0) {
        const baseWinPercentage = (totalBaseWon / totalBet) * 100;
        const baseFeatWinPercentage = (totalBaseFeatWon / totalBet) * 100;
        const freeWinPercentage = (totalFreeWon / totalBet) * 100;
        const freeFeatWonPercentage = (totalFreeFeatWon / totalBet) * 100;
        const pickWinPercentage = (totalPickBonusWon / totalBet) * 100;
        const totalWinPercentage = (totalGameWin / totalBet) * 100;

        console.log(
          i,
          `BaseWinPct: ${baseWinPercentage.toFixed(2)}% | BaseFeatWinPct: ${baseFeatWinPercentage.toFixed(
            2
          )}% | FreeWinPct: ${freeWinPercentage.toFixed(2)}% | FreeFeatPercent: ${freeFeatWonPercentage.toFixed(
            2
          )}% | PickWinPct: ${pickWinPercentage.toFixed(2)}% |  TotalWinPct: ${totalWinPercentage.toFixed(2)}%`
        );
      }
      // console.log(`Worker ${process.pid} running Finished`);
    }
    console.log(`Worker ${process.pid} finished simulation`);
    let obj = {
      cycles,
      totalBet,
      totalBaseWon,
      totalBaseFeatWon,
      totalFreeWon,
      totalFreeFeatWon,
      totalPickBonusWon,
      totalGameWin,
      doPrint,
    };
    return obj;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

module.exports = { run };
