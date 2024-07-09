const {
  SCATTER_SYMBOL,
  WILD_SYMBOL,
  BASE_CREDITS_BET,
  DISPLAY_HEIGHT,
  NUM_REELS,
  INFECTED_SYMBOLS,
} = require("../configuration/GameConstant");
const { paylines } = require("../configuration/GamePaylinesConfig");
const { payTable } = require("../configuration/PayTable");
const { GameReelSymbol } = require("../configuration/GameReelSymbol");

function getWinningWildPositions(matrix) {
  let wildPositions = new Set();
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
    30: 1,
    31: 1,
    32: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
    37: 1,
    38: 1,
    39: 1,
    40: 1,
    41: 1,
    42: 1,
    43: 1,
    44: 1,
    45: 1,
    46: 1,
    47: 1,
    48: 1,
    49: 1,
  };

  //Traverse the paylines
  for (let i = 0; i < BASE_CREDITS_BET; i++) {
    let firstSymbol = matrix[0][paylines[i][0]];
    let matchCount = 1;
    let wildCount = 1;

    //Traverse symbols of the payline
    for (let j = 1; j < NUM_REELS; j++) {
      if (firstSymbol == SCATTER_SYMBOL) break;
      else if (firstSymbol != WILD_SYMBOL) {
        if (firstSymbol == matrix[j][paylines[i][j]] || matrix[j][paylines[i][j]] == WILD_SYMBOL) {
          matchCount++;
        } else break;
      } else if (firstSymbol == WILD_SYMBOL) {
        if (matrix[j][paylines[i][j]] == WILD_SYMBOL) {
          matchCount++;
          wildCount++;
        } else {
          firstSymbol = matrix[j][paylines[i][j]];
          matchCount++;
        }
      }
    }

    // let eachLineWin = 0;
    // Find Win
    if (
      matchCount >= GameReelSymbol.symbolIds[firstSymbol].matchCount &&
      GameReelSymbol.symbolIds[firstSymbol].symbolWon
    ) {
      let lineWon = getWinReturn(firstSymbol, matchCount - 1);
      let wildLineWon = getWinReturn(WILD_SYMBOL, wildCount - 1);
      if (wildLineWon > lineWon) {
        // eachLineWin = wildLineWon;
        firstSymbol = WILD_SYMBOL;
        matchCount = wildCount;
      } else {
        // eachLineWin = lineWon;
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

      //   if (eachLineWin > 0)
      //Check for wild position.
      for (let j = 1; j < NUM_REELS; j++) {
        const element = matrix[j][paylines[i][j]];
        if (element == WILD_SYMBOL) {
          wildPositions.add(`${j},${paylines[i][j]}`);
        }
      }
    }
  }

  return Array.from(wildPositions);
}

function infectNeighbor(matrix, wildPositions) {
  let infectionOrder = {};
  let search = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  wildPositions.forEach((currentWild) => {
    let infectedMatrix = Array.from({ length: DISPLAY_HEIGHT }, () => Array.from({ length: NUM_REELS }, () => 0));
    wildPositions.forEach((wild) => {
      infectedMatrix[wild[0]][wild[1]] = -1;
    });
    let infectedQueue = [currentWild];
    let pos = `${currentWild[0]},${currentWild[1]}`;
    infectionOrder[pos] = [];

    while (infectedQueue.length > 0) {
      let i = infectedQueue[0][0];
      let j = infectedQueue[0][1];
      infectedQueue.shift();
      infectedMatrix[i][j] = -1;
      search.forEach((position) => {
        let newI = i + position[0];
        let newJ = j + position[1];

        // Check if new position is within bounds and not already infected
        if (
          newI >= 0 &&
          newI < DISPLAY_HEIGHT &&
          newJ >= 0 &&
          newJ < NUM_REELS &&
          infectedMatrix[newI][newJ] == 0 &&
          INFECTED_SYMBOLS.includes(matrix[newI][newJ])
        ) {
          infectedMatrix[newI][newJ] = 1; // Mark as infected
          infectionOrder[pos].push([newI, newJ]);
          matrix[newI][newJ] = WILD_SYMBOL;
          infectedQueue.push([newI, newJ]);
        }
      });
    }
    if (infectionOrder[pos].length == 0) {
      delete infectionOrder[pos];
    }
  });

  return infectionOrder;
}

function getWinReturn(symbol, count) {
  if (symbol in payTable) {
    return payTable[symbol][count];
  }
}

function checkAndInfectWild(matrix) {
  let newMatrix = JSON.parse(JSON.stringify(matrix));
  let wildPositions = getWinningWildPositions(newMatrix);
  let isFeatureTrigger = false;
  wildPositions = wildPositions.map((value) => {
    value = value.split(",");
    value[0] = parseInt(value[0]);
    value[1] = parseInt(value[1]);
    return value;
  });
  let infectionOrder = {};
  if (wildPositions.length > 0) infectionOrder = infectNeighbor(newMatrix, wildPositions);
  if (Object.keys(infectionOrder).length > 0) isFeatureTrigger = true;
  return { newMatrix, wildPositions, infectionOrder, isFeatureTrigger };
}

module.exports = { checkAndInfectWild };
