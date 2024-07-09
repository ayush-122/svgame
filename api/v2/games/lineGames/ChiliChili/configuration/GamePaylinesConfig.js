const { MAX_MULTIPLIER } = require("./GameConstant");

const paylines = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [1, 2, 2, 2, 1],
  [1, 0, 0, 0, 1],
  [2, 1, 1, 1, 2],
  [0, 1, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 2, 1, 2, 1],
  [0, 2, 0, 2, 0],
  [2, 0, 2, 0, 2],
  [1, 1, 0, 1, 1],
  [1, 1, 2, 1, 1],
  [2, 0, 0, 0, 2],
  [0, 2, 2, 2, 0],
  [2, 1, 2, 1, 2],
  [0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
];

function lines() {
  return paylines;
}

function maxBetMultiplier() {
  return MAX_MULTIPLIER;
}

// Export the functions or objects as needed
module.exports = {
  lines,
  maxBetMultiplier,
  paylines,
};
