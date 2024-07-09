const MainGameReelConfig = require("../configuration/MainGameReelConfig1");
const MainGameReelConfig2 = require("../configuration/MainGameReelConfig2");
const GameRtpLevel = require("../configuration/GameRtpLevel");
const FreeGameReelConfig = require("../configuration/FreeGameReelConfig1");
const StarMainGameReelConfig1 = require("../configuration/StarMainGameReelConfig1");

//Response Format
// const rtpLength = {
//   1: [77, 76, 85, 78, 78],//60
//   2: [77, 76, 85, 78, 78],//70
//   3: [77, 76, 85, 78, 78],//80
//   4: [77, 76, 85, 78, 78],//90
//   5: [77, 76, 85, 78, 78],//95
// };
function generateBaseReelData() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = MainGameReelConfig.baseGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 6; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("BaseReel 1 : ", poolSet);
}

function generateBase3ReelData() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = MainGameReelConfig2.baseGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 6; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("BaseReel 2 : ", poolSet);
}

function generateStarReelData() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = StarMainGameReelConfig1.starBaseGameReels1.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 6; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("starReel : ", poolSet);
}

function generateFreeReelData() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = FreeGameReelConfig.freeGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 6; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("FreeReel 1 : ", poolSet);
}

generateBaseReelData();
generateBase3ReelData();
generateStarReelData();
generateFreeReelData();
