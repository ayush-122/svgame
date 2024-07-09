const { runCliTool } = require("./rng_cli/rng.cli.service");

async function getSlotNumbers(list) {
  //Convert List into string for cli
  let cliString = "";
  list.map((ele) => {
    cliString += `${ele.low},${ele.high};`;
  });
  cliString = cliString.slice(0, -1);

  // Record the current time before calling the function
  const startTime = Date.now();

  // Call RNG CLI Function
  let response = await runCliTool("slot", "fair", `--slot_ranges "${cliString}"`);

  // Record the current time after the function has finished executing
  const endTime = Date.now();

  // Calculate the execution time in milliseconds
  const executionTime = endTime - startTime;

  console.log(`Execution time for Slot: ${executionTime} milliseconds`);

  //Response object
  let responseObj = {
    result: response.slot_numbers,
    rolledData: response.rolled_data,
  };
  return responseObj;
}

module.exports = { getSlotNumbers };
