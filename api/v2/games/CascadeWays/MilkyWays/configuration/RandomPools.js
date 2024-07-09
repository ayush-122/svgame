const { RtpLevel, STAR_WEIGHT_BASE, MAX_CASCADE_COUNT, STAR_WEIGHT_FREE, STAR_MULTIPLIER_MAX_WEIGHT } = require("./GameConstant");

//for base game earlier for first reel
// const rtpLength = {
//   1: [484, 331, 489, 331, 489, 326],
//   2: [484, 331, 489, 331, 489, 326],
//   3: [484, 331, 489, 331, 489, 326],
//   4: [484, 331, 489, 331, 489, 326],
//   5: [484, 331, 489, 331, 489, 326],
// };
const rtpLength = {
    1: [ 483, 330, 488, 330, 488, 325 ],
    2: [ 483, 330, 488, 330, 488, 325 ],
    3: [ 483, 330, 488, 330, 488, 325 ],
    4: [ 483, 330, 488, 330, 488, 325 ],
    5: [ 483, 330, 488, 330, 488, 325 ]
};
const rtpLengthBaseSecondReel = {
  1: [ 265, 275, 275, 275, 275, 264 ],
  2: [ 265, 275, 275, 275, 275, 264 ],
  3: [ 265, 275, 275, 275, 275, 264 ],
  4: [ 265, 275, 275, 275, 275, 264 ],
  5: [ 265, 275, 275, 275, 275, 264 ]
};

const rtpLengthFreeGame = {
    1: [ 483, 330, 488, 330, 488, 325 ],
    2: [ 483, 330, 488, 330, 488, 325 ],
    3: [ 483, 330, 488, 330, 488, 325 ],
    4: [ 483, 330, 488, 330, 488, 325 ],
    5: [ 483, 330, 488, 330, 488, 325 ]
};

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
  console.log("base pools",pools);
  return pools.flat();
};


const createFreeUnitPoolRequest = () => {
  const starMultiplierWeight = { low: 0, high: STAR_MULTIPLIER_MAX_WEIGHT };
  const starMultiplierWeightArray = [starMultiplierWeight]; 
  const freeReelWeightsArray = Array.from({ length: 6 }, (_, i) => ({
    low: 0,
    high: rtpLengthFreeGame[RtpLevel][i]
  }));

  const starOddWeights = { low: 0, high: STAR_WEIGHT_FREE };
  const starOddWeightsArray = Array.from({ length: 6 * 6 }, () => starOddWeights);

  return [...starMultiplierWeightArray, ...freeReelWeightsArray, ...starOddWeightsArray];
};
 
// Define the function to create the base game request with multiple pools concatenated
const createFreeGameRequest = () => {
  const pools = Array.from({ length: MAX_CASCADE_COUNT + 1 }, () => createFreeUnitPoolRequest());
 // Flatten the array of arrays into a single array
 console.log("free pools",pools);
  return pools.flat();
}; 
module.exports = {createBaseGameRequest,createFreeGameRequest };


 
// const base = createBaseGameRequest() ;
// console.log(base);
 
// const free = createFreeGameRequest() ;
// console.log(free);