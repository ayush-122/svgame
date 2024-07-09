const MainGameReelConfig = require("../configuration/MainGameReelConfig");
const GameRtpLevel = require("../configuration/GameRtpLevel");
const FreeGameReelConfig = require("../configuration/FreeGameReelConfig");
// eslint-disable-next-line no-unused-vars
const { H1, H2, H3, H4, H5, L1, L2, L3, L4, L5, SC, WC, BO } = require("../configuration/GameReelSymbol").GameReelSymbol
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
  //Adding Data for Expanding Wild
  list += "7";

  list += "\n";
  poolSet += list;
  list = "";

  //! STUB - FREE Game
  list = "\tFree Game:\n#BASE\n";
  for (let i = 1; i <= 5; i++) {
    list += findFirstSymbol(ReelSet.get(i), SC);
    list += ",";
  }
  //Adding Data for Expanding Wild
  list += "7";
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
  let list = "\tWild Symbols:\n#FREE\n";
  for (let i = 1; i <= 5; i++) {
    list += findFirstSymbol(ReelSet.get(i), WC);
    list += ",";
  }
  //Adding Data for Expanding Wild
  list += "7";
  list += "\n";
  poolSet += list;
  list = "";

  console.log("FreeGame : \n" + poolSet);
}
function findFirstSymbol(array, symbol) {
  //   console.log("Array : ", array);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // console.log(element + " == " + symbol);
    if (element == symbol) return index;
  }

  return -1;
}

generateBaseReelData();
generateFreeReelData();
