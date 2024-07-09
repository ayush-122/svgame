const { RTP_LEVEL } = require("./GameConstant");
const WeightConfig = require("./WeightConfig");

function calculateBonusWin(bonusPool) {
  if (bonusPool < BonusWeight[0]) return 20;
  else if (bonusPool < BonusWeight[1]) return 20;
  else if (bonusPool < BonusWeight[2]) return 30;
  else if (bonusPool < BonusWeight[3]) return 30;
  else if (bonusPool < BonusWeight[4]) return 40;
  else if (bonusPool < BonusWeight[5]) return 40;
  else if (bonusPool < BonusWeight[6]) return 50;
  else if (bonusPool < BonusWeight[7]) return 50;
  else if (bonusPool < BonusWeight[8]) return 80;
  else if (bonusPool < BonusWeight[9]) return 100;
  else if (bonusPool < BonusWeight[10]) return 200;
  else if (bonusPool < BonusWeight[11]) return 300;
}

const BonusWeight = WeightConfig[RTP_LEVEL].BaseGame.bonusWeight;

module.exports = { calculateBonusWin };
