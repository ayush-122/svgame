const Player = require("../../../../config/db/queries/player/PlayerQueries");
const wallet = require("../../../../config/db/queries/wallet/WalletQueries");
const { fetchGameObject } = require("../../../../config/common/GameDataReader");
const featureKenoAuditQueries = require("../../../../config/db/queries/featureKenoAudit/featureKenoAuditQueries");
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

  let last_state = await featureKenoAuditQueries.findLastFeatureKeno(req.user.id, req.body.gameId);
  if (last_state && (last_state.next_state != "COMPLETED" || !last_state.isCompleted)) {
    return { status: false, message: `Invalid Request, Current State: ${last_state.next_state}` };
  }
  let payload = {
    type: "BASE",
    credits: req.body.credits,
    betNumbers: req.body.betNumbers,
    numberCount: req.body.numberCount,
    bet: req.body.bet,
    extraDrawCount: last_state ? last_state.extra_draw_count : 8, //TODO - Added from DB
    nextStateDetails: last_state ? last_state.next_state_details : {},

    //player_id for qa
    playerId: req.user.id,
    gameId: req.body.gameId,
  };
  return { status: true, payload, last_state };
}

// Process Extra Draw Request
async function processExtraDrawGamePlay(req) {
  const player = await Player.findPlayer(req.user.id);

  if (!player) return { status: false, message: "Player record not found." };

  let last_state = await featureKenoAuditQueries.findLastFeatureKeno(req.user.id, req.body.gameId);

  //Check if Current State is Extra Draw
  if (!last_state || last_state.next_state != "EXTRA_DRAW" || !last_state.isCompleted) {
    return { status: false, message: "Invalid Request, Incorrect State" };
  }

  let payload = {
    type: "EXTRA_DRAW",
    credits: last_state.credits,
    betNumbers: last_state.bet_numbers,
    numberCount: last_state.number_count,
    bet: last_state.bet,
    extraDrawCount: last_state ? last_state.extra_draw_count : 8, //TODO - Added from DB

    //Details
    drawnNumbers: last_state.drawn_numbers,
    win: last_state.win,
    totalWon: last_state.total_won,
    bonusMultiplier: last_state.bonus_multiplier,
    nextState: last_state.next_state,
    nextStateDetails: last_state.next_state_details,
    featureSymbols: last_state.feature_symbols,
    featureSymbolHit: last_state.feature_symbol_hit,

    //player_id for qa
    playerId: req.user.id,
    gameId: req.body.gameId,
  };

  return { status: true, payload, last_state };
}

// Process BONUS Request
async function processBonusGamePlay(req) {
  const player = await Player.findPlayer(req.user.id);

  if (!player) return { status: false, message: "Player record not found." };

  let last_state = await featureKenoAuditQueries.findLastFeatureKeno(req.user.id, req.body.gameId);

  //Check if Current State is Bonus
  if (!last_state || last_state.next_state != "WHEEL_BONUS" || !last_state.isCompleted) {
    return { status: false, message: "Invalid Request, Incorrect State" };
  }
  let payload = {
    type: "WHEEL_BONUS",
    credits: last_state.credits,
    betNumbers: last_state.bet_numbers,
    numberCount: last_state.number_count,
    bet: last_state.bet,
    extraDrawCount: last_state ? last_state.extra_draw_count : 8, //TODO - Added from DB

    //Details
    nextState: last_state.next_state,
    nextStateDetails: last_state.next_state_details,
    drawnNumbers: last_state.drawn_numbers,
    featureSymbols: last_state.feature_symbols,
    winNumbers: last_state.win_numbers,
    featureSymbolHit: last_state.feature_symbol_hit,
    bonusMultiplier: last_state.bonus_multiplier,
    payoutMultiplier: last_state.payout_multiplier,
    win: last_state.win,
    totalWon: last_state.total_won,

    //player_id for qa
    playerId: req.user.id,
    gameId: req.body.gameId,
  };

  return { status: true, payload, last_state };
}

