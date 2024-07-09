const { RTP_LEVEL } = require("./GameConstant");

const rtpLength = {
  1: [86, 89, 81, 61, 59],
  2: [75, 82, 60, 60, 59],
  3: [64, 64, 60, 60, 59],
  4: [60, 60, 60, 60, 60],
  5: [60, 60, 60, 60, 60],
};

const rtpLengthFreeGame = {
  1: [41, 39, 39, 41, 42],
  2: [39, 37, 39, 41, 42],
  3: [37, 36, 39, 41, 42],
  4: [39, 36, 38, 41, 42],
  5: [40, 37, 38, 41, 42],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RTP_LEVEL][0] },
  { low: 0, high: rtpLength[RTP_LEVEL][1] },
  { low: 0, high: rtpLength[RTP_LEVEL][2] },
  { low: 0, high: rtpLength[RTP_LEVEL][3] },
  { low: 0, high: rtpLength[RTP_LEVEL][4] },
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][0] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][1] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][2] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][3] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][4] },
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
  { low: 0, high: 99 }, //Feature Stop
];

module.exports = { baseGameRequest, freeGameRequest };
