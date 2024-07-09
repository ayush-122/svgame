const { MAX_MULTIPLIER } = require("./GameConstant");

const paylines = [
    [1, 1, 1, 1, 1], //1
    [0, 0, 0, 0, 0], //2
    [2, 2, 2, 2, 2], //3
    [0, 1, 2, 1, 0], //4
    [2, 1, 0, 1, 2], //5
    [1, 2, 2, 2, 1], //6
    [1, 0, 0, 0, 1], //7
    [2, 1, 1, 1, 2], //8
    [0, 1, 1, 1, 0], //9
    [1, 0, 1, 0, 1], //10
    [1, 2, 1, 2, 1], //11
    [0, 2, 0, 2, 0], //12
    [2, 0, 2, 0, 2], //13
    [1, 1, 0, 1, 1], //14
    [1, 1, 2, 1, 1], //15
    [2, 0, 0, 0, 2], //16
    [0, 2, 2, 2, 0], //17
    [2, 1, 2, 1, 2], //18
    [0, 1, 0, 1, 0], //19
    [0, 0, 1, 0, 0] //20
];

function lines() {
    return paylines;
}

function maxBetMultiplier() {
    return MAX_MULTIPLIER;
}

// Export the functions or objects as needed
module.exports = {
    lines,
    maxBetMultiplier,
    paylines
};

 