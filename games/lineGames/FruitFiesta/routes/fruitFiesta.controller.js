const fruitFiesta = require("../engine/requestHandler/StateManagement");
const GameConstant = require("../configuration/GameConstant");
const gamePlay = require("../../../../api/v1/services/gamePlay/gamePlay.service");

//  **************** BASE GAME PLAY ******************
async function postGamePlayFruitFiesta(req, res) {
  try {
    const obj = await gamePlay.processBaseGamePlay(req);
    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = "BASE";
    const newState = await fruitFiesta.stateHandler(nextState, obj.payload);

    //Calculating Win
    const baseRespinCreditWon = newState.baseRespinCreditWon > 0 ? newState.baseRespinCreditWon : 0;

    const credit_amount = newState.mainSpinCreditsWon + newState.freeSpinCreditsWon + baseRespinCreditWon;

    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);

    return res.status(200).json(dbReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

//  **************** FREE/BONUS GAME PLAY ******************
async function postGameContinueFruitFiesta(req, res) {
  try {
    if (req.body.state == "FREE") {
      const obj = await gamePlay.processFreeGamePlay(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = "FREE";
      const newState = await fruitFiesta.stateHandler(nextState, obj.payload, obj.lastState.raw_response);
      //Calculating Win
      const credit_amount = newState.freeSpinCreditsWon;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    }
    // *************** Bonus ****************
    else if (req.body.state === "RESPIN") {
      const obj = await gamePlay.processRespinGamePlay(req, req.body);
      if (!obj.status) return res.status(400).json(obj);

      const nextState = GameConstant.RESPIN_REQUEST;

      const newState = await fruitFiesta.stateHandler(nextState, obj.payload, obj.lastState.raw_response);
      //Calculating Win
      const credit_amount = newState.baseRespinCreditWon;
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.lastState);
      return res.status(200).json(dbReport);
    } else return res.status(400).json({ status: false, message: "Invalid Request" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

// ? **************** DONE REQUEST ******************
async function postGameDoneFruitFiesta(req, res) {
  await gamePlay.postDone(req, res);
}

// ? **************** RESUME REQUEST ******************
async function postGameResumeFruitFiesta(req, res) {
  await gamePlay.postResume(req, res);
}
module.exports = {
  postGamePlayFruitFiesta,
  postGameContinueFruitFiesta,
  postGameDoneFruitFiesta,
  postGameResumeFruitFiesta,
};
