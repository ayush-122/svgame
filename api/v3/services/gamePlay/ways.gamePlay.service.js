const Player = require("../../../../config/db/queries/player/PlayerQueries");
const wallet = require("../../../../config/db/queries/wallet/WalletQueries");
const { fetchGameObject } = require("../../../../config/common/GameDataReader");
const waysAuditQueries = require("../../../../config/db/queries/waysAudit/waysAuditQueries");
const helper = require("../../helpers/audit/helper.Audit");
const CustomError = require("../../helpers/CustomError/customError");
const statusCode = require("../../../../config/common/statusCode");

// Process Base Request
async function processBaseGamePlay(req) {

    const player = await Player.findPlayer(req.user.id);

    if (!player) return { status: false, message: "Player record not found." };

    //TRANSACTION VALIDATION
    const bet = fetchGameObject(req.body.gameId).bet;
    const wallet_validation_response = await wallet.validateTransaction(req.user.wallet_id, req.body.credits * bet);
    if (!wallet_validation_response.status) return wallet_validation_response;

    // Check for Remaining free game
    const lastState = await waysAuditQueries.findLastWays(req.user.id, parseInt(req.body.gameId));
    if (lastState && (lastState.next_state !== "COMPLETED" || !lastState.isCompleted)) {
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
      type: "BASE",
    };

    return { status: true, lastState, payload };
  } 

//Process Free Request
async function processFreeGamePlay(req) {
  let previousState = null;

  //Find last transaction
  const lastState = await waysAuditQueries.findLastWays(req.user.id, parseInt(req.body.gameId));

  if (lastState !== null) {
    previousState = lastState.raw_response;
  } else
    return {
      status: false,
      message: "Invalid Request !! Last state not available.",
    };

  //Check if state is FREE SPIN
  if (lastState.current_free_ways >= lastState.total_free_ways || !lastState.isCompleted) {
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
  return { status: true, lastState, payload };
}

//Process Reways Request
async function processRespinGamePlay(req) {
  let previousState = null;

  //Find last transaction
  const lastState = await waysAuditQueries.findLastWays(req.user.id, parseInt(req.body.gameId));

  if (lastState !== null) {
    previousState = lastState.raw_response;
  } else
    return {
      status: false,
      message: "Invalid Request !! Last state not available.",
    };

  //Check if state is RESPIN
  if (
    lastState.next_state != "RESPIN" &&
    (previousState.reSpinGame.currentRespin >= previousState.reSpinGame.totalRespin || !lastState.isCompleted)
  ) {
    return {
      status: false,
      blah: "blah",
      message: "Bad Request",
    };
  }

  //Create payload for Game State
  let payload = {
    credits: previousState.creditValue,
    betMultiplier: previousState.betMultiplier,
    gameId: req.body.gameId,
    playerId: req.user.id,
    type: "RESPIN",
  };
  return { status: true, lastState, payload };
}

//Process Bonus Request
async function processWheelBonusRequest(req) {
  const player = await Player.findPlayer(req.user.id);

  if (!player) {
    return { status: false, message: "Player record not found." };
  }

  const gameId = req.body.gameId;

  // Check for Last Ways
  const lastState = await waysAuditQueries.findLastWays(req.user.id, parseInt(gameId));

  //Check if current state is BONUS
  if (!lastState || lastState.next_state !== "WHEEL_BONUS" || !lastState.isCompleted)
    return {
      status: false,
      message: "Invalid Request",
    };
  let payload = {
    credits: lastState.raw_request.credits,
    playerId: req.user.id,
    gameId: gameId,
    type: "WHEEL_BONUS",
  };

  return { status: true, lastState, payload };
}

// Add balance and Ways Audit
async function updateDatabase(newState, req, credit_amount, lastState) {
 
    const newWays = {};
    newWays.client_ip_address = req.clientIp;
    newWays.player_id = req.user.id;
    newWays.game_id = parseInt(req.body.gameId); //****************************************************** */
    newWays.game_type = newState.state.current; //HARDCODED*******************
    newWays.current_state = newState.state.current;
    newWays.next_state = newState.state.next;
    newWays.current_free_ways = newState.freeGame.currentFreeSpin || 0;
    newWays.total_free_ways = newState.freeGame.totalFreeSpin || 0;
    newWays.raw_request = req.body;
    newWays.base_bet = 20;
    newWays.isCompleted = false;

    const transaction = await waysAuditQueries.createWaysAudit(newWays);

    const gameId = req.body.gameId;
    //DEBIT: Deduct for BASE game and check If available or return error
    if (newWays.game_type == "BASE") {
      const bet = fetchGameObject(gameId).bet;
      const wallet_deduct_response = await wallet.deductBalance(
        req.user.wallet_id,
        req.body.credits * bet,
        req.clientIp,
        transaction.ways_id,
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
        transaction.ways_id,
        "SPIN"
      );
      if (!wallet_credit_response.status) return wallet_credit_response;
    }

    //Fetch Wallet Balance
    const player_wallet = await wallet.findWallet(req.user.wallet_id);
    const updatedBalance = player_wallet.balance;
    newState.balance = updatedBalance;

    //Add Ways Id  & Response
    await waysAuditQueries.updateWaysRequestIdAndResponse(
      transaction.ways_id,
      newState.state.current === "BASE" ? transaction.ways_id : lastState.ways_request_id,
      newState.state.current == "WHEEL_BONUS" ? { ...lastState.raw_response, ...newState } : newState
    );
    return {
      status: true,
      message: "Data received successfully!",
      data: newState,
    };
  } 

//Done
async function postDone(req, res) {
 
    //Check last state
    const last_state = await waysAuditQueries.checkLastWays(req.user.id, parseInt(req.body.gameId));
    if (last_state.length <= 0) 
      throw new CustomError("No last ways found",StatusCode.BAD_REQUEST)

    await waysAuditQueries.updateIsCompleted(last_state[0].ways_id);
    return res.status(statusCode.OK).json({ status: true, message: "Ways Status Updated Successfully" });
  } 

//Resume
async function postResume(req, res) {

    //Check last state
    const last_state = await waysAuditQueries.findLastWays(req.user.id, parseInt(req.body.gameId));
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
  processRespinGamePlay,
  postDone,
  postResume,
};
