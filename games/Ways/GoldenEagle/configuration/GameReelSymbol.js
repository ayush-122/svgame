const GameReelSymbol = {
  symbols: {
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    L1: "L1",
    L2: "L2",
    L3: "L3",
    L4: "L4",
    L5: "L5",
    SC: "SC",
    WC: "WC",
    BO: "BO",
  },

  symbolIds: {
    H1: { id: 0, symbol: "H1", symbolWon: true, matchCount: 3 },
    H2: { id: 1, symbol: "H2", symbolWon: true, matchCount: 3 },
    H3: { id: 2, symbol: "H3", symbolWon: true, matchCount: 3 },
    H4: { id: 3, symbol: "H4", symbolWon: true, matchCount: 3 },
    H5: { id: 4, symbol: "H5", symbolWon: true, matchCount: 3 },
    L1: { id: 5, symbol: "L1", symbolWon: true, matchCount: 3 },
    L2: { id: 6, symbol: "L2", symbolWon: true, matchCount: 3 },
    L3: { id: 7, symbol: "L3", symbolWon: true, matchCount: 3 },
    L4: { id: 8, symbol: "L4", symbolWon: true, matchCount: 3 },
    L5: { id: 9, symbol: "L5", symbolWon: true, matchCount: 3 },
    SC: { id: 10, symbol: "SC", symbolWon: false, matchCount: 3 },
    WC: { id: 11, symbol: "WC", symbolWon: false, matchCount: 3 },
    BO: { id: 12, symbol: "BO", symbolWon: false, matchCount: 3 },
  },

  // Private method to get the symbol by id
  getSymbolById: (id) => {
    try {
      for (const key in this.symbols) {
        if (Object.prototype.hasOwnProperty.call(this.symbols, key) && this.symbols[key].id === id) {
          return key;
        }
      }
      throw new Error("Symbol not found");
    } catch (error) {
      console.error("Error in get method:", error.message);
      return null;
    }
  },

  // Private method to get the symbol map
  getSymbolMap: () => {
    try {
      const symbolMap = new Map();
      for (const key in this.symbols) {
        if (Object.prototype.hasOwnProperty.call(this.symbols, key)) {
          symbolMap.set(key, this.symbols[key]);
        }
      }
      return symbolMap;
    } catch (error) {
      console.error("Error in getSymbolMap method:", error.message);
      return null;
    }
  },
};

module.exports = { GameReelSymbol };
