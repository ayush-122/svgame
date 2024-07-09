const {
  SCATTER_SYMBOL,
  WILD_SYMBOL,
  BASE_CREDITS_BET,
  DISPLAY_HEIGHT,
  NUM_REELS,
} = require("../configuration/GameConstant");
const { paylines } = require("../configuration/GamePaylinesConfig");
const { payTable } = require("../configuration/PayTable");
const { GameReelSymbol } = require("../configuration/GameReelSymbol");

function paylineWinCalculation(matrix) {
  const multiplier = {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 1,
  };

  let paylineData = [];

  let totalwin = 0;

  for (let i = 0; i < BASE_CREDITS_BET; i++) {
    let firstSymbol = matrix[0][paylines[i][0]];
    let matchCount = 1;
    let wildCount = 1;
    for (let j = 1; j < NUM_REELS; j++) {
      if (firstSymbol == SCATTER_SYMBOL) break;
      else if (firstSymbol != WILD_SYMBOL) {
        if (firstSymbol == matrix[j][paylines[i][j]] || matrix[j][paylines[i][j]] == WILD_SYMBOL) {
          matchCount++;
        } else break;
      } else if (firstSymbol == WILD_SYMBOL) {
        //w a a w a    a = 5;
        if (matrix[j][paylines[i][j]] == WILD_SYMBOL) {
          matchCount++;
          wildCount++;
        } else {
          firstSymbol = matrix[j][paylines[i][j]];
          matchCount++;
        }
      }
    }

    let eachLineWin = 0;
    //
    if (
      matchCount >= GameReelSymbol.symbolIds[firstSymbol].matchCount &&
      GameReelSymbol.symbolIds[firstSymbol].symbolWon
    ) {
      let lineWon = getWinReturn(firstSymbol, matchCount - 1);
      let wildLineWon = getWinReturn(WILD_SYMBOL, wildCount - 1);
      if (wildLineWon > lineWon) {
        eachLineWin = wildLineWon;
        firstSymbol = WILD_SYMBOL;
        matchCount = wildCount;
      } else {
        eachLineWin = lineWon;
      }
      //multiplier on winning
      let mul = 0;
      for (let pos = 0; pos < matchCount; pos++) {
        let value = paylines[i][pos] * DISPLAY_HEIGHT + pos;
        if (multiplier[value] > 1) {
          mul += multiplier[value];
        }
      }
      if (mul == 0) mul = 1;
      if (eachLineWin > 0)
        if (eachLineWin > 0)
          paylineData.push({
            paylineNo: i,
            symbol: GameReelSymbol.symbolIds[firstSymbol].id,
            symbolCount: matchCount,
            positions: paylines[i],
            multiplier: mul,
            won: eachLineWin * mul,
          });
      totalwin += eachLineWin * mul;
    }
  }

  return { totalwin, paylineData };
}
function getWinReturn(symbol, count) {
  if (symbol in payTable) {
    return payTable[symbol][count];
  }
}

module.exports = { paylineWinCalculation };
