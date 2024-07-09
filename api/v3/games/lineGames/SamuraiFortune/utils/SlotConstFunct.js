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
      if (matrixData[i][j] == WILD_SYMBOL) {
        pivPool++;
        if (pools[pivPool] < featWeight) {
          expandingReels[i] = 1;
          expandingPosition[i] = i + ";" + j;
          break;
        }
      }
    }
  }
  return { expandingReels, expandingPosition };
};

module.exports = { SymbolCount, changeSymbolCode, expandingWild };
