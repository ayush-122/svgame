const cluster = require("cluster");
const os = require("os");
const fs = require("fs");

const { run } = require("./requestSimulator");

// Initialize responseObj for each worker
let responseObj = {
  cycles: 0,
  totalBet: 0,
  totalBaseWon: 0,
  totalFreeWon: 0,
  totalFreeFeatureWon: 0,
  totalRespinWon: 0,
  totalRespinFeatureWon: 0,
  totalGameWin: 0,
};

const numCPUs = os.cpus().length;
let activeWorkers = numCPUs;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
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

// Function to merge the response objects received from workers
function mergeResponseObjects(obj1, obj2) {
  for (const key in obj2) {
    obj1[key] += obj2[key];
  }
  return obj1;
}

// Function to print the final responseObj in the master process
function printResponse() {
  console.log(responseObj);
  const baseWinPercentage = (responseObj.totalBaseWon / responseObj.totalBet) * 100;
  const freeWinPercentage = (responseObj.totalFreeWon / responseObj.totalBet) * 100;
  const freeFeatureWinPercentage = (responseObj.totalFreeFeatureWon / responseObj.totalBet) * 100;
  const respinWinPercentage = (responseObj.totalRespinWon / responseObj.totalBet) * 100;
  const respinFeatureWinPercentage = (responseObj.totalRespinFeatureWon / responseObj.totalBet) * 100;
  const totalWinPercentage = (responseObj.totalGameWin / responseObj.totalBet) * 100;
  const res = `\nThe Main Output \n****************\n
  BaseWinPct: ${baseWinPercentage.toFixed(2)}% | FreeWinPct: ${freeWinPercentage.toFixed(
    2
  )}% | FreeFeatureWinPct: ${freeFeatureWinPercentage.toFixed(2)}% | RespinWinPct: ${respinWinPercentage.toFixed(
    2
  )}% | RespinFeatureWinPct: ${respinFeatureWinPercentage.toFixed(2)}% | TotalWinPct: ${totalWinPercentage.toFixed(
    2
  )}%  \n\n`;

  console.log(res);

  responseObj = JSON.stringify(responseObj);
  responseObj += res;
  //Write Data To File
  fs.appendFileSync(__dirname + "/Data/emulationResults.txt", responseObj);
}
