const { runCliTool } = require("./rng_cli/rng.cli.service");

async function getKenoNumbers(min_number, max_number, draw_count) {
  // Record the current time before calling the function
  const startTime = Date.now();

  // Call RNG CLI Function
  let response = await runCliTool(
    "keno",
    "fair",
    `--min_number ${min_number} --max_number ${max_number} --draw_count ${draw_count}`
  );

  // Record the current time after the function has finished executing
  const endTime = Date.now();

  // Calculate the execution time in milliseconds
  const executionTime = endTime - startTime;

  console.log(`Execution time for Keno: ${executionTime} milliseconds`);
  // console.log(response);
  let responseObj = {
    number_drawn: response.keno_numbers,
    rolledData: response.rolled_data,
  };

  return responseObj.number_drawn;
}

async function getExcludingKenoNumbers(min_number, max_number, draw_count, excluded_numbers) {
  // Record the current time before calling the function
  const startTime = Date.now();

  // Call RNG CLI Function
  let response = await runCliTool(
    "keno",
    "fair",
    `--min_number ${min_number} --max_number ${max_number} --draw_count ${draw_count * 2}`
  );

  // Record the current time after the function has finished executing
  const endTime = Date.now();

  // Calculate the execution time in milliseconds
  const executionTime = endTime - startTime;

  console.log(`Execution time for Keno: ${executionTime} milliseconds`);

  // Filter Out the numbers
  let filteredNumbers = response.keno_numbers.filter((num) => !excluded_numbers.includes(num));
  filteredNumbers = filteredNumbers.slice(0, draw_count);

  // console.log(response);
  let responseObj = {
    number_drawn: filteredNumbers,
    rolledData: response.rolled_data,
  };

  return responseObj.number_drawn;
}

module.exports = { getKenoNumbers, getExcludingKenoNumbers };
