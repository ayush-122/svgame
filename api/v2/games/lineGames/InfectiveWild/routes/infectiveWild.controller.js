const infectiveWild = require("../engine/requestHandler/StateManagement");
const gamePlay = require("../../../../services/gamePlay/gamePlay.service");
const { SPIN_REQUEST, FREE_GAME_REQUEST } = require("../configuration/GameConstant");

//  **************** BASE GAME PLAY ******************
async function postGamePlayInfectiveWild(req, res) {
  try {
    const obj = await gamePlay.processBaseGamePlay(req);

    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = SPIN_REQUEST;
    const newState = await infectiveWild.stateHandler(nextState, obj.payload);

    const credit_amount = newState.mainSpinCreditsWon;

    // const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);
    return res.status(200).json(newState);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

//  **************** FREE/BONUS GAME PLAY ******************
async function postGameContinueInfectiveWild(req, res) {
  try {
    if (req.body.state == FREE_GAME_REQUEST) {
      const obj = await gamePlay.processFreeGamePlay(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = FREE_GAME_REQUEST;
      const newState = await infectiveWild.stateHandler(nextState, obj.payload, obj.lastState.raw_response);

      //Calculating Win
      const credit_amount = newState.freeGame.freeSpinCreditsWon;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    } else return res.status(400).json({ status: false, message: "Invalid Request" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

//  **************** DONE REQUEST ******************
async function postGameDoneInfectiveWild(req, res) {
  await gamePlay.postDone(req, res);
}

// ? **************** RESUME REQUEST ******************
async function postGameResumeInfectiveWild(req, res) {
  await gamePlay.postResume(req, res);
}

module.exports = {
  postGamePlayInfectiveWild,
  postGameContinueInfectiveWild,
  postGameDoneInfectiveWild,
  postGameResumeInfectiveWild,
};
