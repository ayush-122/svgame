const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [86, 89, 81, 61, 59],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [60, 60, 60, 60, 60],
};

const rtpLengthFreeGame = {
  1: [41, 39, 39, 41, 42],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [40, 37, 38, 41, 42],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RtpLevel][0] },
  { low: 0, high: rtpLength[RtpLevel][1] },
  { low: 0, high: rtpLength[RtpLevel][2] },
  { low: 0, high: rtpLength[RtpLevel][3] },
  { low: 0, high: rtpLength[RtpLevel][4] },
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
  { low: 0, high: rtpLengthFreeGame[RtpLevel][0] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][1] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][2] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][3] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][4] },
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
