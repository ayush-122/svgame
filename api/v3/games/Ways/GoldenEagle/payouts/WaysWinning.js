const { WILD_SYMBOL, COLS, ROWS /*NUM_LINES, SCATTER_SYMBOL*/ } = require("../configuration/GameConstant");
const { payTable } = require("../configuration/PayTable");

function waysPayout(matrix) {
  let reel1 = matrix[0];
  let reel2 = matrix[1];
  let reel3 = matrix[2];
  let reel4 = matrix[3];
  let reel5 = matrix[4];
  let uniqueReel = [...new Set(reel1)];
  let totalWin = 0;
  let paylineData = [];

  for (let i = 0; i < uniqueReel.length; i++) {
    let eachElementWin = 0;
    let eachElementCount = [];
    let firstElement = uniqueReel[i];
    eachElementCount.push(
      reel1.filter((x) => x === firstElement || x === WILD_SYMBOL).length
    );
    eachElementCount.push(
      reel2.filter((x) => x === firstElement || x === WILD_SYMBOL).length
    );
    eachElementCount.push(
      reel3.filter((x) => x === firstElement || x === WILD_SYMBOL).length
    );
    eachElementCount.push(
      reel4.filter((x) => x === firstElement || x === WILD_SYMBOL).length
    );
    eachElementCount.push(
      reel5.filter((x) => x === firstElement || x === WILD_SYMBOL).length
    );
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
   // console.log("f => ", firstElement, "  count ", count, " mul >", mulCount);
    eachElementWin = getWinReturn(firstElement, count - 1) * mulCount;
   // console.log("eachElementWin ", eachElementWin);
    if (eachElementWin > 0) totalWin += eachElementWin;

    if (eachElementWin > 0) {
      let positionOfElement = positionForWinData(
        matrix,
        firstElement
      );

      paylineData.push({
        symbol: firstElement,
        symbolCount: count,
        positions: positionOfElement.positions,
        noOfPosition: positionOfElement.count,
        multiplier: mulCount,
        won: eachElementWin
      });
    }
  }

  return {totalWin, paylineData};
}

function positionForWinData  (matrix, firstSymbol)  {
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
  positions = positions.slice(0, -1);
  return {
    positions: positions,
    count: count
  };
}


function getWinReturn(symbol, count) {
  if (symbol in payTable) {
    return payTable[symbol][count];
  }
}

//  console.log(waysPayout([
//   ["H1", "SC", "H3"],
//   ["WC", "H3", "SC"],
//   ["H1", "H3", "BO"],
//   ["H1", "H1", "H3"],
//   ["BO", "SC", "BO"]
// ]));
module.exports = { waysPayout };
