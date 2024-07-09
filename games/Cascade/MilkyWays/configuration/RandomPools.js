const { RtpLevel, STAR_WEIGHT_BASE, MAX_CASCADE_COUNT, STAR_WEIGHT_FREE } = require("./GameConstant");

const rtpLength = {
  1: [484, 331, 489, 331, 489, 326],
  2: [484, 331, 489, 331, 489, 326],
  3: [484, 331, 489, 331, 489, 326],
  4: [484, 331, 489, 331, 489, 326],
  5: [484, 331, 489, 331, 489, 326],
};

const rtpLengthFreeGame = {
  1: [46, 45, 41, 45, 44, 44],
  2: [41, 38, 37, 40, 37, 37],
  3: [40, 46, 47, 45, 44, 44],
  4: [47, 47, 45, 52, 47, 47],
  5: [43, 45, 45, 44, 44, 44],
  6: [43, 45, 45, 44, 44, 44],
};

// const baseGameRequest = [
//   { low: 0, high: 100 }, // base_reel_weight 
//   { low: 0, high: rtpLength[RtpLevel][0] }, // base reel 1
//   { low: 0, high: rtpLength[RtpLevel][1] }, //  base reel 2
//   { low: 0, high: rtpLength[RtpLevel][2] }, // base reel 3
//   { low: 0, high: rtpLength[RtpLevel][3] }, // base reel 4
//   { low: 0, high: rtpLength[RtpLevel][4] }, //base reel 5
//   { low: 0, high: rtpLength[RtpLevel][5] }, //base reel 6
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 1
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 2
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 3
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 4
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 5
//   { low: 0, high: STAR_WEIGHT_BASE }, //star odd  6
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 1
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 2
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 3
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 4
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 5
//   { low: 0, high: STAR_WEIGHT_BASE }, //star odd  6
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 1
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 2
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 3
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 4
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 5
//   { low: 0, high: STAR_WEIGHT_BASE }, //star odd  6
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 1
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 2
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 3
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 4
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 5
//   { low: 0, high: STAR_WEIGHT_BASE }, //star odd  6
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 1
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 2
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 3
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 4
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 5
//   { low: 0, high: STAR_WEIGHT_BASE }, //star odd  6
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 1
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 2
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 3
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 4
//   { low: 0, high: STAR_WEIGHT_BASE }, // star odd 5
//   { low: 0, high: STAR_WEIGHT_BASE }, //star odd  6
// ];

// const freeGameRequest = [
//   { low: 0, high: rtpLengthFreeGame[RtpLevel][0] },
//   { low: 0, high: rtpLengthFreeGame[RtpLevel][1] },
//   { low: 0, high: rtpLengthFreeGame[RtpLevel][2] },
//   { low: 0, high: rtpLengthFreeGame[RtpLevel][3] },
//   { low: 0, high: rtpLengthFreeGame[RtpLevel][4] },
//   { low: 0, high: rtpLengthFreeGame[RtpLevel][5] },
//   { low: 0, high: 100 }, //TODO - Add Feature Stop
// ];

const createBaseUnitPoolRequest = (isFirst) => {
  const baseReelWeights = { low: 0, high: 100 };
  const baseReelWeightsArray = Array.from({ length: 6 }, (_, i) => ({
    low: 0,
    high: rtpLength[RtpLevel][i]
  }));

  const starOddWeights = { low: 0, high: STAR_WEIGHT_BASE };
  const starOddWeightsArray = Array.from({ length: 6 * 6 }, () => starOddWeights);

  // Conditionally include baseReelWeights if isFirst is true
  const result = isFirst ? [baseReelWeights] : [];

   return [...result, ...baseReelWeightsArray, ...starOddWeightsArray];
};
 
// Define the function to create the base game request with multiple pools concatenated
const createBaseGameRequest = () => {
  const pools = Array.from({ length: MAX_CASCADE_COUNT + 1 }, (_,i) => createBaseUnitPoolRequest(i==0));

  // Flatten the array of arrays into a single array
  return pools.flat();
};


const createFreeUnitPoolRequest = ( ) => {
   
  const freeReelWeightsArray = Array.from({ length: 6 }, (_, i) => ({
    low: 0,
    high: rtpLengthFreeGame[RtpLevel][i]
  }));

  const starOddWeights = { low: 0, high: STAR_WEIGHT_FREE };
  const starOddWeightsArray = Array.from({ length: 6 * 6 }, () => starOddWeights);

  return [...freeReelWeightsArray, ...starOddWeightsArray];
};
 
// Define the function to create the base game request with multiple pools concatenated
const createFreeGameRequest = () => {
  const pools = Array.from({ length: MAX_CASCADE_COUNT + 1 }, () => createFreeUnitPoolRequest());
 // Flatten the array of arrays into a single array
  return pools.flat();
}; 
module.exports = {createBaseGameRequest,createFreeGameRequest };
