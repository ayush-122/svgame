// const { DISPLAY_HEIGHT, NUM_REELS } = require("./GameConstant");
const { GameRTPLevel } = require("./GameRtpLevel");
// const randomPools = require("./RandomPools");
const {AA,BB,CC,DD,FF,GG,HH,JJ,II,SC,WC} = require("./GameReelSymbol").GameReelSymbol.symbols;

const name = "buy";

let buyGameReels = new Map();

buyGameReels.set(GameRTPLevel.RTP_60, new Map());
buyGameReels.get(GameRTPLevel.RTP_60).set(1, [SC, GG, HH, BB, JJ, GG, GG, HH, BB, JJ, GG, HH, HH, JJ, DD, HH, HH, FF, HH, JJ, DD, AA, GG, DD, CC, HH, BB, DD, JJ, GG, WC, JJ, CC, HH, JJ, AA, DD, BB, JJ, HH, CC, DD, HH, SC, HH, AA, HH, DD, CC, HH, HH, CC, JJ, BB, GG, FF, II, FF, FF, HH, II, II, II, GG, SC, II, II, II, II, WC, II, HH, II, II, II, II, II, II]);
buyGameReels.get(GameRTPLevel.RTP_60).set(2, [BB, JJ, GG, DD, BB, HH, HH, AA, GG, DD, HH, JJ, HH, HH, CC, WC, GG, JJ, AA, CC, HH, BB, DD, GG, JJ, HH, AA, HH, JJ, SC, DD, HH, GG, HH, CC, BB, HH, JJ, CC, SC, JJ, GG, HH, JJ, DD, HH, SC, BB, GG, DD, HH, AA, HH, JJ, DD, HH, CC, HH, SC, HH, FF, II, FF, FF, II, II, II, II, FF, II, II, II, II, II, II, FF, AA]);
buyGameReels.get(GameRTPLevel.RTP_60).set(3, [HH, GG, AA, HH, CC, HH, FF, JJ, HH, GG, DD, HH, GG, FF, AA, JJ, HH, FF, GG, CC, JJ, HH, DD, CC, HH, GG, HH, BB, AA, CC, DD, AA, GG, CC, AA, SC, BB, HH, AA, DD, JJ, HH, BB, DD, HH, GG, JJ, SC, CC, DD, BB, HH, AA, WC, DD, HH, JJ, FF, II, FF, II, II, II, II, II, II, II, II, II, II, FF, JJ, JJ, JJ, CC]);
buyGameReels.get(GameRTPLevel.RTP_60).set(4, [JJ, HH, CC, DD, AA, JJ, GG, BB, DD, JJ, HH, CC, BB, CC, GG, JJ, AA, CC, BB, GG, HH, GG, BB, HH, HH, AA, DD, JJ, HH, DD, AA, CC, BB, HH, SC, HH, HH, GG, BB, DD, AA, GG, WC, BB, CC, SC, GG, AA, BB, DD, CC, HH, JJ, DD, HH, AA, JJ, WC, WC, FF, II, II, II, II, II, JJ, HH, HH, HH, HH, FF, II]);
buyGameReels.get(GameRTPLevel.RTP_60).set(5, [HH, CC, GG, JJ, HH, DD, BB, GG, HH, HH, SC, BB, GG, AA, BB, JJ, WC, CC, BB, GG, HH, JJ, AA, BB, HH, JJ, GG, HH, CC, AA, DD, HH, HH, CC, JJ, WC, AA, BB, CC, HH, DD, JJ, HH, CC, AA, DD, GG, AA, BB, DD, HH, AA, JJ, HH, HH, BB, DD, SC, FF, II, FF, WC, WC, FF, II, II, II, II, FF, FF, SC, GG]);

