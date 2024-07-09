const milkyways = require("../engine/requestHandler/StateManagement");
const gamePlay = require("../../../../services/gamePlay/waysCascade.gamePlay.service");

//  **************** BASE GAME PLAY ******************
async function postGamePlayMilkyWays(req, res) {
  try {
    const obj = await gamePlay.processBaseGamePlay(req);
    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = "BASE";
    const newState = await milkyways.stateHandler(nextState, obj.payload);

    //Calculating Win
    // const baseRespinCreditWon =
    //   newState.baseRespinCreditWon > 0 ? newState.baseRespinCreditWon : 0;

    const credit_amount = newState.totalCreditsWon;

    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);

    return res.status(200).json(dbReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

//  **************** FREE/BONUS GAME PLAY ******************
async function postGameContinueMilkyWays(req, res) {
  try {
    if (req.body.state == "FREE") {
      const obj = await gamePlay.processFreeGamePlay(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = "FREE";
      const newState = await milkyways.stateHandler(nextState, obj.payload, obj.previousState);

      //Calculating Win
      const credit_amount = newState.freeSpinCreditsWon;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    } else return res.status(400).json({ status: false, message: "Invalid Request" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

// ? **************** DONE REQUEST ******************
async function postGameDoneMilkyWays(req, res) {
  await gamePlay.postDone(req, res);
}

module.exports = {
  postGamePlayMilkyWays,
  postGameContinueMilkyWays,
  postGameDoneMilkyWays,
};
