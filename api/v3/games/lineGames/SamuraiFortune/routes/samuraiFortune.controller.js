const samuraiFortune = require("../engine/requestHandler/StateManagement");
const gamePlay = require("../../../../services/gamePlay/gamePlay.service");
const { SPIN_REQUEST, FREE_GAME_REQUEST } = require("../configuration/GameConstant");
const statusCode = require("../../../../../../config/common/statusCode");
const asyncErrorHandler = require("../../../../helpers/asyncErrorHandler");



//  **************** BASE GAME PLAY ******************
async function postGamePlaySamuraiFortune(req, res,next) {
 
    const obj = await gamePlay.processBaseGamePlay(req);

    if (!obj.status) {
      return res.status(statusCode.BAD_REQUEST).json(obj);
    }
    const nextState = SPIN_REQUEST;
    const newState = await samuraiFortune.stateHandler(nextState, obj.payload);

    const credit_amount = newState.mainSpinCreditsWon;

    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);
    return res.status(statusCode.OK).json(dbReport);
  } 

//  **************** FREE/BONUS GAME PLAY ******************
async function postGameContinueSamuraiFortune(req, res,next) {
  
    if (req.body.state == FREE_GAME_REQUEST) {
      const obj = await gamePlay.processFreeGamePlay(req, req.body);
      if (!obj.status) return res.status(statusCode.BAD_REQUEST).json(obj);

      const nextState = FREE_GAME_REQUEST;
      const newState = await samuraiFortune.stateHandler(nextState, obj.payload, obj.lastState.raw_response);

      //Calculating Win
      const credit_amount = newState.freeGame.freeSpinCreditsWon;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(statusCode.OK).json(dbReport);
    } else return res.status(statusCode.BAD_REQUEST).json({ status: false, message: "Invalid Request" });
  } 

//  **************** DONE REQUEST ******************
async function postGameDoneSamuraiFortune(req, res) {
  await gamePlay.postDone(req, res);
}

// ? **************** RESUME REQUEST ******************
async function postGameResumeSamuraiFortune(req, res) {
  await gamePlay.postResume(req, res);
}

module.exports = {
  postGamePlaySamuraiFortune:asyncErrorHandler(postGamePlaySamuraiFortune),
  postGameContinueSamuraiFortune: asyncErrorHandler(postGameContinueSamuraiFortune),
  postGameDoneSamuraiFortune,
  postGameResumeSamuraiFortune,
};
