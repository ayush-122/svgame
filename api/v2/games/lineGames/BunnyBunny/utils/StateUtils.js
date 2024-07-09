const GameConstant = require("../configuration/GameConstant");

function freeGameCalculation(scatterCount) {
  let reward = "FG";
  let totalFreeSpin = 0;
  if (scatterCount == 3) {
    totalFreeSpin = 5;
  } else if (scatterCount == 4) {
    totalFreeSpin = 7;
  } else if (scatterCount == 5) {
    totalFreeSpin = 10;
  }

  return { reward, totalFreeSpin };
}

//expanding reel function
function symbolGridExpandingReels(matrix, expandingReel) {
  const matrixData = matrix.map((row) => row.slice());
  for (let i = 0; i < matrix.length; i++) {
    if (expandingReel[i] == 1) {
      for (let j = 0; j < matrix[i].length; j++) {
        matrixData[i][j] = GameConstant.WILD_SYMBOL;
      }
    }
  }

  return matrixData;
}

module.exports = { freeGameCalculation, symbolGridExpandingReels };
