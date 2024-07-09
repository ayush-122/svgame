class Scatter {
  constructor(grid, symbol) {
    this.grid = grid;
    this.symbol = symbol;
  }

  scatterCount() {
    let count = 0;
    let position = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === this.symbol) {
          count++;
          var str = i + "," + j;
          position.push(str);
        }
      }
    }
    return { count, position };
  }
}

module.exports = { Scatter };
