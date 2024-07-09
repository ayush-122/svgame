const baseGameRequest = {
  kenoNumbers: { min_number: 1, max_number: 80, draw_count: 30 },
  featureNumbers: [
    { low: 0, high: 138 },
    { low: 0, high: 563 },
    { low: 0, high: 563 },
    { low: 0, high: 563 },
    { low: 0, high: 563 },
    { low: 0, high: 563 },
  ],
};
const freeGameRequest = {
  kenoNumbers: { min_number: 1, max_number: 80, draw_count: 30 },
  featureNumbers: [
    { low: 0, high: 284 },
    { low: 0, high: 139 },
    { low: 0, high: 139 },
    { low: 0, high: 139 },
    { low: 0, high: 139 },
    { low: 0, high: 139 },
  ],
};

const extraDrawRequest = (draw_count) => {
  let obj = { kenoNumbers: { min_number: 1, max_number: 80, draw_count: draw_count } };
  return obj;
};
const bonusGameRequest = [{ low: 0, high: 1485 }];

module.exports = { baseGameRequest, freeGameRequest, bonusGameRequest, extraDrawRequest };
