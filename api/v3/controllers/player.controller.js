const Player = require("../../../config/db/queries/player/PlayerQueries");
const Wallet = require("../../../config/db/queries/wallet/WalletQueries");
const statusCode = require("../../../config/common/statusCode.js")
const asyncErrorHandler =require("../helpers/asyncErrorHandler.js");

async function getPlayer (req, res,next) {
    const player = await Player.findPlayer(req.user.id);

    //Reconfiguration*************************
    player.player_id = player.player_id.toString();

    //Send balance
    const { balance } = await Wallet.findWallet(req.user.wallet_id);
    player.balance = balance;

    return res.status(statusCode.OK).json({
      status: true,
      message: "Player Data retrieved successfully",
      data: player
    });
  }

module.exports = {
  getPlayer:asyncErrorHandler(getPlayer)
};
