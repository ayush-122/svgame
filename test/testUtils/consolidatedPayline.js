const fs = require("fs");
const path = require("path");

// Define the games directory path
const gamesDirectory = path.join(__dirname, "../../../server/api/v2/games/lineGames/");

// Function to get directories (game names) within the specified path
function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
}

// Function to read the Reverse Symbol Code from the specified file path
function readReverseSymbolCode(filePath) {
  const { RevSymbolCode, paylines } = require(filePath);
  return { RevSymbolCode, paylines };
}

// Function to generate the consolidated file
function generateConsolidatedFile() {
  // Get the list of game names
  const gameNames = getDirectories(gamesDirectory);
  let outputContent = "";

  // Loop through each game name
  gameNames.forEach((gameName) => {
    const configFilePath = path.join(gamesDirectory, gameName, "configuration", "GamePaylinesConfig.js");

    // Check if the configuration file exists
    if (fs.existsSync(configFilePath)) {
      // Read the Reverse Symbol Code and paylines from the configuration file
      const { paylines } = readReverseSymbolCode(configFilePath);
      outputContent += `<${gameName}>:\n`;

      // Loop through each payline and add it to the output content
      paylines.forEach((payline, index) => {
        outputContent += `  Payline ${index + 1}: [${payline.join(", ")}],\n`;
      });

      outputContent += "\n";
    }
  });

  // Define the output file path and write the consolidated content to the file
  const outputFilePath = path.join(__dirname, "consolidatedPayline.txt");
  fs.writeFileSync(outputFilePath, outputContent);
  console.log("Consolidated file created: consolidatedPayline.txt");
}

// Generate the consolidated file
generateConsolidatedFile();
