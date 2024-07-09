const { GameRTPLevel } = require("./GameRtpLevel");
// const {H1,H2,H3,H4,H5,L1,L2,L3,L4,L5,SC,WC} = require("./GameReelSymbol").GameReelSymbol.symbols;

const name = "buy";

let buyGameReels = new Map();

buyGameReels.set(GameRTPLevel.RTP_60, new Map());
buyGameReels.get(GameRTPLevel.RTP_60).set(1, []);
buyGameReels.get(GameRTPLevel.RTP_60).set(2, []);
buyGameReels.get(GameRTPLevel.RTP_60).set(3, []);
buyGameReels.get(GameRTPLevel.RTP_60).set(4, []);
buyGameReels.get(GameRTPLevel.RTP_60).set(5, []);

buyGameReels.set(GameRTPLevel.RTP_70, new Map());
buyGameReels.get(GameRTPLevel.RTP_70).set(1, []);
buyGameReels.get(GameRTPLevel.RTP_70).set(2, []);
buyGameReels.get(GameRTPLevel.RTP_70).set(3, []);
buyGameReels.get(GameRTPLevel.RTP_70).set(4, []);
buyGameReels.get(GameRTPLevel.RTP_70).set(5, []);

buyGameReels.set(GameRTPLevel.RTP_80, new Map());
buyGameReels.get(GameRTPLevel.RTP_80).set(1, []);
buyGameReels.get(GameRTPLevel.RTP_80).set(2, []);
buyGameReels.get(GameRTPLevel.RTP_80).set(3, []);
buyGameReels.get(GameRTPLevel.RTP_80).set(4, []);
buyGameReels.get(GameRTPLevel.RTP_80).set(5, []);

buyGameReels.set(GameRTPLevel.RTP_90, new Map());
buyGameReels.get(GameRTPLevel.RTP_90).set(1, []);
buyGameReels.get(GameRTPLevel.RTP_90).set(2, []);
buyGameReels.get(GameRTPLevel.RTP_90).set(3, []);
buyGameReels.get(GameRTPLevel.RTP_90).set(4, []);
buyGameReels.get(GameRTPLevel.RTP_90).set(5, []);

buyGameReels.set(GameRTPLevel.RTP_95, new Map());
buyGameReels.get(GameRTPLevel.RTP_95).set(1, []);
buyGameReels.get(GameRTPLevel.RTP_95).set(2, []);
buyGameReels.get(GameRTPLevel.RTP_95).set(3, []);
buyGameReels.get(GameRTPLevel.RTP_95).set(4, []);
buyGameReels.get(GameRTPLevel.RTP_95).set(5, []);

function createBuyReelRandomMap60(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createBuyReelRandomMap70(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createBuyReelRandomMap80(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createBuyReelRandomMap90(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createBuyReelRandomMap95(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createBuyReelRandomMap(rtpLevel, randomPools) {
  switch (rtpLevel) {
    case 1:
      return createBuyReelRandomMap60(randomPools);
    case 2:
      return createBuyReelRandomMap70(randomPools);
    case 3:
      return createBuyReelRandomMap80(randomPools);
    case 4:
      return createBuyReelRandomMap90(randomPools);
    case 5:
      return createBuyReelRandomMap95(randomPools);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createBuyReelMap(rtpLevel) {
  
  switch (rtpLevel) {
    case 1:
      return buyGameReels.get(GameRTPLevel.RTP_60);
    case 2:
      return buyGameReels.get(GameRTPLevel.RTP_70);
    case 3:
      return buyGameReels.get(GameRTPLevel.RTP_80)
    case 4:
      return buyGameReels.get(GameRTPLevel.RTP_90)
    case 5:
      return buyGameReels.get(GameRTPLevel.RTP_95)
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}
 
module.exports = {
  name,
  buyGameReels,
  createBuyReelRandomMap,
  createBuyReelMap
};