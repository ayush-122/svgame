const { GameRTPLevel } = require("./GameRtpLevel");
const {H1, H2, H3, H4, H5, L1, L2, L3, L4, L5, SC, WC, BO} = require("./GameReelSymbol").GameReelSymbol.symbols;

let baseGameReels = new Map();

baseGameReels.set(GameRTPLevel.RTP_60,  new Map());
baseGameReels.get(GameRTPLevel.RTP_60).set(1, []), 
baseGameReels.get(GameRTPLevel.RTP_60).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_60).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_70,  new Map());
baseGameReels.get(GameRTPLevel.RTP_70).set(1, []), 
baseGameReels.get(GameRTPLevel.RTP_70).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_70).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_80,  new Map());
baseGameReels.get(GameRTPLevel.RTP_80).set(1, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_80).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_90,  new Map());
baseGameReels.get(GameRTPLevel.RTP_90).set(1, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(2, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(3, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(4, []);
baseGameReels.get(GameRTPLevel.RTP_90).set(5, []);

baseGameReels.set(GameRTPLevel.RTP_95, new Map());
baseGameReels.get(GameRTPLevel.RTP_95).set(1, [SC, L1, L4, H2, L3, L1, L1, L2, H2, L4, L2, L3, H4, L2, H3, H5, L4, L3, H1, L2, L3, L3, L4, L3, L3, H4, SC, L2, L4, L2, L3, L5, L4, L5, L5, SC, L1, L1, L5, L5, L2, H5, L1, L1, L5, L5, L3, L3, L3, L3, L3, L3, L3, L3, L3, L3, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L3, L5, L3, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L3, L5, L4, L3, L3]);
baseGameReels.get(GameRTPLevel.RTP_95).set(2, [H2, L3, L1, H4, L2, WC, L4, H4, L1, BO, L2, L3, L2, WC, L1, L3, H1, L1, L3, BO, L3, H3, H4, L1, SC, H3, L3, H3, SC, H1, L1, L2, L3, SC, H2, H4, L2, L3, L4, H3, L2, SC, H5, L5, H5, H5, L5, L2, L5, H5, L1, L1, BO, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2, L2]);
baseGameReels.get(GameRTPLevel.RTP_95).set(3, [L4, L1, H1, BO, H3, L4, BO, H5, L3, L2, L1, H4, L4, L1, H5, H1, L3, L4, H5, L1, H3, WC, L4, H4, H3, L4, L1, H3, BO, L1, H3, SC, H2, H4, H4, L2, L1, SC, H3, H4, H2, WC, H5, L5, H5, L5, BO, L5, L5, L5, L5, L5, H5, H1, L1, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4, L4]);
baseGameReels.get(GameRTPLevel.RTP_95).set(4, [L3, L4, H3, H4, H1, L3, WC, L1, H2, H4, L3, L2, H3, BO, L1, L4, H1, H3, L1, BO, L1, H2, L2, L4, H4, L3, L2, H4, H3, L2, SC, L4, L2, L1, H4, H1, L1, WC, H2, H3, SC, L1, H4, H3, L2, L3, H4, L3, BO, H5, L5, L5, L5, L5, BO, L3, H5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5]);
baseGameReels.get(GameRTPLevel.RTP_95).set(5, [L2, H3, L1, L3, L2, H4, WC, H2, L1, L2, L4, SC, H2, L1, H1, L3, WC, H3, H2, L1, WC, L4, L3, H1, H2, L4, L3, L1, L2, H3, H4, L4, L2, H3, L3, H1, H2, H3, L2, H4, L3, L4, H1, H4, L1, H1, H2, H4, L4, H1, L3, L2, L4, H2, H4, SC, H5, L5, H5, L3, H5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5, L5]);

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



// function getBonusEndPoints(rtpLevel){
//   const output = ()=>{
//     console.log(rtp : , rtpLevel)
//     let map = baseGameReels.get(GameRTPLevel.RTP_60);
//     let bonusFirstsList = [];
//     let count = 0 ;
//     map.forEach(list => {
//       const firstOccurrenceIndex = list.findIndex(element => element === BO);
//       if (firstOccurrenceIndex !== -1) {
//         // If 'BN' is found in the list,  add it to the firstOccurrencesList
//         bonusFirstsList.push({
//           index  : count ++, 
//           firstOccurrenceIndex: firstOccurrenceIndex, 
//         });
//       }
//     });
//     console.log(bonus reel endpoints : , bonusFirstsList); //20 64 57 21 0
//   } 
//   output();

//  }

// getBonusEndPoints(GameRTPLevel.RTP_60);
 
module.exports = {
  baseGameReels, 
  createReelRandomMap, 
  createReelMap
};