buyGameReels.set(GameRTPLevel.RTP_70, new Map());
buyGameReels.get(GameRTPLevel.RTP_70).set(1, [SC, GG, HH, BB, JJ, GG, GG, HH, BB, JJ, GG, HH, HH, JJ, DD, HH, HH, FF, HH, JJ, DD, AA, GG, DD, CC, HH, BB, DD, JJ, GG, WC, JJ, CC, HH, JJ, AA, DD, BB, JJ, HH, CC, DD, HH, SC, HH, AA, HH, DD, CC, HH, HH, CC, JJ, BB, GG, FF, II, FF, FF, HH, II, II, II, GG, SC, II, II, II, II, WC, II, HH, II, II, II, II, II, II]);
buyGameReels.get(GameRTPLevel.RTP_70).set(2, [BB, JJ, GG, DD, BB, HH, HH, AA, GG, DD, HH, JJ, HH, HH, CC, WC, GG, JJ, AA, CC, HH, BB, DD, GG, JJ, HH, AA, HH, JJ, SC, DD, HH, GG, HH, CC, BB, HH, JJ, CC, SC, JJ, GG, HH, JJ, DD, HH, SC, BB, GG, DD, HH, AA, HH, JJ, DD, HH, CC, HH, SC, HH, FF, II, FF, FF, II, II, II, II, FF, II, II, II, II, II, II, FF, AA]);
buyGameReels.get(GameRTPLevel.RTP_70).set(3, [HH, GG, AA, HH, CC, HH, FF, JJ, HH, GG, DD, HH, GG, FF, AA, JJ, HH, FF, GG, CC, JJ, HH, DD, CC, HH, GG, HH, BB, AA, CC, DD, AA, GG, CC, AA, SC, BB, HH, AA, DD, JJ, HH, BB, DD, HH, GG, JJ, SC, CC, DD, BB, HH, AA, WC, DD, HH, JJ, FF, II, FF, II, II, II, II, II, II, II, II, II, II, FF, JJ, JJ, JJ, CC]);
buyGameReels.get(GameRTPLevel.RTP_70).set(4, [JJ, HH, CC, DD, AA, JJ, GG, BB, DD, JJ, HH, CC, BB, CC, GG, JJ, AA, CC, BB, GG, HH, GG, BB, HH, HH, AA, DD, JJ, HH, DD, AA, CC, BB, HH, SC, HH, HH, GG, BB, DD, AA, GG, WC, BB, CC, SC, GG, AA, BB, DD, CC, HH, JJ, DD, HH, AA, JJ, WC, WC, FF, II, II, II, II, II, JJ, HH, HH, HH, HH, FF, II]);
buyGameReels.get(GameRTPLevel.RTP_70).set(5, [HH, CC, GG, JJ, HH, DD, BB, GG, HH, HH, SC, BB, GG, AA, BB, JJ, WC, CC, BB, GG, HH, JJ, AA, BB, HH, JJ, GG, HH, CC, AA, DD, HH, HH, CC, JJ, WC, AA, BB, CC, HH, DD, JJ, HH, CC, AA, DD, GG, AA, BB, DD, HH, AA, JJ, HH, HH, BB, DD, SC, FF, II, FF, WC, WC, FF, II, II, II, II, FF, FF, SC, GG]);

