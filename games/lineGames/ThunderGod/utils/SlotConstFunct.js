const { WILD_SYMBOL } = require("../configuration/GameConstant");
const { GameReelSymbol } = require("../configuration/GameReelSymbol");

const SymbolCount = (matrix, symbol) => {
  let count = 0;
  let position = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == symbol) {
        count++;
        var str = i + "," + j;
        position.push(str);
      }
    }
  }
  return { count, position };
};

// CHANGE IN THIS CODE
const changeSymbolCode = (matrix) => {
  let matrixData = matrix;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let symbol = matrix[i][j];
      let ids = GameReelSymbol.symbolIds[symbol];
      matrixData[i][j] = ids.id;
    }
  }
  return matrixData;
};

// ExpandingWild
const expandingWild = (matrix) => {
  let matrixData = matrix;
  let expandingReels = [0, 0, 0, 0, 0];
  let expandingPosition = [0, 0, 0, 0, 0];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrixData[i][j] == WILD_SYMBOL) {
        expandingReels[i] = 1;
        expandingPosition[i] = i + ";" + j;
      }
    }
  }
  return { expandingReels, expandingPosition };
};

// ExpandingWild in End
const expandingWildEnd = (matrix, count) => {
  // console.log(matrix);
  // console.log(count);
  let matrixData = matrix;
  let expandingReels = [0, 0, 0, 0, 0];
  for (let i = expandingReels.length - 1; i >= 0; i--) {
    expandingReels[i] = 1;
    count = count - 1;
    if (count <= 0) break;
  }
  let expandingPosition = [0, 0, 0, 0, 0];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrixData[i][j] == WILD_SYMBOL) {
        expandingPosition[i] = i + ";" + j;
      }
    }
  }
  return { expandingReels, expandingPosition };
};

// ExpandingWild in End
const expandingWildSideWays = (matrix, random) => {
  if (random < 8) {
    matrix[0][2] = WILD_SYMBOL;
    matrix[0][3] = WILD_SYMBOL;
    matrix[1][2] = WILD_SYMBOL;
    matrix[1][3] = WILD_SYMBOL;
  } else if (random < 16) {
    matrix[2][2] = WILD_SYMBOL;
    matrix[2][3] = WILD_SYMBOL;
    matrix[1][2] = WILD_SYMBOL;
    matrix[1][3] = WILD_SYMBOL;
  } else if (random < 26) {
    matrix[0][3] = WILD_SYMBOL;
    matrix[0][4] = WILD_SYMBOL;
    matrix[1][3] = WILD_SYMBOL;
    matrix[1][4] = WILD_SYMBOL;
  } else if (random < 36) {
    matrix[2][3] = WILD_SYMBOL;
    matrix[2][4] = WILD_SYMBOL;
    matrix[1][3] = WILD_SYMBOL;
    matrix[1][4] = WILD_SYMBOL;
  }
  if (random < 70) return { status: true, matrix };
  else return false;
};

module.exports = { SymbolCount, changeSymbolCode, expandingWild, expandingWildEnd, expandingWildSideWays };
