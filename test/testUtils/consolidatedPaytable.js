const fs = require("fs");
const path = require("path");
const util = require("util");
const glob = util.promisify(require("glob"));

// Helper function to format paytable data
const formatPayTable = (gameName, payTable) => {
  const headers = ["Symbol", "5", "4", "3", "2", "1"];
  const lines = [gameName, headers.join("\t")];

  for (const [symbol, values] of Object.entries(payTable)) {
    if (Array.isArray(values)) {
      const line = [symbol, ...values.reverse()].join("\t");
      lines.push(line);
    } else {
      console.error(`Expected array for ${symbol} in game ${gameName}, got:`, values);
    }
  }

  lines.push(""); // Add an empty line between different game paytables
  return lines.join("\n");
};

const consolidatePayTables = async () => {
  try {
    const pattern = path.join(__dirname, "../../../server/api/v2/games/lineGames/*/configuration/PayTable.js");
    console.log("Pattern:", pattern); // Debug: Print the glob pattern
    const files = await glob(pattern);
    console.log("Files found:", files); // Debug: Print the found files
    const consolidatedData = [];

    for (const file of files) {
      const gameName = path.basename(path.dirname(path.dirname(file)));
      console.log("Processing game:", gameName); // Debug: Print the game name

      const payTableModule = require(file);
      const payTable = payTableModule.payTable || payTableModule;
      console.log("PayTable:", payTable); // Debug: Print the payTable data

      const formattedPayTable = formatPayTable(gameName, payTable);
      consolidatedData.push(formattedPayTable);
    }

    const outputFilePath = path.join(__dirname, "consolidatedPayTable.txt");
    console.log("Output file path:", outputFilePath); // Debug: Print the output file path
    fs.writeFileSync(outputFilePath, consolidatedData.join("\n"), "utf8");
    console.log(`Consolidated paytable file created at ${outputFilePath}`);
  } catch (error) {
    console.error("Error consolidating paytables:", error);
  }
};

consolidatePayTables();
