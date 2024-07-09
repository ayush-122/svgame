const { WILD_SYMBOL, COLS, ROWS /*NUM_LINES, SCATTER_SYMBOL*/ } = require("../configuration/GameConstant");
const { payTable } = require("../configuration/PayTable");

function waysPayout(matrix) {
  let uniqueReel = [...new Set(matrix.flat())]; // Extract unique symbols from the matrix
  let totalWin = 0; // Initialize total win to 0
  let paylineData = []; // Initialize an array to store payline data

  for (let i = 0; i < uniqueReel.length; i++) {
    // Loop through each unique symbol
    let eachElementWin = 0; // Initialize win for each symbol to 0
    let eachElementCount = []; // Initialize an array to store symbol counts for each column
    let firstElement = uniqueReel[i]; // Get the current unique symbol

    // Count occurrences of the current symbol (including wild symbols) in each column
    for (let j = 0; j < COLS; j++) {
      eachElementCount.push(matrix[j].filter((x) => x === firstElement || x === WILD_SYMBOL).length);
    }

    let mulCount = 1; // Initialize multiplier count to 1

    // Calculate the multiplier count for the symbol based on its occurrences in each column
    for (let j = 0; j < eachElementCount.length; j++) {
      if (j < ROWS || eachElementCount[j] !== 0) {
        mulCount *= eachElementCount[j];
      } else break;
    }

    let count = eachElementCount.filter((count) => count !== 0).length; // Calculate the total count of the symbol

    eachElementWin = getWinReturn(firstElement, count - 1) * mulCount; // Calculate win for the symbol

    if (eachElementWin > 0) totalWin += eachElementWin; // Add symbol's win to total win if it's greater than 0

    if (eachElementWin > 0) {
      // If the symbol has a win
      let positionOfElement = positionForWinData(matrix, firstElement); // Get positions of the symbol in the matrix

      // Store payline data for the symbol
      paylineData.push({
        symbol: firstElement,
        symbolCount: count,
        positions: positionOfElement.positions,
        noOfPosition: positionOfElement.count,
        multiplier: mulCount,
        won: eachElementWin,
      });
    }
  }

  return { totalWin, paylineData }; // Return total win and payline data
}

function positionForWinData(matrix, firstSymbol) {
  let positions = ""; // Initialize positions string
  let count = 0; // Initialize count of symbol occurrences to 0
  for (let h = 0; h < matrix.length; h++) {
    // Loop through matrix rows
    let prevCount = count; // Store previous count value
    for (let g = 0; g < matrix[h].length; g++) {
      // Loop through matrix columns
      if (matrix[h][g] === firstSymbol || matrix[h][g] === WILD_SYMBOL) {
        // If symbol or wild symbol is found
        positions += "" + h + "," + g + ";"; // Add position to positions string
        count++; // Increment count
      }
    }
    if (count === prevCount) break; // If count doesn't change, exit loop
  }
  positions = positions.slice(0, -1); // Remove trailing semicolon from positions string
  return {
    positions: positions,
    count: count,
  };
}

function getWinReturn(symbol, count) {
  if (symbol in payTable) {
    // If symbol exists in payTable
    return payTable[symbol][count]; // Return win for symbol and count
  }
}

module.exports = { waysPayout };
