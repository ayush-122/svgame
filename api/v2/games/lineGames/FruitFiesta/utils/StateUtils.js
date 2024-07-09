const GameConstant = require("../configuration/GameConstant");

function countRespinBonus(bonusCount) {
  let reward = "RB";
  let totalRespinBonus = 0;
  if (bonusCount >= 3) {
    totalRespinBonus = 1;
  }

  return { reward, totalRespinBonus };
}

function countRespinRetrigger(bonusCount) {
  let reward = "RBR";
  let totalRespinBonus = 0;
  if (bonusCount >= 2) {
    totalRespinBonus = 2;
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
function freeGameRetriggerCalculation(scatterCount) {
  let reward = "FGR";
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

module.exports = {
  freeGameCalculation,
  freeGameRetriggerCalculation,
  symbolGridExpandingReels,
  countRespinBonus,
  countRespinRetrigger,
};
