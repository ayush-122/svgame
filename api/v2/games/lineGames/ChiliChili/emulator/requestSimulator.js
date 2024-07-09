// Define the run function outside of the else block
const { stateHandler } = require("../engine/requestHandler/StateManagement");
const helper = require("./GameSimulation.helpers");
const runlimit = {
  1: 10000000, // 10,00,000  MILLION
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
    let totalFreeWon = 0;
    let totalRespinWon = 0;
    let bonusHit = 0;
    let scatterHit = 0;
    let totalGameWin = 0;

    console.log(`Worker ${process.pid} running simulation`);

    for (let i = 1; i <= cycles; i++) {
      let req = helper.createBaseRequest();
      let previousState = null;
      const baseStateRes = await stateHandler("BASE", req, previousState);
      baseStateRes.raw_request = req;
      previousState = baseStateRes;

      // Extracting values from baseStateRes
      let nextState = baseStateRes.state.next;
      let baseBet = baseStateRes.baseBet;
      let mainSpinCreditsWon = baseStateRes.mainSpinCreditsWon;

      // Performing calculations
      totalBet = totalBet + baseBet;
      totalBaseWon = totalBaseWon + mainSpinCreditsWon;
      totalGameWin = totalGameWin + mainSpinCreditsWon;

      //SECTION - Respin
      let respinStateRes = {};
      if (nextState == "RESPIN") bonusHit++;
      while (nextState == "RESPIN") {
        req = helper.createRespinRequest();
        respinStateRes = await stateHandler("RESPIN", req, previousState);
        previousState = respinStateRes;
        nextState = respinStateRes.state.next;
        let respinCreditsWon = respinStateRes.reSpinGame.baseRespinCreditWon;
        totalRespinWon = totalRespinWon + respinCreditsWon;
        totalGameWin = totalGameWin + respinStateRes.reSpinGame.baseRespinCreditWon;
      }
      //!SECTION

      //SECTION - Free Game
      let freeStateRes = {};
      if (nextState == "FREE") scatterHit++;
      while (nextState == "FREE") {
        req = helper.createFreeRequest();
        freeStateRes = await stateHandler("FREE", req, previousState);
        previousState = freeStateRes;
        nextState = freeStateRes.state.next;
        let freeSpinCreditsWon = freeStateRes.freeGame.freeSpinCreditsWon;
        totalFreeWon = totalFreeWon + freeSpinCreditsWon;
        totalGameWin = totalGameWin + freeStateRes.freeGame.freeSpinCreditsWon;
      }
      //!SECTION

      if (i % 1000000 == 0) {
        const baseWinPercentage = (totalBaseWon / totalBet) * 100;
        const freeWinPercentage = (totalFreeWon / totalBet) * 100;
        const respinWinPercentage = (totalRespinWon / totalBet) * 100;
        const totalWinPercentage = (totalGameWin / totalBet) * 100;
        const scatterHitPercentage = i / scatterHit;
        const bonusHitPercentage = i / bonusHit;
        console.log(
          i,
          `BaseWinPct: ${baseWinPercentage.toFixed(2)}% | FreeWinPct: ${freeWinPercentage.toFixed(
            2
          )}% | RespinWinPct: ${respinWinPercentage.toFixed(2)}% | TotalWinPct: ${totalWinPercentage.toFixed(
            2
          )}% | ScatterHit: ${scatterHitPercentage.toFixed(2)}% | BonusHit: ${bonusHitPercentage.toFixed(2)}%`
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
    };
    return obj;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

module.exports = { run };
