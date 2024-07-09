const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [94, 95, 93, 78, 76],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [94, 95, 93, 78, 76],
};

const rtpLengthFreeGame = {
  1: [35, 35, 36, 38, 42],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [32, 37, 37, 39, 42],
};
const rtpLengthBonusGame = {
  1: [77, 75, 68, 56, 50],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [47, 39, 46, 38, 52],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RtpLevel][0] },
  { low: 0, high: rtpLength[RtpLevel][1] },
  { low: 0, high: rtpLength[RtpLevel][2] },
  { low: 0, high: rtpLength[RtpLevel][3] },
  { low: 0, high: rtpLength[RtpLevel][4] },
  { low: 0, high: 100 }, //Feature Stop
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RtpLevel][0] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][1] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][2] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][3] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][4] },
  { low: 0, high: 100 }, //Feature Stop
];

const bonusGameRequest = [
  { low: 0, high: rtpLengthBonusGame[RtpLevel][0] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][1] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][2] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][3] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][4] },
  { low: 0, high: 100 }, //Feature Stop
];

module.exports = { baseGameRequest, freeGameRequest, bonusGameRequest };
