const cluster = require("cluster");
const os = require("os");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./../../../../../.env" });
const auth = require("../../../../services/rng/auth.rng");

const { run } = require("./requestSimulator");

//RNG Setup
auth.getRngToken().then(() => {
  // Initialize responseObj for each worker
  let responseObj = {
    cycles: 0,
    totalBet: 0,
    totalBaseWon: 0,
    totalFreeWon: 0,
    totalHatHit: 0,
    totalExtraDrawWon: 0,
    totalBuletteHit: 0,
    totalWheelWon: 0,
    totalSkullHit: 0,
    totalFreeWheelWon: 0,
    totalFreeSkullHit: 0,
    totalFreeExtraDrawWon: 0,
    totalFreeBuletteHit: 0,
    totalMultiplierHit: 0,
    totalFreeMultiplierHit: 0,
    totalGunHit: 0,
    totalFreeGunHit: 0,
    totalGameWin: 0,
    maxWin: 0,
  };

  const numCPUs = os.cpus().length;
  let activeWorkers = numCPUs;

  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    console.log(numCPUs);

    // Fork workers.
    for (let i = 0; i < numCPUs - 1; i++) {
      const worker = cluster.fork();
      // Listen for messages from workers
      worker.on("message", (msg) => {
        // Update responseObj with the values sent from the worker
        responseObj = mergeResponseObjects(responseObj, msg);
        // Decrement the count of active workers as one has sent its response
        activeWorkers--;
        // If all workers have sent their responses, call printResponse
        if (activeWorkers === 0) {
          printResponse();
        }
      });
    }
  } else {
    // Worker process
    console.log(`Worker ${process.pid} started`);

    // Call the run function
    run(numCPUs)
      .then((obj) => {
        console.log(`Worker ${process.pid} completed`);
        // Send the responseObj back to the master process
        process.send(obj);
        process.exit(0);
      })
      .catch((error) => {
        console.error(`Worker ${process.pid} error:`, error);
        process.exit(1); // Terminate the worker process if an error occurs
      });
  }
  // Function to print the final responseObj in the master process
  function printResponse() {
    console.log(responseObj);
    const baseWinPercentage = (responseObj.totalBaseWon / responseObj.totalBet) * 100;
    const freeWinPercentage = (responseObj.totalFreeWon / responseObj.totalBet) * 100;
    const extraDrawWinPercentage = (responseObj.totalExtraDrawWon / responseObj.totalBet) * 100;
    const wheelWinPercentage = (responseObj.totalWheelWon / responseObj.totalBet) * 100;
    const freeWheelWinPercentage = (responseObj.totalFreeWheelWon / responseObj.totalBet) * 100;
    const freeExtraDrawWinPercentage = (responseObj.totalFreeExtraDrawWon / responseObj.totalBet) * 100;
    const totalWinPercentage = (responseObj.totalGameWin / responseObj.totalBet) * 100;

    //Base
    const skullHitPercentage = (responseObj.cycles / responseObj.totalSkullHit).toFixed(2);
    const hatHitPercentage = (responseObj.cycles / responseObj.totalHatHit).toFixed(2);
    const buletteHitPercentage = (responseObj.cycles / responseObj.totalBuletteHit).toFixed(2);
    const multiplierPercentage = (responseObj.cycles / responseObj.totalMultiplierHit).toFixed(2);
    const gunHitPercentage = (responseObj.cycles / responseObj.totalGunHit).toFixed(2);

    //Free
    const freeSkullHitPercentage = (responseObj.cycles / responseObj.totalFreeSkullHit).toFixed(2);
    const freeBuletteHitPercentage = (responseObj.cycles / responseObj.totalFreeBuletteHit).toFixed(2);
    const freeMultiplierPercentage = (responseObj.cycles / responseObj.totalFreeMultiplierHit).toFixed(2);
    const freeGunHitPercentage = (responseObj.cycles / responseObj.totalFreeGunHit).toFixed(2);
    const res = `\nThe Main Output \n****************\nBaseWinPct: ${baseWinPercentage.toFixed(
      2
    )}% | FreeWinPct: ${freeWinPercentage.toFixed(2)}% | ExtraDrawWinPct: ${extraDrawWinPercentage.toFixed(
      2
    )}% | WheelWinPct: ${wheelWinPercentage.toFixed(2)}% | FreeWheelWinPct: ${freeWheelWinPercentage.toFixed(
      2
    )}% | FreeExtraDrawWinPct: ${freeExtraDrawWinPercentage.toFixed(2)}% | TotalWinPct: ${totalWinPercentage.toFixed(
      2
    )}%\nGun Hit Percentage: ${gunHitPercentage}, Skull Hit Percentage: ${skullHitPercentage}, Hat Hit Percentage: ${hatHitPercentage}, Bulette Hit Percentage: ${buletteHitPercentage}, Multiplier Percentage: ${multiplierPercentage}\nFree Gun Hit Percentage: ${freeGunHitPercentage}, Free Skull Hit Percentage: ${freeSkullHitPercentage}, Free Bulette Hit Percentage: ${freeBuletteHitPercentage}, Free Multiplier Percentage: ${freeMultiplierPercentage}\n\n`;

    console.log(res);

    responseObj = JSON.stringify(responseObj);
    responseObj += res;
    //Write Data To File
    fs.appendFileSync(__dirname + "/Data/emulationResults.txt", responseObj);
  }
});

// Function to merge the response objects received from workers
function mergeResponseObjects(obj1, obj2) {
  for (const key in obj2) {
    obj1[key] += obj2[key];
    // else obj1[key] = obj1[key] > obj2[key] ? obj1[key] : obj2[key];
  }
  return obj1;
}
