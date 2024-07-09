const { GameRTPLevel } = require("./GameRtpLevel");
const { H1, H2, H3, H4, H5, L1, L2, L3, L4, L5, WC } = require("./GameReelSymbol").GameReelSymbol.symbols;

const freeGameReels = new Map();

freeGameReels.set(GameRTPLevel.RTP_60, new Map());
freeGameReels.get(GameRTPLevel.RTP_60).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_70, new Map());
freeGameReels.get(GameRTPLevel.RTP_70).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_80, new Map());
freeGameReels.get(GameRTPLevel.RTP_80).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_90, new Map());
freeGameReels.get(GameRTPLevel.RTP_90).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_95, new Map());
freeGameReels.get(GameRTPLevel.RTP_95).set(1, [H3, L1, L4, H2, L1, L1, H1, L2, L3, L1, H2, L2, H5, L2, H2, L4, L2, H4, L1, L2, H2, L5, L3, L4, H2, L4, L5, H1, L5, H1, L5, H1, L5, H4, L5, L5, H1, H1, H2, H3, H1, H3]);
freeGameReels.get(GameRTPLevel.RTP_95).set(2, [WC, L3, L1, H2, L2, WC, L4, H1, L1, H2, L4, H3, L1, L3, H1, H1, H2, H4, H5, L5, H3, H2, L3, H3, L3, H1, H2, H2, H1, L5, H2, L5, L5, WC, L5, L5, H1]);
freeGameReels.get(GameRTPLevel.RTP_95).set(3, [L4, L1, L2, H3, L4, WC, H5, L3, WC, L2, L1, L1, L4, WC, L3, L4, H5, H3, WC, H4, H3, H1, WC, L3, H3, H4, H1, L4, WC, L5, L1, H2]);
freeGameReels.get(GameRTPLevel.RTP_95).set(4, [H5, L4, H4, L3, L1, WC, H2, L3, WC, L2, H2, L1, L3, H3, H2, L1, L4, L2, H1, L5, WC, L2, H4, H1, L1, H2, H1, L1, H3, L4, L1, WC, H2, H3, L2, H2, H1, L5]);
freeGameReels.get(GameRTPLevel.RTP_95).set(5, [L1, L2, H3, L1, L3, WC, L2, L1, L2, L4, H2, L1, L3, L1, WC, L3, L4, L3, L1, H3, L2, H3, L3, H2, WC, H4, L3, L4, H1, WC, H1, H2, L4, H1, L3, L2, H4, L5, H5, L5, L5, L5, WC, H5]);

// Generic Random Reel Map function
function createFreeReelRandomMap(rtpLevel, randomPools) {
  switch (rtpLevel) {
    case 1:
      return createFreeReelRandomMap60(randomPools);
    case 2:
      return createFreeReelRandomMap70(randomPools);
    case 3:
      return createFreeReelRandomMap80(randomPools);
    case 4:
      return createFreeReelRandomMap90(randomPools);
    case 5:
      return createFreeReelRandomMap95(randomPools);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createReelMap(rtpLevel) {
  switch (rtpLevel) {
    case 1:
      return freeGameReels.get(GameRTPLevel.RTP_60);
    case 2:
      return freeGameReels.get(GameRTPLevel.RTP_70);
    case 3:
      return freeGameReels.get(GameRTPLevel.RTP_80);
    case 4:
      return freeGameReels.get(GameRTPLevel.RTP_90);
    case 5:
      return freeGameReels.get(GameRTPLevel.RTP_95);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createFreeReelRandomMap60(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap70(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap80(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap90(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap95(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

module.exports = {
  freeGameReels,
  createFreeReelRandomMap,
  createReelMap,
};
