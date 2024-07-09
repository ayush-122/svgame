// const { WILD_SYMBOL } = require("../GameConstant/gameConst");
// const { payTable } = require("../GameConstant/payTable");
const { WILD_SYMBOL } = require("../configuration/GameConstant");
const { payTable } = require("../configuration/PayTable");
let winningPositions = [];
function waysWinCalculation(symbolGrid) {
  winningPositions = [];
  let reelSymbols1 = symbolGrid[0];
  let reelSymbols2 = symbolGrid[1];
  let reelSymbols3 = symbolGrid[2];
  let reelSymbols4 = symbolGrid[3];
  let reelSymbols5 = symbolGrid[4];
  let reelSymbols6 = symbolGrid[5];
  let uniqueReel = [...new Set(reelSymbols1)];
  let totalWin = 0;
  let paylineData = [];

  for (let i = 0; i < uniqueReel.length; i++) {
    let eachElementWin = 0;
    let eachElementCount = [];
    let firstElement = uniqueReel[i];
    eachElementCount.push(reelSymbols1.filter((x) => x === firstElement || x === WILD_SYMBOL).length);
    eachElementCount.push(reelSymbols2.filter((x) => x === firstElement || x === WILD_SYMBOL).length);
    eachElementCount.push(reelSymbols3.filter((x) => x === firstElement || x === WILD_SYMBOL).length);
    eachElementCount.push(reelSymbols4.filter((x) => x === firstElement || x === WILD_SYMBOL).length);
    eachElementCount.push(reelSymbols5.filter((x) => x === firstElement || x === WILD_SYMBOL).length);
    eachElementCount.push(reelSymbols6.filter((x) => x === firstElement || x === WILD_SYMBOL).length);
    // console.log("eachElementCount >  > ", eachElementCount);

    let mulCount = 1;

    for (let j = 0; j < eachElementCount.length; j++) {
      if (j < 3 || eachElementCount[j] !== 0) {
        mulCount *= eachElementCount[j];
      } else break;
    }

    let count = 0;
    for (let j = 0; j < eachElementCount.length; j++) {
      if (eachElementCount[j] !== 0) count++;
      else break;
    }
    //  console.log("f => ", firstElement, "  count ", count, " mul >", mulCount);
    eachElementWin = getWinReturn(firstElement, count - 1) * mulCount;
    //  console.log(
    //    "getWinReturn(firstElement, count - 1)  " +
    //      getWinReturn(firstElement, count - 1)
    //  );
    //  console.log("eachElementWin ", eachElementWin);
    if (eachElementWin > 0) totalWin += eachElementWin;

    if (eachElementWin > 0) {
      let positionOfElement = positionForWinData(symbolGrid, firstElement);

      if (eachLineWin > 0)
        paylineData.push({
          symbol: firstElement,
          symbolCount: count,
          positions: positionOfElement.positions,
          noOfPosition: positionOfElement.count,
          multiplier: mulCount,
          won: eachElementWin,
        });
      // console.log(paylineData);
    }
  }

  return { totalWin, paylineData, winningPositions };
}

function positionForWinData(matrix, firstSymbol) {
  let positions = "";
  let count = 0;
  for (let h = 0; h < matrix.length; h++) {
    let prevCount = count;
    for (let g = 0; g < matrix[h].length; g++) {
      if (matrix[h][g] === firstSymbol || matrix[h][g] === WILD_SYMBOL) {
        positions += "" + h + "," + g + ";";

        count++;
      }
    }

    if (count === prevCount) break;
  }
  winningPositions += positions;
  positions = positions.slice(0, -1);

  return {
    positions: positions,
    count: count,
  };
}

function getWinReturn(symbol, count) {
  if (symbol in payTable) {
    return payTable[symbol][count];
  }
}

module.exports = { waysWinCalculation };
