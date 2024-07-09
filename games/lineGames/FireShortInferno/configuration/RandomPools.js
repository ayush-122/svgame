const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [75, 67, 69, 66, 61],
};

const rtpLengthFreeGame = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [28, 27, 27, 32, 39],
};
const rtpLengthBonusGame = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [27, 27, 31, 26, 36],
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
