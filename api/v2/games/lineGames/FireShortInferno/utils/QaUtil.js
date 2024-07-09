const MainGameReelConfig = require("../configuration/MainGameReelConfig");
const GameRtpLevel = require("../configuration/GameRtpLevel");
const FreeGameReelConfig = require("../configuration/FreeGameReelConfig");
const RespinReelConfig = require("../configuration/RespinReelConfig");

// eslint-disable-next-line no-unused-vars
const { H1, H2, H3, H4, H5, L1, L2, L3, L4, L5, BN, WC, BO } = require("../configuration/GameReelSymbol").GameReelSymbol
  .symbols;

function generateBaseReelData() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = "";
  //   for (let rtpLevel = 1; rtpLevel <= 5; rtpLevel++) {
  let rtpLevel = 5;
  let ReelSet = MainGameReelConfig.baseGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);

  //! STUB - For Wild
  let list = "\tWild Symbols:\n#BASE\n";
  for (let i = 1; i <= 5; i++) {
    list += findFirstSymbol(ReelSet.get(i), WC);
    list += ",";
  }
  list += "\n";
  poolSet += list;
  list = "";

  //! STUB - FREE Game
  list = "\tFree Game:\n#BASE\n";
  for (let i = 1; i <= 5; i++) {
    list += findFirstSymbol(ReelSet.get(i), BN);
    list += ",";
  }
  list += "\n";
  poolSet += list;
  list = "";

  //! STUB - FREE Game
  list = "\tRespin Game:\n#BASE\n";
  for (let i = 1; i <= 5; i++) {
    list += findFirstSymbol(ReelSet.get(i), BO);
    list += ",";
  }
  list += "\n";
  poolSet += list;
  list = "";

  console.log("BaseGame : \n" + poolSet);
}

function generateFreeReelData() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = "";
  let rtpLevel = 5;
  let ReelSet = FreeGameReelConfig.freeGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);

  //! STUB - For Wild
  let list = "\tRetrigger Symbols:\n#FREE\n";
  for (let i = 1; i <= 5; i++) {
    list += findFirstSymbol(ReelSet.get(i), BN);
    list += ",";
  }
  list += "\n";
  poolSet += list;
  list = "";

  console.log("FreeGame : \n" + poolSet);
}

function generateRespinReelData() {
  let obj = {
    1: "RTP_60",
    2: "RTP_70",
    3: "RTP_80",
    4: "RTP_90",
    5: "RTP_95",
  };
  let poolSet = "";
  let rtpLevel = 5;
  let ReelSet = RespinReelConfig.respinGameReels.get(GameRtpLevel.GameRTPLevel[obj[rtpLevel]]);

  //! STUB - For Retrigger
  let list = "\tRetrigger Symbols:\n#RESPIN\n";
  for (let i = 1; i <= 5; i++) {
    list += findFirstSymbol(ReelSet.get(i), BO);
    list += ",";
  }
  list += "\n";
  poolSet += list;
  list = "";

  console.log("RespinGame : \n" + poolSet);
}

function findFirstSymbol(array, symbol) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element == symbol) return index;
  }

  return -1;
}

generateBaseReelData();
generateFreeReelData();
generateRespinReelData();
