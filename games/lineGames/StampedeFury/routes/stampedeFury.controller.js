const stampedeFury = require("./../engine/requestHandler/StateManagement");
const gamePlay = require("../../../../api/v1/services/gamePlay/gamePlay.service");

//  **************** BASE GAME PLAY ******************
async function postGamePlayStampedeFury(req, res) {
  try {
    const obj = await gamePlay.processBaseGamePlay(req);

    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = "BASE";
    const newState = await stampedeFury.stateHandler(nextState, obj.payload);

    //Calculating Win
    const baseRespinCreditWon = newState.baseRespinCreditWon > 0 ? newState.baseRespinCreditWon : 0;

    const credit_amount = newState.mainSpinCreditsWon + newState.freeSpinCreditsWon + baseRespinCreditWon;

    credit_amount;
    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);
    return res.status(200).json(dbReport);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

//  **************** FREE/BONUS GAME PLAY ******************
async function postGameContinueStampedeFury(req, res) {
  try {
    if (req.body.state == "FREE") {
      const obj = await gamePlay.processFreeGamePlay(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = "FREE";
      const newState = await stampedeFury.stateHandler(nextState, obj.payload, obj.lastState.raw_response);

      //Calculating Win
      const credit_amount = newState.freeSpinCreditsWon;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    } else return res.status(400).json({ status: false, message: "Invalid Request" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

//  **************** DONE REQUEST ******************
async function postGameDoneStampedeFury(req, res) {
  await gamePlay.postDone(req, res);
}

// ? **************** RESUME REQUEST ******************
async function postGameResumeStampedeFury(req, res) {
  await gamePlay.postResume(req, res);
}
module.exports = {
  postGamePlayStampedeFury,
  postGameContinueStampedeFury,
  postGameDoneStampedeFury,
  postGameResumeStampedeFury,
};
