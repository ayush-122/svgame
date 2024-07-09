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
    let totalBaseWildWon = 0;
    let totalFreeWildWon = 0;
    let totalFreeWon = 0;
    let totalGameWin = 0;
    let doPrint = false;
    let freeGameOdds3 = 0;
    let freeGameOdds4 = 0;
    let freeGameOdds5 = 0;
    let freeGameOddsAll = 0;

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
      let scatterCount = baseStateRes.scatter.count;
      let mainSpinCreditsWon = baseStateRes.mainSpinCreditsWon - baseStateRes.featureWin;
      totalBaseWildWon += baseStateRes.featureWin;

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
      totalGameWin = totalGameWin + baseStateRes.mainSpinCreditsWon;
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
        let freeSpinCreditsWon = freeStateRes.freeGame.freeSpinCreditsWon;
        totalGameWin = totalGameWin + freeSpinCreditsWon;
        freeSpinCreditsWon = freeSpinCreditsWon - freeStateRes.featureWin; //NOTE - FOR Simulation
        totalFreeWon = totalFreeWon + freeSpinCreditsWon;
        totalFreeWildWon = totalFreeWildWon + freeStateRes.featureWin;
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
        const baseWildPercentage = (totalBaseWildWon / totalBet) * 100;
        const freeWildPercentage = (totalFreeWildWon / totalBet) * 100;
        const freeWinPercentage = (totalFreeWon / totalBet) * 100;
        const totalWinPercentage = (totalGameWin / totalBet) * 100;
        const scatter3odds = cycles / freeGameOdds3;
        const scatter4odds = cycles / freeGameOdds4;
        const scatter5odds = cycles / freeGameOdds5;
        const scatterTotalOdds = cycles / freeGameOddsAll;

        console.log(
          i,
          `BaseWinPct: ${baseWinPercentage.toFixed(2)}% | ExpandingWildBasePct: ${baseWildPercentage.toFixed(
            2
          )}% | FreeWinPct: ${freeWinPercentage.toFixed(2)}% | ExpandingWildFreePct: ${freeWildPercentage.toFixed(
            2
          )}% | TotalWinPct: ${totalWinPercentage.toFixed(2)}% | FreeOdds3: ${scatter3odds.toFixed(
            2
          )} | FreeOdds4: ${scatter4odds.toFixed(2)} | FreeOdds5: ${scatter5odds.toFixed(
            2
          )} | FreeOddsTotal: ${scatterTotalOdds.toFixed(2)}`
        );
      }
      // console.log(`Worker ${process.pid} running Finished`);
    }
    console.log(`Worker ${process.pid} finished simulation`);
    let obj = {
      cycles,
      totalBet,
      totalBaseWon,
      totalBaseWildWon,
      totalFreeWildWon,
      totalFreeWon,
      totalGameWin,
      doPrint,
      freeGameOdds3,
      freeGameOdds4,
      freeGameOdds5,
      freeGameOddsAll,
    };
    return obj;
    // console.log(obj);
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

module.exports = { run };
// run(1);
