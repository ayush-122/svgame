const { RTP_LEVEL } = require("./GameConstant");

const rtpLength = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [59, 73, 62, 71, 76],
};

const rtpLengthFreeGame = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [33, 36, 39, 42, 43],
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
