function createGameRTPLevel(
  level,
  buyFeature,
  percentStr,
  mathRTP,
  mathStddev
) {
  return {
    level,
    buyFeature,
    percentStr,
    mathRTP,
    mathStddev,
    getLevel() {
      return this.level;
    },
    hasBuyFeature() {
      return this.buyFeature;
    },
    getPercent() {
      return this.percentStr;
    },
    getMathRTP() {
      return this.mathRTP;
    },
    getMathStddev() {
      return this.mathStddev;
    },
  };
}

const RTP_60 = createGameRTPLevel(
  1,
  true,
  "86.83%,86.97%",
  "86.830560000%,86.974580000%",
  "11.30505102041,1.59193367347"
);
const RTP_70 = createGameRTPLevel(
  2,
  true,
  "93.93%,94.07%",
  "93.9250800000%,94.0668500000%",
  "10.62416326531,1.62201020"
);
const RTP_80 = createGameRTPLevel(
  3,
  true,
  "95.90%,96.02%",
  "95.900450000%,96.0245400000%",
  "10.400035714286,1.73551530612"
);
const RTP_90 = createGameRTPLevel(
  3,
  true,
  "95.90%,96.02%",
  "95.900450000%,96.0245400000%",
  "10.400035714286,1.73551530612"
);
const RTP_95 = createGameRTPLevel(
  3,
  true,
  "95.90%,96.02%",
  "95.900450000%,96.0245400000%",
  "10.400035714286,1.73551530612"
);

function getGameRTPLevel(level) {
  switch (level) {
    case 1:
      return RTP_60;
    case 2:
      return RTP_70;
    case 3:
      return RTP_80;
    case 4:
      return RTP_90;
    case 5:
      return RTP_95;
    default:
      return null;
  }
}

function createRTPLevel(gameRTPLevel) {
  return {
    level: gameRTPLevel.getLevel(),
    buyFeature: gameRTPLevel.hasBuyFeature(),
    percentStr: gameRTPLevel.getPercent(),
    mathRTP: gameRTPLevel.getMathRTP(),
    mathStddev: gameRTPLevel.getMathStddev(),
  };
}

module.exports = { createGameRTPLevel, createRTPLevel, getGameRTPLevel };
