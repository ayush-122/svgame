const { GameRTPLevel } = require("./GameRtpLevel");
const { WD, AA, BB, CC, DD, EE, FF, GG, HH, II, JJ, KK, SC} = require("./GameReelSymbol").GameReelSymbol.symbols;

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
freeGameReels.get(GameRTPLevel.RTP_95).set(1, [CC, BB, EE, BB, DD, EE, BB, EE, DD, DD, DD, CC, BB, BB, AA, CC, AA, CC, BB, AA, BB, EE, EE, AA, EE, CC, EE, DD, DD, CC, EE, AA, CC, CC, EE, BB, AA, EE, CC, AA, EE, BB, EE, CC, AA, EE, DD, CC, DD, DD, DD, BB, DD, DD, BB, CC, CC, EE, EE, CC, BB, EE, EE, EE, EE, CC, DD, EE, CC, AA, DD, EE, DD, AA, DD, EE, BB, DD, DD, DD]);
freeGameReels.get(GameRTPLevel.RTP_95).set(2, [BB, AA, BB, CC, BB, DD, DD, EE, EE, DD, AA, DD, EE, BB, DD, EE, EE, DD, DD, BB, EE, DD, DD, EE, CC, EE, CC, EE, AA, CC, DD, BB, EE, EE, DD, DD, BB, EE, AA, DD, AA, EE, CC, DD, BB, CC, AA, BB, CC, CC, DD, EE, CC, CC, BB, EE, AA, CC, BB, EE, EE, EE, BB, AA, BB, CC, CC, CC, EE, CC, DD, CC, EE, DD, AA, EE, EE, DD, DD, AA]);
freeGameReels.get(GameRTPLevel.RTP_95).set(3, [EE, DD, EE, AA, CC, BB, AA, EE, EE, BB, DD, AA, DD, EE, CC, CC, CC, EE, AA, EE, EE, DD, DD, BB, CC, CC, CC, DD, DD, EE, DD, DD, DD, BB, DD, DD, EE, EE, BB, EE, CC, CC, EE, CC, EE, EE, DD, DD, BB, AA, EE, DD, BB, EE, AA, BB, EE, DD, AA, DD, EE, CC, AA, CC, BB, EE, DD, DD, EE, BB, CC, AA, CC, BB, CC, BB, BB, EE, CC, AA]);
freeGameReels.get(GameRTPLevel.RTP_95).set(4, [EE, DD, EE, BB, CC, BB, EE, AA, EE, EE, DD, DD, CC, BB, EE, EE, BB, EE, CC, AA, CC, DD, DD, AA, EE, BB, DD, CC, CC, CC, DD, DD, BB, EE, DD, EE, EE, CC, BB, DD, EE, EE, EE, AA, AA, DD, EE, EE, DD, BB, BB, BB, EE, BB, CC, DD, DD, EE, CC, CC, AA, DD, EE, AA, DD, EE, CC, EE, DD, CC, BB, DD, CC, DD, AA, BB, AA, AA, CC, CC]);
freeGameReels.get(GameRTPLevel.RTP_95).set(5, [CC, BB, AA, EE, EE, DD, DD, DD, DD, BB, CC, CC, DD, DD, AA, AA, EE, EE, EE, EE, EE, EE, EE, EE, BB, EE, CC, DD, AA, DD, EE, AA, CC, BB, EE, DD, EE, AA, DD, CC, DD, DD, CC, BB, EE, CC, AA, BB, AA, DD, EE, DD, BB, EE, DD, CC, DD, BB, EE, CC, DD, BB, CC, BB, DD, BB, CC, EE, EE, CC, EE, DD, BB, AA, CC, CC, EE, BB, AA, CC]);

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
