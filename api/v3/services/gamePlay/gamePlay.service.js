const Player = require("../../../../config/db/queries/player/PlayerQueries");
const SpinAuditQueries = require("../../../../config/db/queries/spinAudit/spinAuditQueries");
const wallet = require("../../../../config/db/queries/wallet/WalletQueries");
const { fetchGameObject } = require("../../../../config/common/GameDataReader");
const helper = require("../../helpers/audit/helper.Audit");
const CustomError = require("../../helpers/CustomError/customError.js");
const statusCode = require("../../../../config/common/statusCode.js");









const {
  BASE_GAME_REQUEST,
  FREE_GAME_REQUEST,
  RESPIN_GAME_REQUEST,
  WHEEL_BONUS_REQUEST,
  PICK_BONUS_REQUEST,
  // BUY_FEATURE_BASE,
  DONE_REQUEST,
} = require("../../../../config/common/GameStateConfig");

// Process Base Request
async function processBaseGamePlay(req) {

    const player = await Player.findPlayer(req.user.id);

    if (!player) return { status: false, message: "Player record not found." };

    //TRANSACTION VALIDATION
    const bet = fetchGameObject(req.body.gameId).bet;
    const wallet_validation_response = await wallet.validateTransaction(req.user.wallet_id, req.body.credits * bet);
    if (!wallet_validation_response.status) return wallet_validation_response;

    // Check for Remaining free game
    const lastState = await SpinAuditQueries.findLastSpin(req.user.id, parseInt(req.body.gameId));
    if (lastState && (lastState.next_state !== DONE_REQUEST || !lastState.isCompleted)) {
      return {
        status: false,
        message: "Invalid Request",
      };
    }

    //Create Payload for GameState
    let payload = {
      credits: req.body.credits,
      isBuyFeature: req.body.isBuyFeature,
      playerId: req.user.id,
      gameId: req.body.gameId,
      type: BASE_GAME_REQUEST,
    };

    return { status: true, lastState, payload };
  } 

//Process Free Request
async function processFreeGamePlay(req) {
  let previousState = null;

  //Find last transaction
  const lastState = await SpinAuditQueries.findLastSpin(req.user.id, parseInt(req.body.gameId));

  if (lastState !== null) {
    previousState = lastState.raw_response;
  } else
    return {
      status: false,
      message: "Invalid Request !! Last state not available.",
    };

  //Check if state is FREE SPIN
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
    type: FREE_GAME_REQUEST,
  };
  return { status: true, lastState, payload };
}

//Process Respin Request
async function processRespinGamePlay(req) {
  let previousState = null;

  //Find last transaction
  const lastState = await SpinAuditQueries.findLastSpin(req.user.id, parseInt(req.body.gameId));

  if (lastState !== null) {
    previousState = lastState.raw_response;
  } else
    return {
      status: false,
      message: "Invalid Request !! Last state not available.",
    };

  //Check if state is RESPIN
  if (
    lastState.next_state != RESPIN_GAME_REQUEST &&
    (previousState.reSpinGame.currentRespin >= previousState.reSpinGame.totalRespin || !lastState.isCompleted)
  ) {
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
    type: RESPIN_GAME_REQUEST,
  };
  return { status: true, lastState, payload };
}

//Process Wheel Bonus Request
async function processWheelBonusRequest(req) {
  const player = await Player.findPlayer(req.user.id);

  if (!player) {
    return { status: false, message: "Player record not found." };
  }

  const gameId = req.body.gameId;

  // Check for Last Spin
  const lastState = await SpinAuditQueries.findLastSpin(req.user.id, parseInt(gameId));

  //Check if current state is WHEEL BONUS
  if (!lastState || lastState.next_state !== WHEEL_BONUS_REQUEST || !lastState.isCompleted)
    return {
      status: false,
      message: "Invalid Request",
    };
  let payload = {
    credits: lastState.raw_request.credits,
    playerId: req.user.id,
    gameId: gameId,
    type: WHEEL_BONUS_REQUEST,
  };

  return { status: true, lastState, payload };
}

