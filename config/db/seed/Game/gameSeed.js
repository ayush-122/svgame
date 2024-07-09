const gameSeedData = require("./gameSeedData.json");
const gameQueries = require("../../queries/game/gameQueries");

async function gameSeed() {
  try {
    for (const gameData of gameSeedData) {
      // Check if game already exists
      const game = await gameQueries.findGame(gameData.game_id);
      if (game) {
        console.log(`${gameData.game_name} already exists`);
        continue;
      }
      await gameQueries.createGame(gameData.game_id, gameData.game_name, gameData.type);
      console.log(`${gameData.game_name} is Added`);
    }
    console.log("Game Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding games:", error);
  }
}

module.exports = gameSeed;
