const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [76, 75, 84, 77, 77], //60
  2: [76, 75, 84, 77, 77], //70
  3: [76, 75, 84, 77, 77], //80
  4: [76, 75, 84, 77, 77], //90
  5: [76, 75, 84, 77, 77], //95
};

const rtpLengthFreeGame = {
  1: [33, 32, 36, 39, 43], //60
  2: [31, 32, 36, 39, 43], //70
  3: [33, 34, 36, 39, 39], //80
  4: [35, 38, 40, 43, 43], //90
  5: [44, 38, 40, 43, 45], //95
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

module.exports = { baseGameRequest, freeGameRequest };
