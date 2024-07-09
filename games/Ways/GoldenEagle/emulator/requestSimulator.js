// Define the run function outside of the else block
const { stateHandler } = require("../engine/requestHandler/StateManagement");
const helper = require("./GameSimulation.helpers");
const runlimit = {
  1: 10000000, // 10,00,000  MILLION
  2: 1000000000, // 10,00,00,000  100 MILLION
  3: 1000000000, // 1,00,00,00,000 BILLION
  4: 1000000000000, // 10,00,00,00,00,000 TRILLION
  5: 1000, // 1000      // Thousand
};

async function run(numCPUs) {
  try {
    let cycles = runlimit[2] / numCPUs;
    let totalBet = 0;
    let totalBaseWon = 0;
    let totalFreeWon = 0;
    let totalRespinWon = 0;
    let totalGameWin = 0;
    let doPrint = false;
    let freeGameOdds3 = 0;
    let freeGameOdds4 = 0;
    let freeGameOdds5 = 0;
    let freeGameOddsAll = 0;
    let respinGameOddsAll = 0;

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
      let currentState = baseStateRes.currentState;
      let nextState = baseStateRes.nextState;
      let baseBet = baseStateRes.baseBet;
      let mainSpinCreditsWon = baseStateRes.mainSpinCreditsWon;

      //Add Scatter Details
      if (nextState == "FREE") {
        let scatterCount = baseStateRes.stateDetails.scatterCount;
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
      }
      // Performing calculations
      totalBet = totalBet + baseBet;
      totalBaseWon = totalBaseWon + mainSpinCreditsWon;
      totalGameWin = totalGameWin + mainSpinCreditsWon;
      let firstFreeSpin = true;
      let freeStateRes = {};
      let currentFreeSpin = 0;
      let totalFreeSpin = 0;

      while (nextState == "FREE" && (firstFreeSpin || currentFreeSpin != totalFreeSpin)) {
        firstFreeSpin = false;
        req = helper.createFreeRequest();
        freeStateRes = await stateHandler("FREE", req, previousState);
        currentFreeSpin = freeStateRes.stateDetails.currentFreeSpin;
        totalFreeSpin = freeStateRes.stateDetails.totalFreeSpin;
        previousState = freeStateRes;
        nextState = freeStateRes.nextState;
        let freeSpinCreditsWon = freeStateRes.stateDetails.freeSpinCreditsWon;
        totalFreeWon = totalFreeWon + freeSpinCreditsWon;
        totalGameWin = totalGameWin + freeSpinCreditsWon;
      }

      while (nextState == "RESPIN") {
        respinGameOddsAll++;
        req = helper.createRespinRequest();
        let respinStateRes = await stateHandler("RESPIN", req, previousState);
        previousState = respinStateRes;
        nextState = respinStateRes.nextState;
        let respinCreditsWon = respinStateRes.stateDetails.baseRespinCreditWon;
        totalRespinWon = totalRespinWon + respinCreditsWon;
        totalGameWin = totalGameWin + respinCreditsWon;
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
        const freeWinPercentage = (totalFreeWon / totalBet) * 100;
        const respinWinPercentage = (totalRespinWon / totalBet) * 100;
        const totalWinPercentage = (totalGameWin / totalBet) * 100;
        const scatter3odds = cycles / freeGameOdds3;
        const scatter4odds = cycles / freeGameOdds4;
        const scatter5odds = cycles / freeGameOdds5;
        const scatterTotalOdds = cycles / freeGameOddsAll;
        const respinTotalOdds = cycles / respinGameOddsAll;

        console.log(
          i,
          `BaseWinPct: ${baseWinPercentage.toFixed(2)}% | FreeWinPct: ${freeWinPercentage.toFixed(
            2
          )}% | RespinWinPct: ${respinWinPercentage.toFixed(2)}% | TotalWinPct: ${totalWinPercentage.toFixed(
            2
          )}% | FreeOdds3: ${scatter3odds.toFixed(2)} | FreeOdds4: ${scatter4odds.toFixed(
            2
          )} | FreeOdds5: ${scatter5odds.toFixed(2)} | FreeOddsTotal: ${scatterTotalOdds.toFixed(
            2
          )} | RespinOddsTotal: ${respinTotalOdds.toFixed(2)}`
        );
      }
    }
    console.log(`Worker ${process.pid} finished simulation`);
    let obj = {
      cycles,
      totalBet,
      totalBaseWon,
      totalFreeWon,
      totalRespinWon,
      totalGameWin,
      doPrint,
      freeGameOdds3,
      freeGameOdds4,
      freeGameOdds5,
      freeGameOddsAll,
      respinGameOddsAll,
    };
    return obj;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

module.exports = { run };
