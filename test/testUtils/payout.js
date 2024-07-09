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

function paylineWinCalculationSlot(matrix) {
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
    20: 1,
    21: 1,
    22: 1,
    23: 1,
    24: 1,
    25: 1,
    26: 1,
    27: 1,
    28: 1,
    29: 1,
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

      paylineData.push({
        paylineNo: i,
        symbol: firstSymbol, //GameReelSymbol.symbolIds[firstSymbol].id,
        symbolCount: matchCount,
        positions: [...paylines[i]],
        multiplier: mul,
        won: eachLineWin * mul,
      });
      totalwin += eachLineWin * mul;
    }
  }

  return { totalwin, paylineData };
}

function paylineWinCalculationJava(matrix) {
  let final_win = 0;

  const all_symbol = ["WC", "H1", "H2", "H3", "H4", "H5", "L1", "L2", "L3", "L4", "L5", "SC", "BO"];
  const pay_5 = [300, 200, 120, 80, 60, 40, 20, 16, 16, 12, 12, 0, 0];
  const pay_4 = [200, 100, 60, 40, 30, 25, 15, 10, 10, 8, 8, 0, 0];
  const pay_3 = [100, 40, 20, 16, 12, 10, 6, 5, 5, 4, 4, 0, 0];

  const paylines = {
    1: [matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3], matrix[1][4]],
    2: [matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3], matrix[0][4]],
    3: [matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3], matrix[2][4]],
    4: [matrix[0][0], matrix[1][1], matrix[2][2], matrix[1][3], matrix[0][4]],
    5: [matrix[2][0], matrix[1][1], matrix[0][2], matrix[1][3], matrix[2][4]],
    6: [matrix[1][0], matrix[2][1], matrix[2][2], matrix[2][3], matrix[1][4]],
    7: [matrix[1][0], matrix[0][1], matrix[0][2], matrix[0][3], matrix[1][4]],
    8: [matrix[2][0], matrix[1][1], matrix[1][2], matrix[1][3], matrix[2][4]],
    9: [matrix[0][0], matrix[1][1], matrix[1][2], matrix[1][3], matrix[0][4]],
    10: [matrix[1][0], matrix[0][1], matrix[1][2], matrix[0][3], matrix[1][4]],
    11: [matrix[1][0], matrix[2][1], matrix[1][2], matrix[2][3], matrix[1][4]],
    12: [matrix[0][0], matrix[2][1], matrix[0][2], matrix[2][3], matrix[0][4]],
    13: [matrix[2][0], matrix[0][1], matrix[2][2], matrix[0][3], matrix[2][4]],
    14: [matrix[1][0], matrix[1][1], matrix[0][2], matrix[1][3], matrix[1][4]],
    15: [matrix[1][0], matrix[1][1], matrix[2][2], matrix[1][3], matrix[1][4]],
    16: [matrix[2][0], matrix[0][1], matrix[0][2], matrix[0][3], matrix[2][4]],
    17: [matrix[0][0], matrix[2][1], matrix[2][2], matrix[2][3], matrix[0][4]],
    18: [matrix[2][0], matrix[1][1], matrix[2][2], matrix[1][3], matrix[2][4]],
    19: [matrix[0][0], matrix[1][1], matrix[0][2], matrix[1][3], matrix[0][4]],
    20: [matrix[0][0], matrix[0][1], matrix[1][2], matrix[0][3], matrix[0][4]],
    21: [matrix[1][0], matrix[0][1], matrix[2][2], matrix[0][3], matrix[1][4]],
    22: [matrix[1][0], matrix[2][1], matrix[0][2], matrix[2][3], matrix[1][4]],
    23: [matrix[1][0], matrix[0][1], matrix[1][2], matrix[2][3], matrix[1][4]],
    24: [matrix[1][0], matrix[2][1], matrix[1][2], matrix[0][3], matrix[1][4]],
    25: [matrix[0][0], matrix[1][1], matrix[2][2], matrix[2][3], matrix[2][4]],
    26: [matrix[2][0], matrix[1][1], matrix[0][2], matrix[0][3], matrix[0][4]],
    27: [matrix[0][0], matrix[0][1], matrix[1][2], matrix[2][3], matrix[2][4]],
    28: [matrix[2][0], matrix[2][1], matrix[1][2], matrix[0][3], matrix[0][4]],
    29: [matrix[2][0], matrix[2][1], matrix[0][2], matrix[2][3], matrix[2][4]],
    30: [matrix[0][0], matrix[0][1], matrix[2][2], matrix[0][3], matrix[0][4]],
  };

  for (let i = 1; i <= 30; i++) {
    const list = paylines[i];
    let firstsymbol = list[0];
    let count = 1;
    let count_wild = 0;

    for (let j = 1; j < list.length; j++) {
      if (firstsymbol !== "WC") {
        if (firstsymbol === list[j] || list[j] === "WC") {
          count++;
        } else {
          break;
        }
      } else {
        count_wild++;
        if (list[j] !== "WC") {
          firstsymbol = list[j];
        }
        if (firstsymbol === list[j]) {
          count++;
        } else {
          break;
        }
      }
    }

    let win_wild = 0;
    if (count_wild === 3) win_wild = pay_3[0];
    if (count_wild === 4) win_wild = pay_4[0];
    if (count_wild === 5) win_wild = pay_5[0];

    let win = 0;
    for (let k = 0; k < all_symbol.length; k++) {
      if (count === 3 && firstsymbol === all_symbol[k]) {
        win = pay_3[k];
      } else if (count === 4 && firstsymbol === all_symbol[k]) {
        win = pay_4[k];
      } else if (count === 5 && firstsymbol === all_symbol[k]) {
        win = pay_5[k];
      }
    }

    const max_win = Math.max(win, win_wild);
    final_win += max_win;
  }

  return { totalwin: final_win };
}
function paylineWinCalculation(matrix, trans) {
  let slot = paylineWinCalculationSlot(matrix);
  let java = paylineWinCalculationJava(trans);

  if (slot.totalwin != java.totalwin) {
    console.log(trans);
    console.log(matrix);
    // console.log("slot: ", { ...slot });
    // Print each paylineData entry with positions array
    slot.paylineData.forEach((data, index) => {
      console.log(`Payline ${index + 1}:`, data);
      // console.log(`Positions:`, data.positions);
    });
    console.log("java: ", java);

    throw "Edge Case";
  }

  return slot;
}
function getWinReturn(symbol, count) {
  if (symbol in payTable) {
    return payTable[symbol][count];
  }
}

module.exports = { paylineWinCalculation };
