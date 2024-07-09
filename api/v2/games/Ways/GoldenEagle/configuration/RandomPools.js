const { RTP_LEVEL } = require("./GameConstant");

const rtpLength = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [87, 84, 81, 79, 80],
};

const rtpLengthFreeGame = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [41, 36, 31, 37, 43],
};

const rtpRespinReel = {
  1: [0, 0, 0, 0, 0],
  2: [0, 0, 0, 0, 0],
  3: [0, 0, 0, 0, 0],
  4: [0, 0, 0, 0, 0],
  5: [46, 43, 41, 39, 44],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RTP_LEVEL][0] },
  { low: 0, high: rtpLength[RTP_LEVEL][1] },
  { low: 0, high: rtpLength[RTP_LEVEL][2] },
  { low: 0, high: rtpLength[RTP_LEVEL][3] },
  { low: 0, high: rtpLength[RTP_LEVEL][4] },
  { low: 0, high: 100 }, //TODO - Add Feature Stop
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][0] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][1] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][2] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][3] },
  { low: 0, high: rtpLengthFreeGame[RTP_LEVEL][4] },
  { low: 0, high: 100 }, //TODO - Add Feature Stop
];
const respinGameRequest = [
  { low: 0, high: rtpRespinReel[RTP_LEVEL][0] },
  { low: 0, high: rtpRespinReel[RTP_LEVEL][1] },
  { low: 0, high: rtpRespinReel[RTP_LEVEL][2] },
  { low: 0, high: rtpRespinReel[RTP_LEVEL][3] },
  { low: 0, high: rtpRespinReel[RTP_LEVEL][4] },
  { low: 0, high: 100 }, //TODO - Add Feature Stop
];

const wheelGameRequest = [{ low: 0, high: 1000 }];

module.exports = { baseGameRequest, freeGameRequest, wheelGameRequest, respinGameRequest };
