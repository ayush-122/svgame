const { RtpLevel } = require("./GameConstant");

const rtpLength = {
  1: [ 57, 58, 62, 62, 61 ],
  2: [ 58, 60, 62, 62, 61 ],
  3: [ 52, 58, 62, 62, 61 ],
  4: [ 52, 56, 62, 62, 61 ],
  5: [ 56, 54, 61, 62, 61 ]
};

const rtpLengthFreeGame = {
  1: [38, 45, 49, 49, 50],
  2: [32, 42, 48, 49, 50],
  3: [33, 39, 44, 48, 49],
  4: [33, 39, 44, 48, 49],
  5: [33, 39, 44, 48, 49],
};

const baseGameRequest = [
  { low: 0, high: rtpLength[RtpLevel][0] },
  { low: 0, high: rtpLength[RtpLevel][1] },
  { low: 0, high: rtpLength[RtpLevel][2] },
  { low: 0, high: rtpLength[RtpLevel][3] },
  { low: 0, high: rtpLength[RtpLevel][4] },
];
const freeGameRequest = [
  { low: 0, high: rtpLengthFreeGame[RtpLevel][0] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][1] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][2] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][3] },
  { low: 0, high: rtpLengthFreeGame[RtpLevel][4] },
];
const wheelGameRequest = [{ low: 0, high: 999 }];

module.exports = { baseGameRequest, freeGameRequest, wheelGameRequest };
