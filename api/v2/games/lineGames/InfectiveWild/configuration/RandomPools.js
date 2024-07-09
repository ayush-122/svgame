const { RTP_LEVEL } = require("./GameConstant");

const BaseGameReelConfig1 = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [172, 171, 186, 171, 172],
};

const BaseGameReelConfig2 = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [254, 296, 254, 296, 254],
};

const FreeGameReelConfig1 = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [1044, 1044, 1044, 1044, 1044],
};

const FreeGameReelConfig2 = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [79, 79, 79, 79, 79],
};

const baseGameRequest = [
  { low: 0, high: 99 },
  { low: 0, high: BaseGameReelConfig1[RTP_LEVEL][0] },
  { low: 0, high: BaseGameReelConfig1[RTP_LEVEL][1] },
  { low: 0, high: BaseGameReelConfig1[RTP_LEVEL][2] },
  { low: 0, high: BaseGameReelConfig1[RTP_LEVEL][3] },
  { low: 0, high: BaseGameReelConfig1[RTP_LEVEL][4] },
  { low: 0, high: BaseGameReelConfig2[RTP_LEVEL][0] },
  { low: 0, high: BaseGameReelConfig2[RTP_LEVEL][1] },
  { low: 0, high: BaseGameReelConfig2[RTP_LEVEL][2] },
  { low: 0, high: BaseGameReelConfig2[RTP_LEVEL][3] },
  { low: 0, high: BaseGameReelConfig2[RTP_LEVEL][4] },
];
const freeGameRequest = [
  { low: 0, high: 99 },
  { low: 0, high: FreeGameReelConfig1[RTP_LEVEL][0] },
  { low: 0, high: FreeGameReelConfig1[RTP_LEVEL][1] },
  { low: 0, high: FreeGameReelConfig1[RTP_LEVEL][2] },
  { low: 0, high: FreeGameReelConfig1[RTP_LEVEL][3] },
  { low: 0, high: FreeGameReelConfig1[RTP_LEVEL][4] },
  { low: 0, high: FreeGameReelConfig2[RTP_LEVEL][0] },
  { low: 0, high: FreeGameReelConfig2[RTP_LEVEL][1] },
  { low: 0, high: FreeGameReelConfig2[RTP_LEVEL][2] },
  { low: 0, high: FreeGameReelConfig2[RTP_LEVEL][3] },
  { low: 0, high: FreeGameReelConfig2[RTP_LEVEL][4] },
];

module.exports = { baseGameRequest, freeGameRequest };
