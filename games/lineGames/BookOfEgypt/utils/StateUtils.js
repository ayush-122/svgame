const GameConstant = require("../configuration/GameConstant");

function wheelBonus(pools) {
  let reward = "";
  let rand = pools.wheelTrigger1_at_0_62;
  let amount = 0;
  let bet = GameConstant.BASE_CREDITS_BET;
  if (rand < 200) {
    reward = "MULTIPLIER_3";
    amount = 3 * bet;
  } else if (rand < 450) {
    reward = "MINI";
    amount = 2000;
  } else if (rand < 650) {
    reward = "MULTIPLIER_5";
    amount = 5 * bet;
  } else if (rand < 970) {
    reward = "MAJOR";
    amount = 5000;
  } else if (rand < 990) {
    reward = "MULTIPLIER_8";
    amount = 8 * bet;
  } else if (rand < 1000) {
    reward = "GRAND";
    amount = 9000;
  } else {
    throw "invalid wheel option";
  }
  return { reward, amount };
}

function pickBonus(pools) {
  let reward = [];
  let amount = 0;
  for (let index = 1; index <= 8; index++) {
    let num = pools[index];
    if (index == 0) {
      if (num < 170) reward[index - 1] = 300;
      else if (num < 420) reward[index - 1] = 2000;
      else if (num < 620) reward[index - 1] = 500;
      else if (num < 680) reward[index - 1] = 240;
      else if (num < 690) reward[index - 1] = 9000;
      else if (num < 697) reward[index - 1] = 1000;
      else if (num < 700) reward[index - 1] = 5000;
    } else {
      if (num < 170) reward[index - 1] = 300;
      else if (num < 420) reward[index - 1] = 2000;
      else if (num < 620) reward[index - 1] = 500;
      else if (num < 680) reward[index - 1] = 240;
      else if (num < 690) reward[index - 1] = 9000;
      else if (num < 697) reward[index - 1] = 1000;
      else if (num < 700) reward[index - 1] = 5000;
      else if (num < 1000) break;
    }

    amount += reward[index - 1];
  }
  return { reward, amount };
}

function freeGameCalculation(scatterCount) {
  let reward = "FG";
  let totalFreeSpin = 0;
  if (scatterCount == 3) {
    totalFreeSpin = 8;
  } else if (scatterCount == 4) {
    totalFreeSpin = 12;
  } else if (scatterCount == 5) {
    totalFreeSpin = 15;
  }

  return { reward, totalFreeSpin };
}
function freeGameRetriggerCalculation(scatterCount) {
  let reward = "FGR";
  let totalFreeSpin = 0;
  if (scatterCount == 3) {
    totalFreeSpin = 1;
  } else if (scatterCount == 4) {
    totalFreeSpin = 2;
  } else if (scatterCount == 5) {
    totalFreeSpin = 3;
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

module.exports = { freeGameCalculation, freeGameRetriggerCalculation, symbolGridExpandingReels, wheelBonus, pickBonus };
