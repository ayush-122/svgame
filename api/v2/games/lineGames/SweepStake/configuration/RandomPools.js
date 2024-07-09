const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [51, 69, 55, 68, 70],
};

const rtpLengthFreeGame = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [33, 32, 34, 36, 37],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RtpLevel][0] },
  { low: 0, high: rtpLength[RtpLevel][1] },
  { low: 0, high: rtpLength[RtpLevel][2] },
  { low: 0, high: rtpLength[RtpLevel][3] },
  { low: 0, high: rtpLength[RtpLevel][4] },
  // { low: 0, high: 100 }, //TODO - Add Feature Stop
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RtpLevel][0] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][1] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][2] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][3] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][4] },
  // { low: 0, high: 100 }, //TODO - Add Feature Stop
];

const pickBonusRequest = [
  { low: 0, high: 699 },
  { low: 0, high: 999 },
  { low: 0, high: 999 },
  { low: 0, high: 999 },
  { low: 0, high: 999 },
  { low: 0, high: 999 },
  { low: 0, high: 999 },
  { low: 0, high: 999 },
];

module.exports = { baseGameRequest, freeGameRequest, pickBonusRequest };
