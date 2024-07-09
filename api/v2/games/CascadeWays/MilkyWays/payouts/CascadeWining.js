const { BLANK_POSITIONS } = require("../configuration/GameConstant");

function removeWiningPosition(matrix, symbol_pos) {
  symbol_pos = symbol_pos.slice(0, -1);

  let pairs = symbol_pos.split(";");
  let uniquePositions = [...new Set(pairs)];

  for (let i = 0; i < uniquePositions.length; i++) {
    let position = uniquePositions[i].split(",");
    let row = position[0];
    let col = position[1];

    matrix[row][col] = BLANK_POSITIONS;
  }
}

function pushDownSymbols(matrix) {
  let updatedMatrix = [];

  for (let j = 0; j < matrix[0].length; j++) {
    updatedMatrix.push(moveNegOnesToFront(matrix[j]));
  }

  return updatedMatrix;
}

function moveNegOnesToFront(arr) {
  const nonNegOnes = arr.filter((element) => element !== "-1");

  const countNegOnes = arr.length - nonNegOnes.length;

  const resultArray = Array(countNegOnes).fill("-1").concat(nonNegOnes);

  return resultArray;
}

function fillBlankPositions(matrix, regenerateMatrix) {
  let InsertSymbol = [];
  for (let row = 0; row < matrix.length; row++) {
    let symbols = [];
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] == BLANK_POSITIONS) {
        matrix[row][col] = regenerateMatrix[row][col];
        symbols.push(regenerateMatrix[row][col]);
      }
    }
    InsertSymbol.push(symbols);
  }
  return { matrix, InsertSymbol };
}

module.exports = { removeWiningPosition, fillBlankPositions, pushDownSymbols };
