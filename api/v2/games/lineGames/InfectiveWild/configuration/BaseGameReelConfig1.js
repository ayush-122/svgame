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

baseGameReels.set(GameRTPLevel.RTP_95,  new Map());
baseGameReels.get(GameRTPLevel.RTP_95).set(1,  [BB, JJ, GG, GG, CC, KK, HH, EE, FF, JJ, HH, KK, KK, KK, KK, EE, KK, EE, DD, GG, HH, DD, FF, SC, HH, HH, BB, KK, JJ, DD, EE, KK, II, JJ, JJ, JJ, GG, EE, HH, AA, FF, CC, HH, EE, GG, BB, CC, BB, WD, EE, BB, II, WD, AA, JJ, HH, CC, FF, FF, JJ, AA, BB, KK, GG, HH, FF, HH, KK, BB, JJ, AA, CC, HH, GG, FF, II, II, WD, BB, JJ, SC, KK, DD, DD, EE, II, HH, HH, WD, FF, JJ, EE, EE, AA, DD, KK, EE, GG, CC, JJ, HH, CC, GG, DD, KK, EE, BB, BB, FF, II, FF, II, DD, II, II, BB, JJ, SC, KK, HH, II, DD, CC, AA, CC, HH, II, AA, FF, KK, GG, II, AA, FF, CC, JJ, GG, CC, KK, JJ, GG, II, II, DD, CC, GG, GG, DD, FF, GG, KK, KK, FF, EE, JJ, AA, JJ, KK, EE, KK, JJ, FF, AA, II, JJ, II, WD, II, DD, DD, HH, GG, II]), 
baseGameReels.get(GameRTPLevel.RTP_95).set(2,  [HH, CC, HH, HH, KK, GG, KK, FF, DD, JJ, II, DD, AA, FF, KK, GG, EE, HH, BB, II, FF, DD, FF, HH, DD, HH, WD, DD, BB, GG, II, DD, EE, JJ, HH, JJ, CC, EE, FF, CC, KK, FF, WD, HH, AA, AA, KK, KK, II, II, WD, FF, JJ, GG, DD, JJ, JJ, EE, JJ, JJ, BB, BB, HH, KK, II, KK, CC, JJ, CC, AA, HH, HH, KK, II, AA, GG, CC, II, HH, JJ, CC, II, II, JJ, KK, KK, GG, WD, EE, II, HH, FF, KK, CC, GG, II, DD, BB, EE, EE, JJ, KK, BB, AA, AA, JJ, DD, GG, AA, AA, II, II, GG, II, GG, JJ, GG, GG, BB, SC, JJ, DD, FF, CC, FF, KK, CC, DD, DD, II, GG, EE, KK, CC, KK, EE, FF, HH, FF, JJ, BB, JJ, EE, FF, DD, JJ, KK, HH, II, II, EE, GG, JJ, GG, EE, WD, BB, KK, CC, FF, BB, EE, HH, KK, BB, SC, FF, HH, AA, GG, EE, KK]);
baseGameReels.get(GameRTPLevel.RTP_95).set(3,  [AA, DD, II, AA, II, JJ, FF, DD, FF, FF, HH, JJ, WD, KK, CC, AA, GG, KK, GG, JJ, GG, GG, GG, HH, KK, KK, KK, GG, KK, EE, JJ, AA, DD, HH, II, II, JJ, KK, KK, DD, II, BB, HH, DD, GG, HH, BB, AA, BB, GG, HH, BB, SC, CC, JJ, EE, BB, HH, EE, JJ, BB, EE, CC, JJ, HH, KK, AA, DD, BB, JJ, DD, II, KK, FF, HH, CC, EE, FF, FF, JJ, HH, II, WD, SC, CC, DD, JJ, HH, SC, HH, SC, GG, FF, DD, DD, II, KK, KK, FF, WD, KK, AA, FF, II, II, GG, HH, CC, BB, WD, JJ, KK, GG, JJ, FF, CC, II, KK, EE, HH, BB, SC, FF, II, AA, FF, BB, KK, DD, KK, KK, HH, GG, EE, EE, HH, II, CC, II, GG, AA, II, JJ, CC, FF, KK, FF, EE, EE, CC, HH, EE, AA, II, CC, GG, JJ, GG, GG, JJ, BB, JJ, CC, JJ, GG, BB, KK, DD, HH, EE, EE, AA, FF, II, JJ, FF, II, DD, JJ, II, WD, EE, CC, SC, DD, KK, EE]);
baseGameReels.get(GameRTPLevel.RTP_95).set(4,  [BB, DD, CC, GG, JJ, FF, KK, HH, HH, EE, II, WD, KK, EE, HH, JJ, GG, WD, HH, EE, EE, HH, HH, GG, DD, HH, AA, DD, CC, SC, KK, DD, JJ, GG, HH, AA, DD, JJ, BB, HH, GG, KK, KK, EE, FF, AA, AA, JJ, FF, II, HH, WD, GG, II, FF, JJ, DD, JJ, CC, BB, EE, II, BB, JJ, CC, DD, FF, KK, II, KK, KK, II, II, HH, FF, DD, JJ, EE, JJ, DD, CC, EE, HH, II, BB, CC, SC, II, JJ, JJ, AA, EE, EE, BB, CC, KK, CC, BB, GG, KK, II, KK, FF, FF, FF, FF, II, CC, KK, BB, BB, BB, GG, KK, CC, AA, GG, BB, KK, GG, GG, II, DD, HH, GG, II, JJ, FF, EE, KK, JJ, EE, JJ, FF, KK, DD, FF, AA, KK, HH, GG, DD, AA, KK, WD, JJ, JJ, WD, HH, JJ, JJ, GG, CC, FF, II, AA, II, HH, EE, KK, II, DD, AA, CC, II, FF, GG, II, KK, EE, HH, GG]);
baseGameReels.get(GameRTPLevel.RTP_95).set(5,  [II, KK, FF, DD, II, GG, FF, KK, II, HH, BB, SC, GG, KK, HH, JJ, HH, KK, FF, EE, HH, KK, EE, JJ, HH, DD, FF, HH, AA, GG, GG, JJ, KK, FF, KK, CC, AA, II, GG, FF, HH, EE, II, WD, BB, EE, HH, KK, AA, JJ, CC, AA, DD, SC, CC, CC, KK, KK, DD, KK, GG, KK, GG, EE, CC, BB, DD, KK, BB, JJ, HH, BB, II, FF, BB, JJ, WD, HH, JJ, EE, WD, II, BB, II, II, HH, HH, WD, JJ, JJ, EE, EE, AA, DD, EE, DD, GG, GG, HH, BB, KK, FF, BB, KK, DD, JJ, KK, FF, II, GG, DD, JJ, JJ, II, II, FF, KK, BB, HH, CC, II, II, SC, JJ, CC, WD, JJ, KK, II, HH, CC, FF, EE, CC, BB, AA, AA, GG, GG, JJ, CC, GG, EE, KK, CC, DD, EE, EE, GG, DD, JJ, DD, AA, KK, HH, AA, HH, GG, GG, II, DD, EE, FF, FF, JJ, JJ, FF, CC, JJ, II, II, FF, AA]);

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
