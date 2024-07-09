const { RTP_LEVEL } = require("./GameConstant");
const WeightConfig = require("./WeightConfig");
const FreeWeight = WeightConfig[RTP_LEVEL].FreeGame;
const { S1, S2, S3, S4, S5, B1, B2, G1, G2, CN, WD } = require("./SymbolConfig");

function setFreeFeatureSymbols(featurePool) {
  let SYMBOLS = {
    skullSymbols: [S1, S2, S3, S4, S5],
    bulletSymbols: [B1, B2],
    gunSymbols: [G1, G2],
    wildSymbols: [WD],
    coinSymbols: [CN],
  };

  const symbolCount = 5; //calculateNumberOfSymbols(featurePool[0]);
  const obj = [];

  for (let i = 0; i < symbolCount; i++) {
    let symbol = symbolHandler(featurePool[i], SYMBOLS);
    if (symbol) {
      obj.push(symbol);
    }
  }
  return obj;
}

function symbolHandler(pool, SYMBOLS) {
  //Skull Symbol
  if (pool < FreeWeight.skull && SYMBOLS.skullSymbols.length > 0) return SYMBOLS.skullSymbols.pop();
  //Bullate Symbol
  else if (pool < FreeWeight.bullet && pool >= FreeWeight.skull && SYMBOLS.bulletSymbols.length > 0)
    return SYMBOLS.bulletSymbols.pop();
  //Gun / Revolver Symbol
  else if (pool < FreeWeight.revolver && pool >= FreeWeight.bullet && SYMBOLS.gunSymbols.length > 0)
    return SYMBOLS.gunSymbols.pop();
  //Coin / Multiplier
  else if (pool < FreeWeight.multiplier && pool >= FreeWeight.revolver && SYMBOLS.coinSymbols.length > 0)
    return SYMBOLS.coinSymbols.pop();
  //Wild Symbol
  else if (pool < FreeWeight.wild && pool >= FreeWeight.multiplier && SYMBOLS.wildSymbols.length > 0) {
    SYMBOLS.bulletSymbols.pop();
    SYMBOLS.gunSymbols.pop();
    SYMBOLS.skullSymbols.pop();
    return SYMBOLS.wildSymbols.pop();
  }
}

module.exports = { setFreeFeatureSymbols };
