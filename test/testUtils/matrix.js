class SymbolGridCreation {
    constructor(rows, cols, GameReels, reelStops) {
      this.rows = rows;
      this.cols = cols;
      this.GameReels = GameReels;
      this.reelStops = reelStops;
    }
  
    matrixCreation() {
      let symbolGrid = [[]];
      let reelStops = this.reelStops;
      for (let i = 0; i < this.cols; i++) {
        let random = reelStops[i];
        let reel = [];
        for (let j = 0; j < this.rows; j++) {
          reel[j] = this.GameReels.get(i + 1)[random];
          random = random + 1;
          random = random % this.GameReels.get(i + 1).length;
        }
        symbolGrid[i] = reel;
      }
      return symbolGrid;
    }
  
    matrixCreation2() {
      let symbolGrid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
      let reelStops = this.reelStops;
  
      for (let i = 0; i < this.cols; i++) {
        let random = reelStops[i];
        for (let j = 0; j < this.rows; j++) {
          symbolGrid[j][i] = this.GameReels.get(i + 1)[random];
          random = (random + 1) % this.GameReels.get(i + 1).length;
        }
      }
  
      return symbolGrid;
    }
  }
  
  module.exports = { SymbolGridCreation };
  