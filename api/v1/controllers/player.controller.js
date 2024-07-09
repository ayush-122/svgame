const Player = require("../../../config/db/queries/player/PlayerQueries");
const Wallet = require("../../../config/db/queries/wallet/WalletQueries");

async function getPlayer(req, res) {
  try {
    const record = await Player.findPlayer(req.user.id);

    //Reconfiguration*************************
    record.player_id = record.player_id.toString();

    //Send balance
    const { balance } = await Wallet.findWallet(req.user.wallet_id);
    record.balance = balance;

    return res.status(200).json({
      status: true,
      message: "Player Data retrieved successfully",
      data: record
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