buyGameReels.set(GameRTPLevel.RTP_80, new Map());
buyGameReels.get(GameRTPLevel.RTP_80).set(1, [SC, GG, HH, BB, JJ, GG, GG, HH, BB, JJ, GG, HH, HH, JJ, DD, HH, HH, FF, HH, JJ, DD, AA, GG, DD, CC, HH, BB, DD, JJ, GG, WC, JJ, CC, HH, JJ, AA, DD, BB, JJ, HH, CC, DD, HH, SC, HH, AA, HH, DD, CC, HH, HH, CC, JJ, BB, GG, FF, II, FF, FF, HH, II, II, II, GG, SC, II, II, II, II, WC, II, HH, II, II, II, II, II, II]);
buyGameReels.get(GameRTPLevel.RTP_80).set(2, [BB, JJ, GG, DD, BB, HH, HH, AA, GG, DD, HH, JJ, HH, HH, CC, WC, GG, JJ, AA, CC, HH, BB, DD, GG, JJ, HH, AA, HH, JJ, SC, DD, HH, GG, HH, CC, BB, HH, JJ, CC, SC, JJ, GG, HH, JJ, DD, HH, SC, BB, GG, DD, HH, AA, HH, JJ, DD, HH, CC, HH, SC, HH, FF, II, FF, FF, II, II, II, II, FF, II, II, II, II, II, II, FF, AA]);
buyGameReels.get(GameRTPLevel.RTP_80).set(3, [HH, GG, AA, HH, CC, HH, FF, JJ, HH, GG, DD, HH, GG, FF, AA, JJ, HH, FF, GG, CC, JJ, HH, DD, CC, HH, GG, HH, BB, AA, CC, DD, AA, GG, CC, AA, SC, BB, HH, AA, DD, JJ, HH, BB, DD, HH, GG, JJ, SC, CC, DD, BB, HH, AA, WC, DD, HH, JJ, FF, II, FF, II, II, II, II, II, II, II, II, II, II, FF, JJ, JJ, JJ, CC]);
buyGameReels.get(GameRTPLevel.RTP_80).set(4, [JJ, HH, CC, DD, AA, JJ, GG, BB, DD, JJ, HH, CC, BB, CC, GG, JJ, AA, CC, BB, GG, HH, GG, BB, HH, HH, AA, DD, JJ, HH, DD, AA, CC, BB, HH, SC, HH, HH, GG, BB, DD, AA, GG, WC, BB, CC, SC, GG, AA, BB, DD, CC, HH, JJ, DD, HH, AA, JJ, WC, WC, FF, II, II, II, II, II, JJ, HH, HH, HH, HH, FF, II]);
buyGameReels.get(GameRTPLevel.RTP_80).set(5, [HH, CC, GG, JJ, HH, DD, BB, GG, HH, HH, SC, BB, GG, AA, BB, JJ, WC, CC, BB, GG, HH, JJ, AA, BB, HH, JJ, GG, HH, CC, AA, DD, HH, HH, CC, JJ, WC, AA, BB, CC, HH, DD, JJ, HH, CC, AA, DD, GG, AA, BB, DD, HH, AA, JJ, HH, HH, BB, DD, SC, FF, II, FF, WC, WC, FF, II, II, II, II, FF, FF, SC, GG]);

buyGameReels.set(GameRTPLevel.RTP_90, new Map());
buyGameReels.get(GameRTPLevel.RTP_90).set(1, [SC, GG, HH, BB, JJ, GG, GG, HH, BB, JJ, GG, HH, HH, JJ, DD, HH, HH, FF, HH, JJ, DD, AA, GG, DD, CC, HH, BB, DD, JJ, GG, WC, JJ, CC, HH, JJ, AA, DD, BB, JJ, HH, CC, DD, HH, SC, HH, AA, HH, DD, CC, HH, HH, CC, JJ, BB, GG, FF, II, FF, FF, HH, II, II, II, GG, SC, II, II, II, II, WC, II, HH, II, II, II, II, II, II]);
buyGameReels.get(GameRTPLevel.RTP_90).set(2, [BB, JJ, GG, DD, BB, HH, HH, AA, GG, DD, HH, JJ, HH, HH, CC, WC, GG, JJ, AA, CC, HH, BB, DD, GG, JJ, HH, AA, HH, JJ, SC, DD, HH, GG, HH, CC, BB, HH, JJ, CC, SC, JJ, GG, HH, JJ, DD, HH, SC, BB, GG, DD, HH, AA, HH, JJ, DD, HH, CC, HH, SC, HH, FF, II, FF, FF, II, II, II, II, FF, II, II, II, II, II, II, FF, AA]);
buyGameReels.get(GameRTPLevel.RTP_90).set(3, [HH, GG, AA, HH, CC, HH, FF, JJ, HH, GG, DD, HH, GG, FF, AA, JJ, HH, FF, GG, CC, JJ, HH, DD, CC, HH, GG, HH, BB, AA, CC, DD, AA, GG, CC, AA, SC, BB, HH, AA, DD, JJ, HH, BB, DD, HH, GG, JJ, SC, CC, DD, BB, HH, AA, WC, DD, HH, JJ, FF, II, FF, II, II, II, II, II, II, II, II, II, II, FF, JJ, JJ, JJ, CC]);
buyGameReels.get(GameRTPLevel.RTP_90).set(4, [JJ, HH, CC, DD, AA, JJ, GG, BB, DD, JJ, HH, CC, BB, CC, GG, JJ, AA, CC, BB, GG, HH, GG, BB, HH, HH, AA, DD, JJ, HH, DD, AA, CC, BB, HH, SC, HH, HH, GG, BB, DD, AA, GG, WC, BB, CC, SC, GG, AA, BB, DD, CC, HH, JJ, DD, HH, AA, JJ, WC, WC, FF, II, II, II, II, II, JJ, HH, HH, HH, HH, FF, II]);
buyGameReels.get(GameRTPLevel.RTP_90).set(5, [HH, CC, GG, JJ, HH, DD, BB, GG, HH, HH, SC, BB, GG, AA, BB, JJ, WC, CC, BB, GG, HH, JJ, AA, BB, HH, JJ, GG, HH, CC, AA, DD, HH, HH, CC, JJ, WC, AA, BB, CC, HH, DD, JJ, HH, CC, AA, DD, GG, AA, BB, DD, HH, AA, JJ, HH, HH, BB, DD, SC, FF, II, FF, WC, WC, FF, II, II, II, II, FF, FF, SC, GG]);

