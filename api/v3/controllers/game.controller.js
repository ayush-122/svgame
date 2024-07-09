const gameQueries = require("../../../config/db/queries/game/gameQueries");

const statusCode =require("../../../config/common/statusCode.js")
const asyncErrorHandler =require("../helpers/asyncErrorHandler.js")
const CustomError = require("../helpers/CustomError/customError.js");


async function createGame(req, res,next){
    const { game_id, game_name, type } = req.body;
    await gameQueries.createGame(game_id, game_name, type);
    res
      .status(statusCode.OK)
      .json({ status: true, message: "Game id create successfully" });
  };


async  function getGameById(req, res,next) {
    const game_id = parseInt(req.params.id);
    const game = await gameQueries.findGame(game_id);
    if (game.length == 0) 
      return next(new CustomError("Game Not found",statusCode.NOT_FOUND));;
    res
      .status(statusCode.OK)
      .json({ status: true, message: "Game fetched successfully", data: game });
}

async function getGames(req, res,next){
    const game = await gameQueries.getAllGames();
    if (!game) 
        return next(new CustomError("Games not found",statusCode.NOT_FOUND));
    
    res.status(statusCode.OK).json({
      status: true,
      message: "Games fetched successfully",
      data: game
    });
  }

module.exports = { 
  createGame :asyncErrorHandler(createGame)
  , getGameById:asyncErrorHandler(getGameById), 
  getGames: asyncErrorHandler(getGames) };
