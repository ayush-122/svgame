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

  starMatrixCreation(starReelStops) {
    starReelStops[0]= 0;
    starReelStops[1]= 0;
    starReelStops[2]= 0;
    if (starReelStops.length < 36) {
      console.log("Star reel stops are incorrect, please check!");
      return;
    }
  
    const cols = 6;
    const rows = 6;
    const symbolGrid = [[]];
  
    for (let i = 0; i < cols; i++) {
      const reel = [];
      for (let j = 0; j < rows; j++) {
        const index = i * rows + j;
        reel[j] = starReelStops[index] < 1 ? 1 : 0;
      }
      symbolGrid[i] = reel;
    }
  
    return symbolGrid;
  }
}

module.exports = { SymbolGridCreation };
