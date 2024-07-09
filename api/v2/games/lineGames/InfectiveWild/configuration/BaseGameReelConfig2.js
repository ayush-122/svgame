const { GameRTPLevel } = require("./GameRtpLevel");
const { WD, AA, BB, CC, DD, EE, FF, GG, HH, II, JJ, KK, SC} = require("./GameReelSymbol").GameReelSymbol.symbols;

let baseGameReels = new Map();

baseGameReels.set(GameRTPLevel.RTP_60, new Map());
baseGameReels.get(GameRTPLevel.RTP_60).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_60).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_70, new Map());
baseGameReels.get(GameRTPLevel.RTP_70).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_70).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_80, new Map());
baseGameReels.get(GameRTPLevel.RTP_80).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_80).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_90, new Map());
baseGameReels.get(GameRTPLevel.RTP_90).set(1, []),
baseGameReels.get(GameRTPLevel.RTP_90).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_95, new Map());
baseGameReels.get(GameRTPLevel.RTP_95).set(1,  [JJ, JJ, JJ, HH, HH, HH, HH, HH, HH, II, II, II, HH, HH, HH, FF, FF, FF, JJ, JJ, JJ, JJ, JJ, JJ, BB, BB, BB, DD, DD, DD, JJ, JJ, JJ, FF, FF, FF, HH, HH, HH, FF, FF, FF, BB, BB, BB, DD, DD, DD, KK, KK, KK, FF, FF, FF, JJ, JJ, JJ, BB, BB, BB, HH, HH, HH, DD, DD, DD, FF, FF, FF, HH, HH, HH, BB, BB, BB, DD, DD, DD, JJ, JJ, JJ, JJ, JJ, JJ, FF, FF, FF, AA, AA, AA, JJ, JJ, JJ, DD, DD, DD, HH, HH, HH, JJ, JJ, JJ, CC, CC, CC, FF, FF, FF, JJ, JJ, JJ, DD, DD, DD, HH, HH, HH, HH, HH, HH, FF, FF, FF, HH, HH, HH, JJ, JJ, JJ, DD, DD, DD, DD, DD, DD, FF, FF, FF, FF, FF, FF, BB, BB, BB, JJ, JJ, JJ, DD, DD, DD, HH, HH, HH, FF, FF, FF, DD, DD, DD, BB, BB, BB, JJ, JJ, JJ, HH, HH, HH, JJ, JJ, JJ, FF, FF, FF, DD, DD, DD, FF, FF, FF, HH, HH, HH, DD, DD, DD, BB, BB, BB, JJ, JJ, JJ, FF, FF, FF, HH, HH, HH, JJ, JJ, JJ, DD, DD, DD, DD, DD, DD, HH, HH, HH, FF, FF, FF, BB, BB, BB, JJ, JJ, JJ, GG, GG, GG, BB, BB, BB, BB, BB, BB, HH, HH, HH, JJ, JJ, JJ, EE, EE, EE, FF, FF, FF, BB, BB, BB, HH, HH, HH, JJ, JJ, JJ, DD, DD, DD, FF, FF, FF]), 
baseGameReels.get(GameRTPLevel.RTP_95).set(2,  [CC, CC, CC, GG, GG, GG, KK, KK, KK, II, II, II, KK, KK, KK, AA, AA, AA, DD, DD, DD, CC, CC, CC, KK, KK, KK, II, II, II, GG, GG, GG, II, II, II, CC, CC, CC, II, II, II, EE, EE, EE, KK, KK, KK, GG, GG, GG, GG, GG, GG, II, II, II, II, II, II, II, II, II, EE, EE, EE, CC, CC, CC, GG, GG, GG, II, II, II, KK, KK, KK, KK, KK, KK, KK, KK, KK, GG, GG, GG, KK, KK, KK, II, II, II, II, II, II, CC, CC, CC, II, II, II, GG, GG, GG, KK, KK, KK, KK, KK, KK, CC, CC, CC, AA, AA, AA, GG, GG, GG, II, II, II, EE, EE, EE, II, II, II, EE, EE, EE, HH, HH, HH, KK, KK, KK, GG, GG, GG, AA, AA, AA, AA, AA, AA, EE, EE, EE, II, II, II, GG, GG, GG, EE, EE, EE, KK, KK, KK, KK, KK, KK, EE, EE, EE, AA, AA, AA, EE, EE, EE, CC, CC, CC, KK, KK, KK, II, II, II, GG, GG, GG, CC, CC, CC, EE, EE, EE, AA, AA, AA, II, II, II, GG, GG, GG, KK, KK, KK, CC, CC, CC, AA, AA, AA, EE, EE, EE, JJ, JJ, JJ, GG, GG, GG, KK, KK, KK, AA, AA, AA, EE, EE, EE, II, II, II, BB, BB, BB, KK, KK, KK, KK, KK, KK, EE, EE, EE, CC, CC, CC, AA, AA, AA, II, II, II, EE, EE, EE, GG, GG, GG, GG, GG, GG, CC, CC, CC, GG, GG, GG, KK, KK, KK, AA, AA, AA, FF, FF, FF, CC, CC, CC, EE, EE, EE, KK, KK, KK, AA, AA, AA, II, II, II, DD, DD, DD, GG, GG, GG]);
baseGameReels.get(GameRTPLevel.RTP_95).set(3,  [JJ, JJ, JJ, HH, HH, HH, HH, HH, HH, AA, AA, AA, CC, CC, CC, JJ, JJ, JJ, FF, FF, FF, FF, FF, FF, DD, DD, DD, BB, BB, BB, HH, HH, HH, DD, DD, DD, II, II, II, JJ, JJ, JJ, HH, HH, HH, FF, FF, FF, JJ, JJ, JJ, DD, DD, DD, BB, BB, BB, HH, HH, HH, FF, FF, FF, BB, BB, BB, JJ, JJ, JJ, JJ, JJ, JJ, KK, KK, KK, JJ, JJ, JJ, DD, DD, DD, FF, FF, FF, FF, FF, FF, HH, HH, HH, FF, FF, FF, JJ, JJ, JJ, DD, DD, DD, HH, HH, HH, JJ, JJ, JJ, JJ, JJ, JJ, FF, FF, FF, HH, HH, HH, BB, BB, BB, FF, FF, FF, HH, HH, HH, JJ, JJ, JJ, DD, DD, DD, JJ, JJ, JJ, DD, DD, DD, FF, FF, FF, HH, HH, HH, GG, GG, GG, DD, DD, DD, HH, HH, HH, JJ, JJ, JJ, FF, FF, FF, DD, DD, DD, BB, BB, BB, JJ, JJ, JJ, BB, BB, BB, HH, HH, HH, JJ, JJ, JJ, FF, FF, FF, DD, DD, DD, HH, HH, HH, HH, HH, HH, BB, BB, BB, DD, DD, DD, JJ, JJ, JJ, JJ, JJ, JJ, HH, HH, HH, FF, FF, FF, FF, FF, FF, DD, DD, DD, DD, DD, DD, BB, BB, BB, BB, BB, BB, FF, FF, FF, EE, EE, EE, JJ, JJ, JJ, HH, HH, HH, HH, HH, HH, BB, BB, BB, DD, DD, DD, JJ, JJ, JJ, HH, HH, HH, CC, CC, CC, BB, BB, BB, DD, DD, DD]);
baseGameReels.get(GameRTPLevel.RTP_95).set(4,  [JJ, JJ, JJ, KK, KK, KK, II, II, II, BB, BB, BB, GG, GG, GG, CC, CC, CC, II, II, II, GG, GG, GG, II, II, II, KK, KK, KK, CC, CC, CC, KK, KK, KK, GG, GG, GG, GG, GG, GG, CC, CC, CC, KK, KK, KK, CC, CC, CC, KK, KK, KK, II, II, II, GG, GG, GG, II, II, II, HH, HH, HH, CC, CC, CC, EE, EE, EE, GG, GG, GG, AA, AA, AA, II, II, II, II, II, II, KK, KK, KK, EE, EE, EE, GG, GG, GG, II, II, II, CC, CC, CC, AA, AA, AA, EE, EE, EE, GG, GG, GG, KK, KK, KK, II, II, II, KK, KK, KK, AA, AA, AA, CC, CC, CC, II, II, II, II, II, II, KK, KK, KK, AA, AA, AA, GG, GG, GG, GG, GG, GG, EE, EE, EE, II, II, II, II, II, II, KK, KK, KK, GG, GG, GG, KK, KK, KK, KK, KK, KK, CC, CC, CC, II, II, II, EE, EE, EE, EE, EE, EE, KK, KK, KK, EE, EE, EE, GG, GG, GG, II, II, II, CC, CC, CC, KK, KK, KK, FF, FF, FF, EE, EE, EE, GG, GG, GG, EE, EE, EE, AA, AA, AA, KK, KK, KK, CC, CC, CC, GG, GG, GG, EE, EE, EE, KK, KK, KK, CC, CC, CC, AA, AA, AA, KK, KK, KK, II, II, II, EE, EE, EE, II, II, II, II, II, II, AA, AA, AA, GG, GG, GG, EE, EE, EE, II, II, II, DD, DD, DD, CC, CC, CC, AA, AA, AA, EE, EE, EE, KK, KK, KK, KK, KK, KK, GG, GG, GG, AA, AA, AA, II, II, II, EE, EE, EE, KK, KK, KK, GG, GG, GG, AA, AA, AA, II, II, II]);
baseGameReels.get(GameRTPLevel.RTP_95).set(5,  [BB, BB, BB, HH, HH, HH, FF, FF, FF, EE, EE, EE, JJ, JJ, JJ, HH, HH, HH, II, II, II, JJ, JJ, JJ, FF, FF, FF, JJ, JJ, JJ, HH, HH, HH, HH, HH, HH, DD, DD, DD, BB, BB, BB, FF, FF, FF, JJ, JJ, JJ, JJ, JJ, JJ, DD, DD, DD, HH, HH, HH, FF, FF, FF, DD, DD, DD, BB, BB, BB, HH, HH, HH, JJ, JJ, JJ, FF, FF, FF, JJ, JJ, JJ, DD, DD, DD, HH, HH, HH, KK, KK, KK, JJ, JJ, JJ, BB, BB, BB, DD, DD, DD, FF, FF, FF, HH, HH, HH, DD, DD, DD, JJ, JJ, JJ, DD, DD, DD, HH, HH, HH, BB, BB, BB, FF, FF, FF, HH, HH, HH, JJ, JJ, JJ, BB, BB, BB, FF, FF, FF, FF, FF, FF, BB, BB, BB, CC, CC, CC, JJ, JJ, JJ, HH, HH, HH, HH, HH, HH, FF, FF, FF, JJ, JJ, JJ, FF, FF, FF, BB, BB, BB, DD, DD, DD, HH, HH, HH, JJ, JJ, JJ, HH, HH, HH, HH, HH, HH, JJ, JJ, JJ, JJ, JJ, JJ, DD, DD, DD, DD, DD, DD, BB, BB, BB, FF, FF, FF, GG, GG, GG, JJ, JJ, JJ, FF, FF, FF, BB, BB, BB, DD, DD, DD, HH, HH, HH, FF, FF, FF, JJ, JJ, JJ, BB, BB, BB, FF, FF, FF, DD, DD, DD, HH, HH, HH, JJ, JJ, JJ, AA, AA, AA, FF, FF, FF, DD, DD, DD, HH, HH, HH, JJ, JJ, JJ, BB, BB, BB, FF, FF, FF]);

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
      return baseGameReels.get(GameRTPLevel.RTP_80);
    case 4:
      return baseGameReels.get(GameRTPLevel.RTP_90);
    case 5:
      return baseGameReels.get(GameRTPLevel.RTP_95);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

// function getBonusEndPoints(rtpLevel){
//   const output = ()=>{
//     console.log(rtp : ,rtpLevel)
//     let map = baseGameReels.get(GameRTPLevel.RTP_60);
//     let bonusFirstsList = [];
//     let count = 0 ;
//     map.forEach(list => {
//       const firstOccurrenceIndex = list.findIndex(element => element === BO);
//       if (firstOccurrenceIndex !== -1) {
//         // If 'BN' is found in the list, add it to the firstOccurrencesList
//         bonusFirstsList.push({
//           index  : count ++,
//           firstOccurrenceIndex: firstOccurrenceIndex,
//         });
//       }
//     });
//     console.log(bonus reel endpoints : ,bonusFirstsList); //20 64 57 21 0
//   }
//   output();

//  }

// getBonusEndPoints(GameRTPLevel.RTP_60);

module.exports = {
  baseGameReels,
  createReelRandomMap,
  createReelMap,
};
