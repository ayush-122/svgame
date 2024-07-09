const { exec } = require("child_process");

// Function to run the Python CLI tool with specified arguments
async function runCliTool(game, method, additionalArgs = "") {
  const command = `${process.env.RNG_COMMAND} ${process.env.RNG_PATH} --game ${game} --method ${method} ${additionalArgs}`;

  return new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
      }

      try {
        const output = JSON.parse(stdout);
        resolve(output);
      } catch (parseError) {
        console.error("Error parsing JSON output:", parseError.message);
        reject(parseError);
      }
    });

    const timeout = 1000; // 1 second
    const timeoutId = setTimeout(() => {
      console.error("Timeout: Command execution took too long");
      process.kill("SIGTERM"); // Terminate the process
      reject(new Error("Timeout"));
    }, timeout);

    process.on("exit", () => {
      clearTimeout(timeoutId);
    });
  });
}

module.exports = { runCliTool };

// Example usage:
// async function exampleUsage() {
//   try {
//     const result = await runCliTool("keno", "fair", "--min_number 1 --max_number 80 --draw_count 20");
//     console.log(result);
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// exampleUsage();
