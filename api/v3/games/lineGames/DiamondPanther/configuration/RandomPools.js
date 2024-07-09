const { RTP_LEVEL } = require("./GameConstant");

const rtpLength = {
  1: [76, 74, 83, 75, 74],
  2: [76, 74, 83, 75, 74],
  3: [76, 74, 83, 75, 74],
  4: [76, 74, 83, 75, 74],
  5: [76, 74, 83, 75, 74],
};

const rtpLengthFreeGame = {
  1: [46, 48, 49, 49, 43],
  2: [44, 49, 46, 41, 43],
  3: [39, 41, 39, 37, 44],
  4: [33, 34, 32, 41, 43],
  5: [36, 36, 38, 41, 43],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RTP_LEVEL][0] },
  { low: 0, high: rtpLength[RTP_LEVEL][1] },
  { low: 0, high: rtpLength[RTP_LEVEL][2] },
  { low: 0, high: rtpLength[RTP_LEVEL][3] },
  { low: 0, high: rtpLength[RTP_LEVEL][4] },
  { low: 0, high: 99 }, //Feature Stop
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][0] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][1] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][2] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][3] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][4] },
  { low: 0, high: 99 }, //Feature Stop
];

module.exports = { baseGameRequest, freeGameRequest };
