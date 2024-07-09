const Player = require("../../../config/db/queries/player/PlayerQueries");
const Wallet = require("../../../config/db/queries/wallet/WalletQueries");

async function getPlayer(req, res) {
  try {
    const player = await Player.findPlayer(req.user.id);

    //Reconfiguration*************************
    player.player_id = player.player_id.toString();

    //Send balance
    const { balance } = await Wallet.findWallet(req.user.wallet_id);
    player.balance = balance;

    return res.status(200).json({
      status: true,
      message: "Player Data retrieved successfully",
      data: player
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error"
    });
  }
}

module.exports = {
  getPlayer
};
