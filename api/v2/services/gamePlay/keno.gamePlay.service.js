const Player = require("../../../../config/db/queries/player/PlayerQueries");
const wallet = require("../../../../config/db/queries/wallet/WalletQueries");
const { fetchGameObject } = require("../../../../config/common/GameDataReader");
const kenoAuditQueries = require("../../../../config/db/queries/kenoAudit/kenoAuditQueries");

// Process Base Request
async function processBaseGamePlay(req) {
  const player = await Player.findPlayer(req.user.id);

  if (!player) return { status: false, message: "Player record not found." };

  let payload = {
    type: req.body.type,
    credits: req.body.credits,
    betNumbers: req.body.betNumbers,
    bet: req.body.bet,
    riskLevel: req.body.riskLevel,
    playerSeed: req.body.playerSeed,
    //"HIGH" / "LOW" / "MEDIUM" / "CLASSIC",
  };

  return { status: true, payload };
}

// Add balance and Spin Audit
async function updateDatabase(newState, req, credit_amount) {
  try {
    const newSpin = {};
    newSpin.client_ip_address = req.clientIp;
    newSpin.player_id = req.user.id;
    newSpin.game_id = parseInt(req.body.gameId); //****************************************************** */
    newSpin.credits = req.body.credits;
    newSpin.bet = req.body.bet;
    newSpin.risk_level = req.body.riskLevel;
    newSpin.bet_numbers = req.body.betNumbers;
    newSpin.win_multiplier = newState.payoutMultiplier;
    newSpin.total_won = parseInt(newState.totalWon); //TODO - Convert winning to Float
    newSpin.isCompleted = false;

    const transaction = await kenoAuditQueries.createKenoAudit(newSpin);

    //DEBIT:  Deduct Balance (If available or return error)
    const gameId = req.body.gameId;
    const bet = fetchGameObject(gameId).bet;
    const wallet_deduct_response = await wallet.deductBalance(
      req.user.wallet_id,
      req.body.credits * bet,
      req.clientIp,
      transaction.keno_id,
      "KENO"
    );
    if (!wallet_deduct_response.status) return { wallet_deduct_response };

    //CREDIT: Add Winning Amount to Wallet
    if (credit_amount) {
      const wallet_credit_response = await wallet.addBalance(
        req.user.wallet_id,
        credit_amount,
        req.clientIp,
        transaction.keno_id,
        "KENO"
      );
      if (!wallet_credit_response.status) return wallet_credit_response;
    }

    //Fetch Wallet Balance
    const player_wallet = await wallet.findWallet(req.user.wallet_id);
    const updatedBalance = player_wallet.balance;
    newState.balance = updatedBalance;

    //Update Response
    kenoAuditQueries.updateResponse(transaction.keno_id, newState);

    return {
      status: true,
      message: "Data received successfully!",
      data: newState,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Done
async function postDone(req, res) {
  try {
    //Check last state
    const last_state = await kenoAuditQueries.checkLastKenos(req.user.id);
    if (last_state.length <= 0) {
      return res.status(400).json({ status: false, message: "No last spin found" });
    }

    await kenoAuditQueries.updateIsCompleted(last_state[0].keno_id);
    return res.status(200).json({ status: true, message: "Spin Status Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

module.exports = {
  processBaseGamePlay,
  updateDatabase,
  postDone,
};
