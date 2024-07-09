const GameConstant = require("../configuration/GameConstant");

function countRespinBonus(bonusCount) {
  let reward = "RB";
  let totalRespinBonus = 0;
  if (bonusCount == 3) {
    totalRespinBonus = 2;
  } else if (bonusCount == 4) {
    totalRespinBonus = 3;
  } else if (bonusCount == 5) {
    totalRespinBonus = 4;
  }

  return { reward, totalRespinBonus };
}

function freeGameCalculation(scatterCount) {
  let reward = "FG";
  let totalFreeSpin = 0;
  if (scatterCount == 3) {
    totalFreeSpin = 5;
  } else if (scatterCount == 4) {
    totalFreeSpin = 8;
  } else if (scatterCount == 5) {
    totalFreeSpin = 12;
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

module.exports = { freeGameCalculation, symbolGridExpandingReels, countRespinBonus };
