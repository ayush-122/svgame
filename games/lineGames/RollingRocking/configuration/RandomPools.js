const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [86, 89, 81, 61, 59], //60
  2: [76, 74, 83, 75, 74], //70
  3: [76, 74, 83, 75, 74], //80
  4: [76, 74, 83, 75, 74], //90
  5: [76, 74, 83, 75, 74], //95
};

const rtpLengthFreeGame = {
  1: [41, 39, 39, 41, 42], //60
  2: [44, 49, 46, 41, 43], //70
  3: [39, 41, 39, 37, 44], //80
  4: [33, 34, 32, 41, 43], //90
  5: [36, 36, 38, 41, 43], //95
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RtpLevel][0] },
  { low: 0, high: rtpLength[RtpLevel][1] },
  { low: 0, high: rtpLength[RtpLevel][2] },
  { low: 0, high: rtpLength[RtpLevel][3] },
  { low: 0, high: rtpLength[RtpLevel][4] },
  { low: 0, high: 99 }, //Feature Stop
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RtpLevel][0] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][1] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][2] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][3] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][4] },
  { low: 0, high: 99 }, //Feature Stop
];

module.exports = { baseGameRequest, freeGameRequest };
