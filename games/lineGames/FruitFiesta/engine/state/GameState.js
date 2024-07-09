// GameState.js

// Define the GameState interface
class GameState {
  name() {
    throw new Error('name method must be implemented');
  }

  init() {
    throw new Error('init method must be implemented');
  }

}

// Export the GameState interface
module.exports = { GameState };
