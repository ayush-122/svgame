const Player = require("../../../../config/db/queries/player/PlayerQueries");
const cascadeAuditQueries = require("../../../../config/db/queries/cascadeQueries/cascadeAuditQueries");
const wallet = require("../../../../config/db/queries/wallet/WalletQueries");
// const spinAuditHelper = require("../../helpers/spin/helper.CascadeAudit");
const { fetchGameObject } = require("../../../../config/common/GameDataReader");
const helper = require("../../helpers/audit/helper.Audit");

// Process Base Request
async function processBaseGamePlay(req) {
  try {
    const player = await Player.findPlayer(req.user.id);

    if (!player) return { status: false, message: "Player record not found." };

    //TRANSACTION VALIDATION
    const bet = fetchGameObject(req.body.gameId).bet;
    const wallet_validation_response = await wallet.validateTransaction(req.user.wallet_id, req.body.credits * bet);
    if (!wallet_validation_response.status) return wallet_validation_response;

    // Check for Remaining free game
    const lastState = await cascadeAuditQueries.findLastCascade(req.user.id, parseInt(req.body.gameId));
    if (lastState && (lastState.next_state !== "COMPLETED" || !lastState.isCompleted)) {
      return {
        status: false,
        message: `Invalid Request, currentState: ${lastState.next_state}`,
      };
    }

    //Create Payload for GameState
    let payload = {
      credits: req.body.credits,
      isBuyFeature: req.body.isBuyFeature,
      playerId: req.user.id,
      gameId: req.body.gameId,
      type: "BASE",
    };

    return { status: true, lastState, payload };
  } catch (error) {
    console.error(error);
    // res.status(500).json({ status: false, message: "Internal Server Error" });
    throw error;
  }
}

//Process Free Request
async function processFreeGamePlay(req) {
  let previousState = null;

  //Find last transaction
  const lastState = await cascadeAuditQueries.findLastCascade(req.user.id, parseInt(req.body.gameId));

  if (lastState !== null) {
    previousState = helper.transformObject(lastState);
  } else
    return {
      status: false,
      message: "Invalid Request !! Last state not available.",
    };

  //Check if state is FREE SPIN && revist 
  if (lastState.current_free_spin >= lastState.total_free_spin || !lastState.isCompleted) {
    return {
      status: false,
      message: "Bad Request",
    };
  }

  //Create payload for Game State
  let payload = {
    credits: previousState.creditValue,
    betMultiplier: previousState.betMultiplier,
    gameId: req.body.gameId,
    playerId: req.user.id,
    type: "FREE",
  };
  return { status: true, previousState, payload };
}

// Add balance and Cascade Audit
async function updateDatabase(newState, req, credit_amount, lastState) {
  try {
    const newCascade = {
      client_ip_address: req.clientIp,
      player_id: req.user.id,
      game_id: parseInt(req.body.gameId),
      current_state: newState.currentState,
      next_state: newState.nextState,
      current_free_spin: newState.freeGame.currentFreeSpin || 0,
      total_free_spin: newState.freeGame.totalFreeSpin || 0,
      current_cascade: newState.cascadeProgress,
      total_cascades: newState.lastCascadingReels,
      created_at: newState.created_at,
      base_bet: newState.baseBet,
      credit_value: newState.creditValue,
      bet_multiplier: newState.betMultiplier,
      reel_mode: newState.reelMode,
      matrix: newState.matrix,
      payline: newState.payline,
      star_positions: newState.starPositions,
      cascading_win_progress: newState.cascadingWinProgress,
      star: newState.star,
      free_game: newState.freeGame,
      main_spin_credits_won: newState.mainSpinCreditsWon,
      credits_won_on_base_spin: newState.creditsWonOnBaseSpin,
      base_game_cascade_won: newState.baseGameCascadeWon,
      free_spin_credits_won: newState.freeSpinCreditsWon,
      free_game_cascade_won: newState.freeGameCascadeWon,
      free_spin_total_won: newState.freeSpinTotalWon,
      total_credits_won: newState.totalCreditsWon,
      credits_wagered: newState.creditsWagered,
      final_winnings: newState.finalWinnings,
      cascade_progress: newState.cascadeProgress,
      last_cascading_reels: newState.lastCascadingReels,
      isCompleted: process.env.FEATURE_DONE == "true" ? false : true, // change to false by default //TODO
    };

    const transaction = await cascadeAuditQueries.createCascadeAudit(newCascade);

    const gameId = req.body.gameId;
    //DEBIT: Deduct for BASE game and check If available or return error
    if (newCascade.game_type == "BASE") {
      const bet = fetchGameObject(gameId).bet;
      const wallet_deduct_response = await wallet.deductBalance(
        req.user.wallet_id,
        req.body.credits * bet,
        req.clientIp,
        transaction.cascade_id,
        "CASCADE"
      );
      if (!wallet_deduct_response.status) return { wallet_deduct_response };
    }

    //CREDIT: Add Winning Amount to Wallet
    if (credit_amount) {
      const wallet_credit_response = await wallet.addBalance(
        req.user.wallet_id,
        credit_amount,
        req.clientIp,
        transaction.cascade_id,
        "SPIN"
      );
      if (!wallet_credit_response.status) return wallet_credit_response;
    }

    //Fetch Wallet Balance
    const player_wallet = await wallet.findWallet(req.user.wallet_id);
    const updatedBalance = player_wallet.balance;
    newState.balance = updatedBalance;

    //Add Cascade Id  & Response
    await cascadeAuditQueries.updateCascadeRequestIdAndResponse(
      transaction.cascade_id,
      newState.currentState === "BASE" ? transaction.cascade_id : lastState.cascade_request_id
    );
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
    const last_state = await cascadeAuditQueries.checkLastCascades(req.user.id);
    if (last_state.length <= 0) {
      return res.status(400).json({ status: false, message: "No last spin found" });
    }
    if (last_state.current_cascade < last_state.total_cascade) {
      await cascadeAuditQueries.updateCascadeProgress(last_state[0].cascade_id, last_state[0].current_cascade + 1);
      return res.status(200).json({
        status: true,
        message: "Cascade Progress Updated Successfully",
      });
    }
    await cascadeAuditQueries.updateIsCompleted(last_state[0].cascade_id);
    return res.status(200).json({ status: true, message: "Cascade Status Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

module.exports = {
  processBaseGamePlay,
  updateDatabase,
  processFreeGamePlay,
  postDone,
};
