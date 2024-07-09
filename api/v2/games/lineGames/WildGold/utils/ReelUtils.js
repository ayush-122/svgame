//REVIEW - Need Review
// eslint-disable-next-line no-unused-vars
const ReelsUtil = {
  logger: console, // Use console for logging in JavaScript

  createFeatureReelsDisplay(reelsDisplay, wildPositions) {
    const featureReelsDisplay = this.copyReelsDisplay(reelsDisplay);
    for (let row = 0; row < Constants.DISPLAY_HEIGHT; row++) {
      for (let col = 0; col < Constants.NUM_REELS; col++) {
        if (wildPositions.includes(this.getReelPositionNumber(row, col))) {
          featureReelsDisplay[col][row] = Constants.WILD_SYMBOL;
        }
      }
    }
    return featureReelsDisplay;
  },

  ReelPositionNumber(row, col) {
    return row * Constants.NUM_REELS + col;
  },

  positionMapToString(multiplierData) {
    let sb = "";
    let token = "";
    for (const [key, value] of Object.entries(multiplierData)) {
      if (value > 1) {
        const ps = this.getReelPositionsIndex(key);
        sb += token + ps[0] + "," + ps[1] + ":" + value;
        token = ";";
      }
    }
    return sb;
  },

  StringToPositionMap(multiDataStr) {
    const multiplierData = {};
    if (multiDataStr === "") return multiplierData;
    for (const fstr of multiDataStr.split(";")) {
      const [mstr, pstr] = fstr.split(":");
      const [row, col] = pstr.split(",").map(Number);
      multiplierData[this.getReelPositionNumber(row, col)] = parseInt(mstr, 10);
    }
    return multiplierData;
  },

  IntListToCommaString(dynamiteLists) {
    return dynamiteLists.join(",");
  },

  CommaStringToIntList(positions) {
    return positions.split(",").map(Number);
  },

  SymbolStringToIntList(symbolString) {
    return symbolString
      .split(",")
      .map((symbol) => GameReelSymbol[symbol].getId());
  },

  convertListSymbolToString(list) {
    return list
      .map((item) => item.map((symbol) => symbol.name()).join(","))
      .join(";");
  },

  convertStringToListSymbol(symbol) {
    const listSymbol = [];
    try {
      const byReel = symbol.split(";");
      for (let i = 0; i < 5; i++) {
        const bySymbol = byReel[i].split(",");
        const listSymbols = [
          GameReelSymbol[bySymbol[0]],
          GameReelSymbol[bySymbol[1]],
          GameReelSymbol[bySymbol[2]]
        ];
        listSymbol.push(listSymbols);
      }
    } catch (e) {
      this.logger.error("Can't convertStringToListSymbol: " + e.message);
    }
    return listSymbol;
  },

  // Remaining functions are not translated for brevity

  // ...

  getScatterPositions(reelsDisplay) {
    const scatterPositions = [];
    for (let col = 0; col < Constants.NUM_REELS; col++) {
      for (let row = 0; row < Constants.DISPLAY_HEIGHT; row++) {
        if (reelsDisplay[col][row] === Constants.SCATTER_SYMBOL) {
          scatterPositions.push(this.getReelPositionNumber(row, col));
        }
      }
    }
    return scatterPositions;
  },

  getReelPositionNumber(row, col) {
    return row * Constants.NUM_REELS + col;
  },

  getReelPositionsIndex(positionNumber) {
    const tempData = [];
    const numReels = Constants.NUM_REELS;
    const display = Constants.DISPLAY_HEIGHT;
    if (positionNumber >= numReels * display) {
      throw new Error(
        positionNumber +
          " is out of range " +
          numReels * display +
          "(rows*cols) in the game."
      );
    }
    if (positionNumber < numReels) {
      tempData.push(0);
      tempData.push(positionNumber);
    } else {
      const row = Math.floor(positionNumber / numReels);
      const col = positionNumber % numReels;
      tempData.push(row);
      tempData.push(col);
    }
    return tempData;
  },

  copyReelsDisplay(reelsDisplay) {
    return reelsDisplay.map((reel) => [...reel]);
  },

  StringJoin(delimiter, inputStringList) {
    return inputStringList.join(delimiter);
  },

  positionsToStringMaker(positions) {
    const StringPositionsList = positions.map((position) => {
      const posInx = this.getReelPositionsIndex(position);
      const row = posInx[0];
      const col = posInx[1];
      return row + "," + col;
    });
    return StringPositionsList.join(";");
  },

  StringToPositionsMaker(str) {
    const tempStringPositionsList = str.split(";");
    const StringPositionsList = [];
    if (str === "") return StringPositionsList;
    for (const StringPosition of tempStringPositionsList) {
      const PositionArr = StringPosition.split(",");
      const row = parseInt(PositionArr[0], 10);
      const col = parseInt(PositionArr[1], 10);
      StringPositionsList.push(this.getReelPositionNumber(row, col));
    }
    return StringPositionsList;
  },

  StringToPositionsMakerReverse(str) {
    const tempStringPositionsList = str.split(";");
    const StringPositionsList = [];
    if (str === "") return StringPositionsList;
    for (const StringPosition of tempStringPositionsList) {
      const PositionArr = StringPosition.split(",");
      const row = parseInt(PositionArr[1], 10) - 1;
      const col = parseInt(PositionArr[0], 10) - 1;
      StringPositionsList.push(this.getReelPositionNumber(row, col));
    }
    return StringPositionsList;
  },

  positionsToStringMakerReverse(positions) {
    const StringPositionsList = positions.map((position) => {
      const posInx = this.getReelPositionsIndex(position);
      const row = posInx[0] + 1;
      const col = posInx[1] + 1;
      return col + "," + row;
    });
    return StringPositionsList.join(";");
  },
  keyGenerateForMatrix(matrix) {
    let data = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    };
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      data[colIndex] = matrix[colIndex];
    }
    return data;
  }
};

// Add the necessary constants and GameReelSymbol enum definition
const Constants = {
  DISPLAY_HEIGHT: 3,
  NUM_REELS: 5,
  WILD_SYMBOL: "W",
  SCATTER_SYMBOL: "S"
};

const GameReelSymbol = {
  // Define the GameReelSymbol enum here
};

// Example usage:
// const reelsDisplay = ...; // Initialize reelsDisplay
// const wildPositions = ...; // Initialize wildPositions
// const featureReelsDisplay = ReelsUtil.createFeatureReelsDisplay(reelsDisplay, wildPositions);

//TODO export all functions
