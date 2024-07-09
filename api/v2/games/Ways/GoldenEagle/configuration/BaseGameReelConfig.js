const { GameRTPLevel } = require("./GameRtpLevel");
const {H1, H2, H3, H4, H5, L1, L2, L3, L4, L5, SC, WC, BO} = require("./GameReelSymbol").GameReelSymbol.symbols;

let baseGameReels = new Map();

baseGameReels.set(GameRTPLevel.RTP_60,  new Map());
baseGameReels.get(GameRTPLevel.RTP_60).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, BO, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]), 
baseGameReels.get(GameRTPLevel.RTP_60).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, BO, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
baseGameReels.get(GameRTPLevel.RTP_60).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, BO, H5, L5, H5, BO, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
baseGameReels.get(GameRTPLevel.RTP_60).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, BO, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, BO, L4, L4, L4, L4, H5, L5]);
baseGameReels.get(GameRTPLevel.RTP_60).set(5, [BO, L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

baseGameReels.set(GameRTPLevel.RTP_70,  new Map());
baseGameReels.get(GameRTPLevel.RTP_70).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, BO, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]), 
baseGameReels.get(GameRTPLevel.RTP_70).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, BO, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
baseGameReels.get(GameRTPLevel.RTP_70).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, BO, H5, L5, H5, BO, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
baseGameReels.get(GameRTPLevel.RTP_70).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, BO, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, BO, L4, L4, L4, L4, H5, L5]);
baseGameReels.get(GameRTPLevel.RTP_70).set(5, [BO, L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

baseGameReels.set(GameRTPLevel.RTP_80,  new Map());
baseGameReels.get(GameRTPLevel.RTP_80).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, BO, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]), 
baseGameReels.get(GameRTPLevel.RTP_80).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, BO, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
baseGameReels.get(GameRTPLevel.RTP_80).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, BO, H5, L5, H5, BO, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
baseGameReels.get(GameRTPLevel.RTP_80).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, BO, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, BO, L4, L4, L4, L4, H5, L5]);
baseGameReels.get(GameRTPLevel.RTP_80).set(5, [BO, L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

baseGameReels.set(GameRTPLevel.RTP_90,  new Map());
baseGameReels.get(GameRTPLevel.RTP_90).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, BO, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]), 
baseGameReels.get(GameRTPLevel.RTP_90).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, BO, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
baseGameReels.get(GameRTPLevel.RTP_90).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, BO, H5, L5, H5, BO, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
baseGameReels.get(GameRTPLevel.RTP_90).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, BO, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, BO, L4, L4, L4, L4, H5, L5]);
baseGameReels.get(GameRTPLevel.RTP_90).set(5, [BO, L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

baseGameReels.set(GameRTPLevel.RTP_95,  new Map());
baseGameReels.get(GameRTPLevel.RTP_95).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L3, L1, L4, L2, L3, H4, L2, L4, H5, L4, L3, BO, H4, H1, L1, H4, H3, L2, H2, H4, L3, L1, WC, L3, H3, L4, L3, H1, H4, H2, L3, L4, H3, H4, L4, SC, L2, H1, L4, H4, H3, L4, L2, H3, L3, H2, L1, H5, L5, H5, H5, L4, L5, L5, L5, L1, SC, L5, L5, L5, L5, WC, L5, L2, L5, L5, L5, L5, L5, L5]), 
baseGameReels.get(GameRTPLevel.RTP_95).set(2, [H2, L3, L1, H4, H2, L2, L4, H1, L1, H4, L2, L3, L2, L4, H3, WC, L1, L3, H1, H3, L2, H2, H4, L1, L3, L4, H1, L2, L3, SC, H4, L4, L1, L2, H3, H2, L4, L3, H3, SC, L3, L1, L2, L3, H4, L4, SC, H2, L1, H4, L4, H1, L2, L3, H4, L4, H3, L2, SC, L4, H5, L5, H5, H5, BO, L5, L5, L5, L5, H5, L5, L5, L5, L5, L5, L5, H5, H1]);
baseGameReels.get(GameRTPLevel.RTP_95).set(3, [L4, L1, H1, L2, H3, L4, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, L3, L4, H4, H3, L4, L1, L2, H2, H1, H3, H4, H1, L1, H3, H1, SC, H2, L2, H1, H4, L3, L4, H2, H4, L2, L1, L3, SC, H3, H4, H2, L2, H1, WC, H4, L4, L3, BO, H5, L5, H5, BO, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, H5, L3, L3, L3, H3]);
baseGameReels.get(GameRTPLevel.RTP_95).set(4, [L3, L4, H3, H4, H1, L3, L1, H2, H4, L3, L2, H3, H2, H3, L1, L3, H1, H3, H2, L1, L4, BO, L1, H2, L2, L4, H1, H4, L3, L2, H4, H1, H3, H2, L2, SC, L4, L2, L1, H2, H4, H1, L1, WC, H2, H3, SC, L1, H1, H2, H4, H3, L2, L3, H4, L4, H1, L3, WC, WC, H5, L5, L5, L5, L5, L5, L3, BO, L4, L4, L4, L4, H5, L5]);
baseGameReels.get(GameRTPLevel.RTP_95).set(5, [BO, L2, H3, L1, L3, L2, H4, H2, L1, L2, L4, SC, H2, L1, H1, H2, L3, H3, H2, L1, L4, L3, H1, H2, L4, L3, L1, L2, H3, H1, H4, L4, L2, H3, L3, H1, H2, H3, L2, H4, L3, L4, H3, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, H5, L5, L5, L5, L5, H5, H5, SC, L1]);

function createReelRandomMap60(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap70(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap80(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap90(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap95(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap(rtpLevel, randomPools) {
  switch (rtpLevel) {
    case 1:
      return createReelRandomMap60(randomPools);
    case 2:
      return createReelRandomMap70(randomPools);
    case 3:
      return createReelRandomMap80(randomPools);
    case 4:
      return createReelRandomMap90(randomPools);
    case 5:
      return createReelRandomMap95(randomPools);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createReelMap(rtpLevel) {
  
  switch (rtpLevel) {
    case 1:
      return baseGameReels.get(GameRTPLevel.RTP_60);
    case 2:
      return baseGameReels.get(GameRTPLevel.RTP_70);
    case 3:
      return baseGameReels.get(GameRTPLevel.RTP_80)
    case 4:
      return baseGameReels.get(GameRTPLevel.RTP_90)
    case 5:
      return baseGameReels.get(GameRTPLevel.RTP_95)
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}
 
module.exports = {
  baseGameReels, 
  createReelRandomMap, 
  createReelMap
};