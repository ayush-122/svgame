const BaseGameReelConfig1 = require("../configuration/BaseGameReelConfig1");
const BaseGameReelConfig2 = require("../configuration/BaseGameReelConfig2");
const GameRtpLevel = require("../configuration/GameRtpLevel");
const FreeGameReelConfig1 = require("../configuration/FreeGameReelConfig1");
const FreeGameReelConfig2 = require("../configuration/FreeGameReelConfig2");

//Response Format
// const rtpLength = {
//   1: [77, 76, 85, 78, 78],//60
//   2: [77, 76, 85, 78, 78],//70
//   3: [77, 76, 85, 78, 78],//80
//   4: [77, 76, 85, 78, 78],//90
//   5: [77, 76, 85, 78, 78],//95
// };
function generateBaseReelData1() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = BaseGameReelConfig1.baseGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 5; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("BaseGameReelConfig1 : ", poolSet);
}

function generateBaseReelData2() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = BaseGameReelConfig2.baseGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 5; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("BaseGameReelConfig2 : ", poolSet);
}

function generateFreeReelData1() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = FreeGameReelConfig1.freeGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 5; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("FreeGameReelConfig1 : ", poolSet);
}

function generateFreeReelData2() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = {};
  for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
    let ReelSet = FreeGameReelConfig2.freeGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);
    let list = [];
    for (let i = 1; i <= 5; i++) {
      list.push(ReelSet.get(i).length - 1);
    }
    poolSet[rtpLevel] = list;
    list = [];
  }

  console.log("FreeGameReelConfig2 : ", poolSet);
}

generateBaseReelData1();
generateBaseReelData2();
generateFreeReelData1();
generateFreeReelData2();
