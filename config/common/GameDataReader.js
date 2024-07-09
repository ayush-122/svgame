function fetchGameObject(gameId) {
  const jsonData = require("./GameData.json");
  // Check if the gameId exists in the JSON data
  if (Object.prototype.hasOwnProperty.call(jsonData, gameId)) {
    const gameData = jsonData[gameId];
    return gameData;
  } else {
    // Game ID not found
    throw new Error("Game ID not found");
  }
}

// Export the fetchGameObject function for use in other modules
module.exports = {
  fetchGameObject
};