buyGameReels.set(GameRTPLevel.RTP_95, new Map());
buyGameReels.get(GameRTPLevel.RTP_95).set(1, [SC, GG, HH, BB, JJ, GG, GG, HH, BB, JJ, GG, HH, HH, JJ, DD, HH, HH, FF, HH, JJ, DD, AA, GG, DD, CC, HH, BB, DD, JJ, GG, WC, JJ, CC, HH, JJ, AA, DD, BB, JJ, HH, CC, DD, HH, SC, HH, AA, HH, DD, CC, HH, HH, CC, JJ, BB, GG, FF, II, FF, FF, HH, II, II, II, GG, SC, II, II, II, II, WC, II, HH, II, II, II, II, II, II]);
buyGameReels.get(GameRTPLevel.RTP_95).set(2, [BB, JJ, GG, DD, BB, HH, HH, AA, GG, DD, HH, JJ, HH, HH, CC, WC, GG, JJ, AA, CC, HH, BB, DD, GG, JJ, HH, AA, HH, JJ, SC, DD, HH, GG, HH, CC, BB, HH, JJ, CC, SC, JJ, GG, HH, JJ, DD, HH, SC, BB, GG, DD, HH, AA, HH, JJ, DD, HH, CC, HH, SC, HH, FF, II, FF, FF, II, II, II, II, FF, II, II, II, II, II, II, FF, AA]);
buyGameReels.get(GameRTPLevel.RTP_95).set(3, [HH, GG, AA, HH, CC, HH, FF, JJ, HH, GG, DD, HH, GG, FF, AA, JJ, HH, FF, GG, CC, JJ, HH, DD, CC, HH, GG, HH, BB, AA, CC, DD, AA, GG, CC, AA, SC, BB, HH, AA, DD, JJ, HH, BB, DD, HH, GG, JJ, SC, CC, DD, BB, HH, AA, WC, DD, HH, JJ, FF, II, FF, II, II, II, II, II, II, II, II, II, II, FF, JJ, JJ, JJ, CC]);
buyGameReels.get(GameRTPLevel.RTP_95).set(4, [JJ, HH, CC, DD, AA, JJ, GG, BB, DD, JJ, HH, CC, BB, CC, GG, JJ, AA, CC, BB, GG, HH, GG, BB, HH, HH, AA, DD, JJ, HH, DD, AA, CC, BB, HH, SC, HH, HH, GG, BB, DD, AA, GG, WC, BB, CC, SC, GG, AA, BB, DD, CC, HH, JJ, DD, HH, AA, JJ, WC, WC, FF, II, II, II, II, II, JJ, HH, HH, HH, HH, FF, II]);
buyGameReels.get(GameRTPLevel.RTP_95).set(5, [HH, CC, GG, JJ, HH, DD, BB, GG, HH, HH, SC, BB, GG, AA, BB, JJ, WC, CC, BB, GG, HH, JJ, AA, BB, HH, JJ, GG, HH, CC, AA, DD, HH, HH, CC, JJ, WC, AA, BB, CC, HH, DD, JJ, HH, CC, AA, DD, GG, AA, BB, DD, HH, AA, JJ, HH, HH, BB, DD, SC, FF, II, FF, WC, WC, FF, II, II, II, II, FF, FF, SC, GG]);

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