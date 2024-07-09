const prisma = require("../../db.config");

async function createGame(game_id, game_name, type) {
  try {
    const game = await prisma.games.create({
      data: {
        game_id,
        game_name,
        type
      }
    });

    return game;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findGame(game_id) {
  try {
    const game = await prisma.games.findUnique({
      where: {
        game_id
      }
    });

    return game;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getAllGames() {
  try {
    const game = await prisma.games.findMany();

    return game;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { createGame, findGame, getAllGames };
