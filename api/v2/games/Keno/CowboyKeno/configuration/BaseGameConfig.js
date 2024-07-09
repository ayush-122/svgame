const { RTP_LEVEL } = require("./GameConstant");
const WeightConfig = require("./WeightConfig");
const BaseWeight = WeightConfig[RTP_LEVEL].BaseGame;
const { S1, S2, S3, S4, S5, B1, B2, G1, G2, H1, H2, H3, H4, CN, WD } = require("./SymbolConfig");

function setBaseFeatureSymbols(featurePool) {
  let SYMBOLS = {
    skullSymbols: [S1, S2, S3, S4, S5],
    hatSymbols: [H1, H2, H3, H4],
    bulletSymbols: [B1, B2],
    gunSymbols: [G1, G2],
    wildSymbols: [WD],
    coinSymbols: [CN],
  };

  const symbolCount = 5; //calculateNumberOfSymbols(featurePool[0]);
  let obj = [];

  for (let i = 0; i < symbolCount; i++) {
    let symbol = symbolHandler(featurePool[i], SYMBOLS);
    if (symbol) {
      obj.push(symbol);
    }
  }

  // obj = [S1, S2, S3, S4, S5];
  // obj = [H1, H2, H3, H4];
  return obj;
}

function symbolHandler(pool, SYMBOLS) {
  //Skull Symbol
  if (pool < BaseWeight.skull && SYMBOLS.skullSymbols.length > 0) return SYMBOLS.skullSymbols.pop();
  //Hat Symbol
  else if (pool < BaseWeight.hat && pool >= BaseWeight.skull && SYMBOLS.hatSymbols.length > 0)
    return SYMBOLS.hatSymbols.pop();
  //Bullate Symbol
  else if (pool < BaseWeight.bullet && pool >= BaseWeight.hat && SYMBOLS.bulletSymbols.length > 0)
    return SYMBOLS.bulletSymbols.pop();
  //Gun / Revolver Symbol
  else if (pool < BaseWeight.revolver && pool >= BaseWeight.bullet && SYMBOLS.gunSymbols.length > 0)
    return SYMBOLS.gunSymbols.pop();
  //Coin / Multiplier
  else if (pool < BaseWeight.multiplier && pool >= BaseWeight.revolver && SYMBOLS.coinSymbols.length > 0)
    return SYMBOLS.coinSymbols.pop();
  //Wild Symbol
  else if (pool < BaseWeight.wild && pool >= BaseWeight.multiplier && SYMBOLS.wildSymbols.length > 0) {
    SYMBOLS.bulletSymbols.pop();
    SYMBOLS.gunSymbols.pop();
    SYMBOLS.skullSymbols.pop();
    SYMBOLS.hatSymbols.pop();
    return SYMBOLS.wildSymbols.pop();
  }
}

module.exports = { setBaseFeatureSymbols };
