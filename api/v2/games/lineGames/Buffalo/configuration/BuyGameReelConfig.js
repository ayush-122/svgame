const { GameRTPLevel } = require("./GameRtpLevel");
const {H1,H2,H3,H4,H5,L1,L2,L3,L4,L5,SC,WC} = require("./GameReelSymbol").GameReelSymbol.symbols;

const name = "buy";

let buyGameReels = new Map();

buyGameReels.set(GameRTPLevel.RTP_60, new Map());
buyGameReels.get(GameRTPLevel.RTP_60).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]);
buyGameReels.get(GameRTPLevel.RTP_60).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
buyGameReels.get(GameRTPLevel.RTP_60).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, H5, L5, H5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
buyGameReels.get(GameRTPLevel.RTP_60).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, L4, L4, L4, L4, H5, L5]);
buyGameReels.get(GameRTPLevel.RTP_60).set(5, [L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, WC, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, WC, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, WC, WC, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

buyGameReels.set(GameRTPLevel.RTP_70, new Map());
buyGameReels.get(GameRTPLevel.RTP_70).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]);
buyGameReels.get(GameRTPLevel.RTP_70).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
buyGameReels.get(GameRTPLevel.RTP_70).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, H5, L5, H5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
buyGameReels.get(GameRTPLevel.RTP_70).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, L4, L4, L4, L4, H5, L5]);
buyGameReels.get(GameRTPLevel.RTP_70).set(5, [L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, WC, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, WC, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, WC, WC, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

buyGameReels.set(GameRTPLevel.RTP_80, new Map());
buyGameReels.get(GameRTPLevel.RTP_80).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]);
buyGameReels.get(GameRTPLevel.RTP_80).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
buyGameReels.get(GameRTPLevel.RTP_80).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, H5, L5, H5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
buyGameReels.get(GameRTPLevel.RTP_80).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, L4, L4, L4, L4, H5, L5]);
buyGameReels.get(GameRTPLevel.RTP_80).set(5, [L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, WC, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, WC, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, WC, WC, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

buyGameReels.set(GameRTPLevel.RTP_90, new Map());
buyGameReels.get(GameRTPLevel.RTP_90).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]);
buyGameReels.get(GameRTPLevel.RTP_90).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
buyGameReels.get(GameRTPLevel.RTP_90).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, H5, L5, H5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
buyGameReels.get(GameRTPLevel.RTP_90).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, L4, L4, L4, L4, H5, L5]);
buyGameReels.get(GameRTPLevel.RTP_90).set(5, [L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, WC, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, WC, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, WC, WC, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

buyGameReels.set(GameRTPLevel.RTP_95, new Map());
buyGameReels.get(GameRTPLevel.RTP_95).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]);
buyGameReels.get(GameRTPLevel.RTP_95).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
buyGameReels.get(GameRTPLevel.RTP_95).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, H5, L5, H5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
buyGameReels.get(GameRTPLevel.RTP_95).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, L4, L4, L4, L4, H5, L5]);
buyGameReels.get(GameRTPLevel.RTP_95).set(5, [L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, WC, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, WC, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, WC, WC, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

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