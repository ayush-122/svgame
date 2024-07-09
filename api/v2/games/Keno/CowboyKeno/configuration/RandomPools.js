const WeightConfig = require("./WeightConfig");
const { RTP_LEVEL } = require("./GameConstant");

const rtpWeightsBase = WeightConfig[RTP_LEVEL].BaseGame.totalWeight;
const rtpWeightsFree = WeightConfig[RTP_LEVEL].FreeGame.totalWeight;
const rtpWeightsBonus = WeightConfig[RTP_LEVEL].BaseGame.totalBonusWeight;

const baseGameRequest = {
  kenoNumbers: { min_number: 1, max_number: 80, draw_count: 30 },
  featureNumbers: [
    { low: 0, high: rtpWeightsBase },
    { low: 0, high: rtpWeightsBase },
    { low: 0, high: rtpWeightsBase },
    { low: 0, high: rtpWeightsBase },
    { low: 0, high: rtpWeightsBase },
  ],
};
const freeGameRequest = {
  kenoNumbers: { min_number: 1, max_number: 80, draw_count: 30 },
  featureNumbers: [
    { low: 0, high: rtpWeightsFree },
    { low: 0, high: rtpWeightsFree },
    { low: 0, high: rtpWeightsFree },
    { low: 0, high: rtpWeightsFree },
    { low: 0, high: rtpWeightsFree },
  ],
};

const extraDrawRequest = (draw_count) => {
  let obj = { kenoNumbers: { min_number: 1, max_number: 80, draw_count: draw_count } };
  return obj;
};
const bonusGameRequest = [{ low: 0, high: rtpWeightsBonus }];

module.exports = { baseGameRequest, freeGameRequest, bonusGameRequest, extraDrawRequest };