//Process Bonus Request
async function processPickBonusRequest(req) {
  const player = await Player.findPlayer(req.user.id);

  if (!player) {
    return { status: false, message: "Player record not found." };
  }

  const gameId = req.body.gameId;

  // Check for Last Spin
  const lastState = await SpinAuditQueries.findLastSpin(req.user.id, parseInt(gameId));

  //Check if current state is BONUS
  if (!lastState || lastState.next_state !== PICK_BONUS_REQUEST || !lastState.isCompleted)
    return {
      status: false,
      message: "Invalid Request",
    };
  let payload = {
    credits: lastState.raw_request.credits,
    playerId: req.user.id,
    gameId: gameId,
    type: PICK_BONUS_REQUEST,
  };

  return { status: true, lastState, payload };
}

// Add balance and Spin Audit
async function updateDatabase(newState, req, credit_amount, lastState) {
 
    const newSpin = {};
    newSpin.client_ip_address = req.clientIp;
    newSpin.player_id = req.user.id;
    newSpin.game_id = parseInt(req.body.gameId); //****************************************************** */
    newSpin.game_type = newState.state.current; //HARDCODED*******************
    newSpin.current_state = newState.state.current;
    newSpin.next_state = newState.next;
    newSpin.current_free_spin = newState.freeGame ? newState.freeGame.currentFreeSpin : 0;
    newSpin.total_free_spin = newState.freeGame ? newState.freeGame.totalFreeSpin : 0;
    newSpin.raw_request = req.body;
    newSpin.isCompleted = false;

    const transaction = await SpinAuditQueries.createSpinAudit(newSpin);

    const gameId = req.body.gameId;
    //DEBIT: Deduct for BASE game and check If available or return error
    if (newSpin.game_type == BASE_GAME_REQUEST) {
      const bet = fetchGameObject(gameId).bet;
      const wallet_deduct_response = await wallet.deductBalance(
        req.user.wallet_id,
        req.body.credits * bet,
        req.clientIp,
        transaction.spin_id,
        "SPIN"
      );
      if (!wallet_deduct_response.status) return { wallet_deduct_response };
    }

    //CREDIT: Add Winning Amount to Wallet
    if (credit_amount) {
      const wallet_credit_response = await wallet.addBalance(
       req.user.wallet_id,
        credit_amount,
        req.clientIp,
        transaction.spin_id,
        "SPIN"
      );
      if (!wallet_credit_response.status) return wallet_credit_response;
    }

    //Fetch Wallet Balance
    const player_wallet = await wallet.findWallet(req.user.wallet_id);
    const updatedBalance = player_wallet.balance;
    newState.balance = updatedBalance;

    //Add Spin Id  & Response
    await SpinAuditQueries.updateSpinRequestIdAndResponse(
      transaction.spin_id,
      newState.state.current === BASE_GAME_REQUEST ? transaction.spin_id : lastState.spin_request_id,
      newState.state.current == WHEEL_BONUS_REQUEST || newState.state.current == PICK_BONUS_REQUEST
        ? { ...lastState.raw_response, ...newState }
        : newState
    );

    //Delete rolled data
    if (newState.reelStops) delete newState.reelStops.rolledData;
    return {
      status: true,
      message: "Data received successfully!",
      data: newState,
    };
  } 


//Done
async function postDone(req, res) {
    //Check last state
    const last_state = await SpinAuditQueries.checkLastSpins(req.user.id, parseInt(req.body.gameId));
    if (last_state.length <= 0) {
       throw new CustomError("No last spin found",statusCode.NOT_FOUND);
    }

    await SpinAuditQueries.updateIsCompleted(last_state[0].spin_id);
    return res.status(statusCode.OK).json({ status: true, message: "Spin Status Updated Successfully" });
  } 


//Resume
async function postResume(req, res) {
 
    //Check last state
    const last_state = await SpinAuditQueries.findLastSpin(req.user.id, parseInt(req.body.gameId));
    if (!last_state) {
      return res.status(statusCode.NO_CONTENT).json({ status: false, message: "No last spin found" });
    }
    const responseObj = await helper.createResponseForAudit(last_state);
    const { balance } = await wallet.findWallet(req.user.wallet_id);
    responseObj.balance = balance;
    return res.status(statusCode.OK).json({ status: true, message: "Last State Fetched Successfully", data: responseObj });
  } 


module.exports = {
  processBaseGamePlay, 
  updateDatabase,
  processFreeGamePlay,
  processWheelBonusRequest,
  processPickBonusRequest,
  processRespinGamePlay,
  postDone,
  postResume,
};