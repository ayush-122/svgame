function calculateBonusWin(bonusPool) {
  if (bonusPool < 620) return 20;
  else if (bonusPool < 1070) return 30;
  else if (bonusPool < 1320) return 40;
  else if (bonusPool < 1430) return 50;
  else if (bonusPool < 1470) return 80;
  else if (bonusPool < 1478) return 100;
  else if (bonusPool < 1483) return 200;
  else if (bonusPool < 1485) return 200;
}

module.exports = { calculateBonusWin };
