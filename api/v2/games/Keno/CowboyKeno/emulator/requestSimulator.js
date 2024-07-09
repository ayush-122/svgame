// Define the run function outside of the else block
const { stateHandler } = require("../engine/requestHandler/StateManagement");
const helper = require("./GameSimulation.helpers");

const runlimit = {
  1: 1000000, // 10,00,000  MILLION
  2: 100000000, // 10,00,00,000  100 MILLION
  3: 1000000000, // 1,00,00,00,000 BILLION
  4: 1000000000000, // 10,00,00,00,00,000 TRILLION
  5: 1000, // 1000      // Thousand
  6: 100, // 1000      // Hundred
  7: 10, // 1000      // Hundred
};

async function run(numCPUs) {
  try {
    let cycles = runlimit[3] / numCPUs;
    let totalBet = 0;
    let totalBaseWon = 0;
    let totalFreeWon = 0;
    let totalHatHit = 0;
    let totalExtraDrawWon = 0;
    let totalBuletteHit = 0;
    let totalWheelWon = 0;
    let totalSkullHit = 0;
    let totalFreeWheelWon = 0;
    let totalFreeSkullHit = 0;
    let totalFreeExtraDrawWon = 0;
    let totalFreeBuletteHit = 0;
    let totalMultiplierHit = 0;
    let totalFreeMultiplierHit = 0;
    let totalGunHit = 0;
    let totalFreeGunHit = 0;
    let totalGameWin = 0;
    let maxWin = 0;
    // let maxCnt = 0;
    // let doPrint = false;

    console.log(`Worker ${process.pid} running simulation`);

    let baseStateRes;
    for (let i = 1; i <= cycles; i++) {
      let req = helper.createBaseRequest(baseStateRes);
      let previousState = null;
      baseStateRes = await stateHandler("BASE", req);
      previousState = baseStateRes;

      // Extracting values from baseStateRes
      // let currentState = baseStateRes.currentState;
      let nextState = baseStateRes.nextState;
      let baseBet = baseStateRes.totalBet;
      let mainSpinCreditsWon = baseStateRes.win;

      // Performing calculations
      totalBet += baseBet;
      totalBaseWon += mainSpinCreditsWon;
      totalGameWin += mainSpinCreditsWon;
      let firstFreeSpin = true;
      let freeStateRes = {};
      let currentFreeSpin = baseStateRes.nextStateDetails.currentFreeSpin;
      let totalFreeSpin = baseStateRes.nextStateDetails.totalFreeSpin;

      //Check for multiplier
      if (baseStateRes.featureSymbols.includes("CN")) totalMultiplierHit++;

      //Check for gun
      if (baseStateRes.nextStateDetails.increaseDrawCount) totalGunHit++;

      // WHEEL BONUS
      if (nextState === "WHEEL_BONUS") {
        totalSkullHit++;
        req = helper.createWheelRequest(previousState);
        let wheelStateRes = await stateHandler("WHEEL_BONUS", req, previousState);
        req = helper.createWheelRequest(wheelStateRes);
        wheelStateRes = await stateHandler("WHEEL_BONUS", req, previousState);
        previousState = wheelStateRes;
        nextState = wheelStateRes.nextState;
        let wheelSpinCreditsWon = wheelStateRes.win;
        totalWheelWon += wheelSpinCreditsWon;
        totalGameWin += wheelSpinCreditsWon;
      }

      //EXTRA DRAW
      if (nextState === "EXTRA_DRAW") {
        totalBuletteHit++;
        req = helper.createExtraDrawRequest(previousState);
        let extraDrawRes = await stateHandler("EXTRA_DRAW", req);
        previousState = extraDrawRes;
        nextState = extraDrawRes.nextState;
        let extraDrawCreditsWon = extraDrawRes.win;
        totalExtraDrawWon += extraDrawCreditsWon;
        totalGameWin += extraDrawCreditsWon;

        // if (extraDrawRes.extraDrawCount != 8) console.log(extraDrawRes);
      }

      //SECTION - FREE GAME
      if (nextState == "FREE") totalHatHit++;
      while (nextState === "FREE" && (firstFreeSpin || currentFreeSpin !== totalFreeSpin)) {
        firstFreeSpin = false;
        req = helper.createFreeRequest(previousState);
        freeStateRes = await stateHandler("FREE", req);
        currentFreeSpin = freeStateRes.nextStateDetails.currentFreeSpin;
        totalFreeSpin = freeStateRes.nextStateDetails.totalFreeSpin;
        previousState = freeStateRes;
        nextState = freeStateRes.nextState;
        let freeSpinCreditsWon = freeStateRes.win;
        totalFreeWon += freeSpinCreditsWon;
        totalGameWin += freeSpinCreditsWon;

        //Check for multiplier
        if (freeStateRes.featureSymbols.includes("CN")) totalFreeMultiplierHit++;

        //Check for gun
        if (freeStateRes.nextStateDetails.increaseDrawCount) totalFreeGunHit++;

        //If Extra Draw is Triggered in Free Game
        while (nextState === "EXTRA_DRAW") {
          totalFreeBuletteHit++;
          req = helper.createExtraDrawRequest(previousState);
          freeStateRes = await stateHandler("EXTRA_DRAW", req);
          previousState = freeStateRes;
          nextState = freeStateRes.nextState;
          let extraDrawCreditsWon = freeStateRes.win;
          totalFreeExtraDrawWon += extraDrawCreditsWon;
          totalGameWin += extraDrawCreditsWon;
        }

        //If Wheel Bonus is Triggered in Free Game
        while (nextState === "WHEEL_BONUS") {
          totalFreeSkullHit++;
          req = helper.createWheelRequest(previousState);
          freeStateRes = await stateHandler("WHEEL_BONUS", req);
          req = helper.createWheelRequest(freeStateRes);
          freeStateRes = await stateHandler("WHEEL_BONUS", req);
          previousState = freeStateRes;
          nextState = freeStateRes.nextState;
          let wheelBonusCreditsWon = freeStateRes.win;
          totalFreeWheelWon += wheelBonusCreditsWon;
          totalGameWin += wheelBonusCreditsWon;
        }
      }
      //!SECTION

      baseStateRes = previousState;
      maxWin = previousState.totalWon > maxWin ? previousState.totalWon : maxWin;

      // Output the results
      if (i % 100000 == 0) {
        const baseWinPercentage = (totalBaseWon / totalBet) * 100;
        const freeWinPercentage = (totalFreeWon / totalBet) * 100;
        const extraDrawWinPercentage = (totalExtraDrawWon / totalBet) * 100;
        const wheelWinPercentage = (totalWheelWon / totalBet) * 100;
        const freeWheelWinPercentage = (totalFreeWheelWon / totalBet) * 100;
        const freeExtraDrawWinPercentage = (totalFreeExtraDrawWon / totalBet) * 100;
        const totalWinPercentage = (totalGameWin / totalBet) * 100;

        //Base
        const skullHitPercentage = (i / totalSkullHit).toFixed(2);
        const hatHitPercentage = (i / totalHatHit).toFixed(2);
        const buletteHitPercentage = (i / totalBuletteHit).toFixed(2);
        const multiplierPercentage = (i / totalMultiplierHit).toFixed(2);
        const gunHitPercentage = (i / totalGunHit).toFixed(2);

        //Free
        const freeSkullHitPercentage = (i / totalFreeSkullHit).toFixed(2);
        const freeBuletteHitPercentage = (i / totalFreeBuletteHit).toFixed(2);
        const freeMultiplierPercentage = (i / totalFreeMultiplierHit).toFixed(2);
        const freeGunHitPercentage = (i / totalFreeGunHit).toFixed(2);

        console.log(
          i,
          `BaseWinPct: ${baseWinPercentage.toFixed(2)}% | FreeWinPct: ${freeWinPercentage.toFixed(
            2
          )}% | ExtraDrawWinPct: ${extraDrawWinPercentage.toFixed(2)}% | WheelWinPct: ${wheelWinPercentage.toFixed(
            2
          )}% | FreeWheelWinPct: ${freeWheelWinPercentage.toFixed(
            2
          )}% | FreeExtraDrawWinPct: ${freeExtraDrawWinPercentage.toFixed(
            2
          )}% | TotalWinPct: ${totalWinPercentage.toFixed(2)}% | MaxWin : ${maxWin}`
        );
        console.log(
          `Gun Hit Percentage: ${gunHitPercentage}, Skull Hit Percentage: ${skullHitPercentage}, Hat Hit Percentage: ${hatHitPercentage}, Bulette Hit Percentage: ${buletteHitPercentage}, Multiplier Percentage: ${multiplierPercentage}`
        );
        console.log(
          `Free Gun Hit Percentage: ${freeGunHitPercentage}, Free Skull Hit Percentage: ${freeSkullHitPercentage}, Free Bulette Hit Percentage: ${freeBuletteHitPercentage}, Free Multiplier Percentage: ${freeMultiplierPercentage}\n`
        );
      }
    }

    console.log(`Worker ${process.pid} finished simulation`);
    let obj = {
      cycles,
      totalBet,
      totalBaseWon,
      totalFreeWon,
      totalHatHit,
      totalExtraDrawWon,
      totalBuletteHit,
      totalWheelWon,
      totalSkullHit,
      totalFreeWheelWon,
      totalFreeSkullHit,
      totalFreeExtraDrawWon,
      totalFreeBuletteHit,
      totalMultiplierHit,
      totalFreeMultiplierHit,
      totalGunHit,
      totalFreeGunHit,
      totalGameWin,
      maxWin,
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
