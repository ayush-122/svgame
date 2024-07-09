const wildGold = require("./../engine/requestHandler/StateManagement");
const gamePlay = require("../../../../services/gamePlay/gamePlay.service");

//  **************** BASE GAME PLAY ******************
async function postGamePlayWildGold(req, res) {
  try {
    const obj = await gamePlay.processBaseGamePlay(req);

    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = "BASE";
    const newState = await wildGold.stateHandler(nextState, obj.payload);

    const credit_amount = newState.mainSpinCreditsWon;

    credit_amount;
    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);
    return res.status(200).json(dbReport);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

//  **************** FREE/BONUS GAME PLAY ******************
async function postGameContinueWildGold(req, res) {
  try {
    if (req.body.state == "FREE") {
      const obj = await gamePlay.processFreeGamePlay(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = "FREE";
      const newState = await wildGold.stateHandler(nextState, obj.payload, obj.lastState.raw_response);

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
async function postGameDoneWildGold(req, res) {
  await gamePlay.postDone(req, res);
}

// ? **************** RESUME REQUEST ******************
async function postGameResumeWildGold(req, res) {
  await gamePlay.postResume(req, res);
}

module.exports = {
  postGamePlayWildGold,
  postGameContinueWildGold,
  postGameDoneWildGold,
  postGameResumeWildGold,
};