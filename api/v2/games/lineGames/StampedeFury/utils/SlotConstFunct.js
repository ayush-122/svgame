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
  let matrixData = matrix;
  let expandingReels = [0, 0, 0, 0, 0];

  if (count == 3) expandingReels[4] = 1;
  else if (count == 4) {
    expandingReels[4] = 1;
    expandingReels[3] = 1;
  } else if (count == 5) {
    expandingReels[4] = 1;
    expandingReels[3] = 1;
    expandingReels[2] = 1;
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

module.exports = { SymbolCount, changeSymbolCode, expandingWild, expandingWildEnd };
