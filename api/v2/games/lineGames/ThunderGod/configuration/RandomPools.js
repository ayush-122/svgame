const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [60, 60, 60, 60, 60],
};

const rtpLengthFreeGame = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [30, 32, 35, 40, 42],
};
const rtpLengthBonusGame = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [22, 37, 38, 41, 43],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RtpLevel][0] },
  { low: 0, high: rtpLength[RtpLevel][1] },
  { low: 0, high: rtpLength[RtpLevel][2] },
  { low: 0, high: rtpLength[RtpLevel][3] },
  { low: 0, high: rtpLength[RtpLevel][4] },
  // { low: 0, high: 100 }, //Feature Stop
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

const bonusGameRequest = [
  { low: 0, high: rtpLengthBonusGame[RtpLevel][0] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][1] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][2] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][3] },
  { low: 0, high: rtpLengthBonusGame[RtpLevel][4] },
  { low: 0, high: 99 }, //Feature Stop
];

module.exports = { baseGameRequest, freeGameRequest, bonusGameRequest };
