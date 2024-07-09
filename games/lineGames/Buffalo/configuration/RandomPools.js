const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [78, 77, 76, 73, 68],
  2: [78, 77, 76, 73, 69],
  3: [79, 77, 76, 73, 72],
  4: [78, 77, 76, 73, 68],
  5: [78, 77, 76, 73, 68],
};

const rtpLengthFreeGame = {
  1: [46, 45, 41, 45, 44],
  2: [41, 38, 37, 40, 37],
  3: [40, 46, 47, 45, 44],
  4: [47, 47, 45, 52, 47],
  5: [43, 45, 45, 44, 44],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RtpLevel][0] },
  { low: 0, high: rtpLength[RtpLevel][1] },
  { low: 0, high: rtpLength[RtpLevel][2] },
  { low: 0, high: rtpLength[RtpLevel][3] },
  { low: 0, high: rtpLength[RtpLevel][4] },
  { low: 0, high: 100 }, //TODO - Add Feature Stop
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RtpLevel][0] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][1] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][2] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][3] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][4] },
  { low: 0, high: 100 }, //TODO - Add Feature Stop
];

const wheelGameRequest = [{ low: 0, high: 1000 }];

module.exports = { baseGameRequest, freeGameRequest, wheelGameRequest };
