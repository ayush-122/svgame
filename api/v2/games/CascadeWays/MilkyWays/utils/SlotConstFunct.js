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
      // console.log(ids);
      matrixData[i][j] = ids.id;
    }
  }
  return matrixData;
};

const FindPositionOfStars = (matrix) => {
  let matrixDataPos = [];
  let elementCount = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        let pos = i + ";" + j;
        matrixDataPos.push(pos);
        elementCount++;
      }
    }
  }
  return { matrixDataPos, elementCount };
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

const calculatedStarMultiplier = (starCount,randomPools) => {
  console.log("star count is :",starCount);
  console.log("random pools are :",randomPools);
 
}
module.exports = {
  SymbolCount,
  changeSymbolCode,
  expandingWild,
  FindPositionOfStars,
  calculatedStarMultiplier,
};