// Process Free Request
async function processFreeGamePlay(req) {
  const player = await Player.findPlayer(req.user.id);

  if (!player) return { status: false, message: "Player record not found." };

  let last_state = await featureKenoAuditQueries.findLastFeatureKeno(req.user.id, req.body.gameId);

  //Check if Current State is Extra Draw
  if (!last_state || last_state.next_state != "FREE" || !last_state.isCompleted) {
    return { status: false, message: "Invalid Request, Incorrect State" };
  }
  let payload = {
    type: "FREE",
    credits: last_state.credits,
    betNumbers: req.body.betNumbers,
    numberCount: req.body.numberCount,
    bet: last_state.bet,
    extraDrawCount: last_state.extra_draw_count, //TODO - Added from DB

    //Details
    nextState: last_state.next_state,
    nextStateDetails: last_state.next_state_details,
    bonusMultiplier: last_state.bonus_multiplier,
    win: last_state.win,
    totalWon: last_state.total_won,

    //player_id for qa
    playerId: req.user.id,
    gameId: req.body.gameId,
  };

  return { status: true, payload, last_state };
}

// Add balance and Feature Keno Audit
async function updateDatabase(newState, req, credit_amount, last_state) {
  // console.log(newState);
  const newSpin = {};
  newSpin.client_ip_address = req.clientIp;
  newSpin.player_id = req.user.id;
  newSpin.current_state = newState.currentState;
  newSpin.next_state = newState.nextState;
  newSpin.number_count = newState.numberCount;
  newSpin.next_state = newState.nextState;
  newSpin.next_state_details = newState.nextStateDetails;
  newSpin.game_id = parseInt(req.body.gameId); //****************************************************** */
  newSpin.credits = req.body.credits || last_state.credits;
  newSpin.bet = req.body.bet || last_state.bet;
  newSpin.total_bet = newState.totalBet;
  newSpin.bet_numbers = newState.betNumbers;
  newSpin.extra_draw_count = newState.extraDrawCount;
  newSpin.drawn_numbers = newState.drawnNumbers;
  newSpin.feature_symbols = newState.featureSymbols;
  newSpin.feature_symbol_hit = newState.featureSymbolHit;
  newSpin.bonus_multiplier = newState.bonusMultiplier;
  newSpin.win_numbers = newState.winNumbers;
  newSpin.payout_multiplier = newState.payoutMultiplier;
  newSpin.win = newState.win;
  newSpin.total_won = newState.totalWon;
  newSpin.isCompleted = false;

  const transaction = await featureKenoAuditQueries.createFeatureKenoAudit(newSpin);

  //DEBIT:  Deduct Balance (If available or return error)
  const gameId = req.body.gameId;
  const bet = fetchGameObject(gameId).bet;
  if (newState.currentState == "BASE") {
    const wallet_deduct_response = await wallet.deductBalance(
      req.user.wallet_id,
      req.body.credits * bet,
      req.clientIp,
      transaction.feature_keno_id,
      "FEATURE_KENO"
    );
    if (!wallet_deduct_response.status) return { wallet_deduct_response };
  }
  //CREDIT: Add Winning Amount to Wallet
  if (credit_amount) {
    const wallet_credit_response = await wallet.addBalance(
      req.user.wallet_id,
      credit_amount,
      req.clientIp,
      transaction.feature_keno_id,
      "FEATURE_KENO"
    );
    if (!wallet_credit_response.status) return wallet_credit_response;
  }

  //Fetch Wallet Balance
  const player_wallet = await wallet.findWallet(req.user.wallet_id);
  const updatedBalance = player_wallet.balance;
  newState.balance = updatedBalance;

  //Update Response
  featureKenoAuditQueries.updateRequestId(
    transaction.feature_keno_id,
    newState.currentState == "BASE" ? transaction.feature_keno_id : last_state.feature_keno_request_id
  );

  return {
    status: true,
    message: "Data received successfully!",
    data: newState,
  };
}

