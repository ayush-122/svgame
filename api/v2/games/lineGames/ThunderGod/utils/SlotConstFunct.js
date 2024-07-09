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
const expandingWild = (matrix, pools, featWeight) => {
  let matrixData = matrix;
  let expandingReels = [0, 0, 0, 0, 0];
  let expandingPosition = [0, 0, 0, 0, 0];
  let pivPool = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      pivPool++;
      if (matrixData[i][j] == WILD_SYMBOL) {
        if (pools[pivPool] < featWeight) {
          expandingReels[i] = 1;
          expandingPosition[i] = i + ";" + j;
        }
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
const expandingWildBox = (matrix, random) => {
  let wildBox = [];
  if (random < 8) {
    matrix[2][0] = WILD_SYMBOL;
    wildBox.push([2, 0]);
    matrix[3][0] = WILD_SYMBOL;
    wildBox.push([3, 0]);
    matrix[2][1] = WILD_SYMBOL;
    wildBox.push([2, 1]);
    matrix[3][1] = WILD_SYMBOL;
    wildBox.push([3, 1]);
  } else if (random < 16) {
    matrix[2][2] = WILD_SYMBOL;
    wildBox.push([2, 2]);
    matrix[3][2] = WILD_SYMBOL;
    wildBox.push([3, 2]);
    matrix[2][1] = WILD_SYMBOL;
    wildBox.push([2, 1]);
    matrix[3][1] = WILD_SYMBOL;
    wildBox.push([3, 1]);
  } else if (random < 26) {
    matrix[3][0] = WILD_SYMBOL;
    wildBox.push([3, 0]);
    matrix[4][0] = WILD_SYMBOL;
    wildBox.push([4, 0]);
    matrix[3][1] = WILD_SYMBOL;
    wildBox.push([3, 1]);
    matrix[4][1] = WILD_SYMBOL;
    wildBox.push([4, 1]);
  } else if (random < 36) {
    matrix[3][2] = WILD_SYMBOL;
    wildBox.push([3, 2]);
    matrix[4][2] = WILD_SYMBOL;
    wildBox.push([4, 2]);
    matrix[3][1] = WILD_SYMBOL;
    wildBox.push([3, 1]);
    matrix[4][1] = WILD_SYMBOL;
    wildBox.push([4, 1]);
  }
  if (random < 70) return { status: true, matrix, wildBox };
  else return { status: false };
};

module.exports = { SymbolCount, changeSymbolCode, expandingWild, expandingWildEnd, expandingWildBox };
