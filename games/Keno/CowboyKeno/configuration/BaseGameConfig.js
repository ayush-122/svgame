function setBaseFeatureSymbols(featurePool) {
  let SYMBOLS = {
    skullSymbols: ["S1", "S2", "S3", "S4", "S5"],
    hatSymbols: ["H1", "H2", "H3", "H4"],
    bulletSymbols: ["B1", "B2"],
    gunSymbols: ["G1", "G2"],
    wildSymbols: ["WD"],
    coinSymbols: ["CN"],
  };

  const symbolCount = calculateNumberOfSymbols(featurePool[0]);
  const obj = [];

  for (let i = 1; i <= symbolCount; i++) {
    let symbol = symbolHandler(featurePool[i], SYMBOLS);
    if (symbol) {
      obj.push(symbol);
    }
  }
  return obj;
}

function calculateNumberOfSymbols(poolCount) {
  if (poolCount < 60) return 1;
  else if (poolCount < 90) return 2;
  else if (poolCount < 110) return 3;
  else if (poolCount < 125) return 4;
  else if (poolCount < 137) return 5;
}

function symbolHandler(pool, SYMBOLS) {
  if (pool < 110) return hitSkull(SYMBOLS);
  else if (pool < 236) return hitHat(SYMBOLS);
  else if (pool < 320) return hitBullet(SYMBOLS);
  else if (pool < 380) return hitGun(SYMBOLS);
  else if (pool < 520) return hitCoin(SYMBOLS);
  else if (pool < 562) return hitWild(SYMBOLS);
}

//Wild+
function hitWild(SYMBOLS) {
  if (SYMBOLS.wildSymbols.length) return SYMBOLS.wildSymbols.pop();
  else return hitSkull(SYMBOLS);
}

//Skull
function hitSkull(SYMBOLS) {
  if (SYMBOLS.skullSymbols.length) return SYMBOLS.skullSymbols.pop();
  else hitHat(SYMBOLS);
}

//Hat
function hitHat(SYMBOLS) {
  if (SYMBOLS.hatSymbols.length) return SYMBOLS.hatSymbols.pop();
  else hitBullet(SYMBOLS);
}

//Bullet
function hitBullet(SYMBOLS) {
  if (SYMBOLS.bulletSymbols.length) return SYMBOLS.bulletSymbols.pop();
  else hitGun(SYMBOLS);
}
//Gun
function hitGun(SYMBOLS) {
  if (SYMBOLS.gunSymbols.length) return SYMBOLS.gunSymbols.pop();
  else hitCoin(SYMBOLS);
}

//Coin
function hitCoin(SYMBOLS) {
  if (SYMBOLS.coinSymbols.length) return SYMBOLS.coinSymbols.pop();
  else hitWild(SYMBOLS);
}
module.exports = { setBaseFeatureSymbols };