// Add balance and Spin Audit
async function updateBonusDatabase(newState, req, credit_amount, last_state) {
  
    const newSpin = {};
    newSpin.client_ip_address = req.clientIp;
    newSpin.player_id = req.user.id;
    newSpin.current_state = newState.currentState;
    newSpin.number_count = newState.numberCount;
    newSpin.next_state = newState.nextState;
    newSpin.next_state_details = newState.nextStateDetails;
    newSpin.game_id = parseInt(req.body.gameId); //****************************************************** */
    newSpin.credits = req.body.credits || last_state.credits;
    newSpin.bet = req.body.bet || last_state.bet;
    newSpin.total_bet = newState.totalBet;
    newSpin.bet_numbers = newState.betNumbers;
    newSpin.extra_draw_count = newState.extraDrawCount;
    newSpin.drawn_numbers = newState.drawnNumbers;
    newSpin.feature_symbols = newState.featureSymbols;
    newSpin.feature_symbol_hit = newState.featureSymbolHit;
    newSpin.bonus_multiplier = newState.bonusMultiplier;
    newSpin.win_numbers = newState.winNumbers;
    newSpin.payout_multiplier = newState.payoutMultiplier;
    newSpin.win = newState.win;
    newSpin.total_won = newState.totalWon;
    newSpin.isCompleted = false;

    const transaction = await featureKenoAuditQueries.createFeatureKenoAudit(newSpin);

    //Fetch Wallet Balance
    const player_wallet = await wallet.findWallet(req.user.wallet_id);
    const updatedBalance = player_wallet.balance;
    newState.balance = updatedBalance;

    //Update Response
    featureKenoAuditQueries.updateRequestId(
      transaction.feature_keno_id,
      newState.currentState == "BASE" ? transaction.feature_keno_id : last_state.feature_keno_request_id
    );

    return {
      status: true,
      message: "Data received successfully!",
      data: newState,
    };
  } 


// Add balance and Spin Audit
async function addBonusBalance(req, last_state, credit_amount) {

    //CREDIT: Add Winning Amount to Wallet
    // let credit_amount = last_state.win;
    if (credit_amount) {
      const wallet_credit_response = await wallet.addBalance(
        req.user.wallet_id,
        credit_amount,
        req.clientIp,
        last_state.feature_keno_id,
        "FEATURE_KENO"
      );
      if (!wallet_credit_response.status) return wallet_credit_response;
    }

    //Fetch Wallet Balance
    const player_wallet = await wallet.findWallet(req.user.wallet_id);
    const updatedBalance = player_wallet.balance;

    last_state.next_state_details.states.pop();

    let next_state = last_state.next_state_details.states.at(-1);
    await featureKenoAuditQueries.updateNextState(
      last_state.feature_keno_id,
      next_state,
      last_state.next_state_details,
      last_state.total_won + last_state.win
    );

    return {
      status: true,
      message: "Bonus Added Successfully ",
      data: updatedBalance,
    };
  } 

//Done
async function postDone(req, res) {
 
    //Check last state
    const last_state_list = await featureKenoAuditQueries.checkLastFeatureKenos(req.user.id, req.body.gameId);
    if (last_state_list.length <= 0) 
      throw new CustomError("No last spin found",statusCode.NOT_FOUND)
    

    const last_state = last_state_list[0];

    await featureKenoAuditQueries.updateIsCompleted(last_state.feature_keno_id);

    //Create Response for Done
    const responseObj = {
      currentState: last_state.current_state,
      nextState: last_state.next_state == "COMPLETED" ? "BASE" : last_state.next_state,
      currentStateCompleted: last_state.current_state == last_state.next_state ? false : true,
    };
    return res.status(statusCode.OK).json({ status: true, message: "Spin Status Updated Successfully", data: responseObj });
  } 

//Resume
async function postResume(req, res) {
 
    //Check last state
    const last_state = await featureKenoAuditQueries.findLastFeatureKeno(req.user.id, parseInt(req.body.gameId));
    if (!last_state) {
      return res.status(204).json({ status: false, message: "No last spin found" });
    }
    const responseObj = await helper.createResponseForAudit(last_state);
    const { balance } = await wallet.findWallet(req.user.wallet_id);
    responseObj.balance = balance;
    return res.status(statusCode.OK).json({ status: true, message: "Last State Fetched Successfully", data: responseObj });
  } 

module.exports = {
  processBaseGamePlay,
  processBonusGamePlay,
  processExtraDrawGamePlay,
  processFreeGamePlay,
  updateDatabase,
  updateBonusDatabase,
  addBonusBalance,
  postDone,
  postResume,
};
