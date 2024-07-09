const gameQueries = require("../../../config/db/queries/game/gameQueries");

async function createGame(req, res) {
  try {
    const { game_id, game_name, type } = req.body;
    await gameQueries.createGame(game_id, game_name, type);
    res
      .status(200)
      .json({ status: true, message: "Game id create successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}
async function getGameById(req, res) {
  try {
    const game_id = parseInt(req.params.id);
    const game = await gameQueries.findGame(game_id);
    if (game.length == 0) {
      return res.status(404).json({ status: false, message: "Game Not Found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Game fetched successfully", data: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}
async function getGames(req, res) {
  try {
    const game = await gameQueries.getAllGames();
    if (!game) {
      return res
        .status(404)
        .json({ status: false, message: "Games Not Found" });
    }
    res.status(200).json({
      status: true,
      message: "Games fetched successfully",
      data: game
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

module.exports = { createGame, getGameById, getGames };
