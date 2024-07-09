function countFeatureSymbols(matchNumbers, remainingKenoPool, featureSymbols) {
  const symbolNumbers = remainingKenoPool.filter((element) => !matchNumbers.includes(element));
  const featureStops = [];

  const symbolChecks = {
    skull: [0, 0, 0, 0, 0],
    hat: [0, 0, 0, 0],
    bullet: [0, 0, 0],
    gun: [0, 0],
  };

  //Add Symbols to feature reel
  let symbolsMap = new Map();
  let length = featureSymbols.length;
  while (length--) {
    symbolsMap.set(featureSymbols[length], symbolNumbers[length]);
    featureStops.push(symbolNumbers[length]);
  }
  const featureSymbolHit = {
    skullSymbols: [],
    hatSymbols: [],
    bulletSymbols: [],
    gunSymbols: [],
    wildSymbols: [],
    horseShoeSymbols: [],
  };

  symbolsMap.forEach((value, key) => {
    switch (key) {
      case "S1":
      case "S2":
      case "S3":
      case "S4":
      case "S5":
        featureSymbolHit.skullSymbols.push({ [key]: value });
        symbolChecks.skull[parseInt(key.slice(1)) - 1] = 1;
        break;
      case "H1":
      case "H2":
      case "H3":
      case "H4":
        featureSymbolHit.hatSymbols.push({ [key]: value });
        symbolChecks.hat[parseInt(key.slice(1)) - 1] = 1;
        break;
      case "G1":
      case "G2":
        featureSymbolHit.gunSymbols.push({ [key]: value });
        symbolChecks.gun[parseInt(key.slice(1)) - 1] = 1;
        break;
      case "B1":
      case "B2":
        featureSymbolHit.bulletSymbols.push({ [key]: value });
        symbolChecks.bullet[parseInt(key.slice(1)) - 1] = 1;
        break;
      case "CN":
        featureSymbolHit.horseShoeSymbols.push({ [key]: value });
        break;
      case "WD":
        featureSymbolHit.wildSymbols.push({ [key]: value });
        break;
    }
  });

  //Add Wild Symbols
  let wildCount = featureSymbolHit.wildSymbols[0] ? 1 : 0;

  while (wildCount > 0) {
    for (const [symbolType, checks] of Object.entries(symbolChecks)) {
      for (let i = 0; i < checks.length; i++) {
        const symbol = `${symbolType.toUpperCase().charAt(0)}${i + 1}`;
        if (checks[i] === 0) {
          featureSymbolHit[`${symbolType}Symbols`].push({ [symbol]: -1 });
          break;
        }
      }
    }
    wildCount--;
  }

  return { featureSymbolHit, featureStops };
}

module.exports = { countFeatureSymbols };
