const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [93, 95, 95, 75, 69],
};

const rtpLengthFreeGame = {
  1: [-1, -1, -1, -1, -1],
  2: [-1, -1, -1, -1, -1],
  3: [-1, -1, -1, -1, -1],
  4: [-1, -1, -1, -1, -1],
  5: [32, 30, 35, 36, 37],
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
