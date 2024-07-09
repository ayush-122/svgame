const fs = require("fs");
const path = require("path");

const gamesDirectory = path.join(__dirname, "../../../server/api/v2/games/lineGames/");

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory());
}

function readReverseSymbolCode(filePath) {
  const { RevSymbolCode } = require(filePath);
  return RevSymbolCode;
}

function generateConsolidatedFile() {
  const gameNames = getDirectories(gamesDirectory);
  let outputContent = "";

  gameNames.forEach((gameName) => {
    const configFilePath = path.join(gamesDirectory, gameName, "configuration", "ReverseSymbolCode.js");

    if (fs.existsSync(configFilePath)) {
      const revSymbolCode = readReverseSymbolCode(configFilePath);
      outputContent += `<${gameName}>:\n`;

      Object.keys(revSymbolCode).forEach((key) => {
        outputContent += `  ${key}: "${revSymbolCode[key]}",\n`;
      });

      outputContent += "\n";
    }
  });
  const outputFilePath = path.join(__dirname, "consolidatedReverseSymbolCode.txt");
  fs.writeFileSync(outputFilePath, outputContent);
  console.log("Consolidated file created: consolidatedReverseSymbolCode.txt");
}

generateConsolidatedFile();
