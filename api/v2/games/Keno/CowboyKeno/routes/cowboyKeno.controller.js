const keno = require("../engine/requestHandler/StateManagement");
const gamePlay = require("../../../../services/gamePlay/keno.featureGamePlay.service");

// ? **************** BASE GAME PLAY ******************
async function postGamePlayKeno(req, res) {
  try {
    const obj = await gamePlay.processBaseGamePlay(req);
    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = "BASE";
    const newState = await keno.stateHandler(nextState, obj.payload);

    //TODO Be added in Update DataBase
    newState.gameId = 2010;
    //Calculating Win
    const credit_amount = parseFloat(newState.win);

    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.last_state);

    return res.status(200).json(dbReport);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

// ? **************** FREE GAME PLAY ******************
async function postFreeKeno(req, res) {
  const obj = await gamePlay.processFreeGamePlay(req);
  if (!obj.status) {
    return res.status(400).json(obj);
  }
  const currentState = "FREE";
  const newState = await keno.stateHandler(currentState, obj.payload);
  //TODO Be added in Update DataBase
  newState.gameId = 2010;
  //Calculating Win
  const credit_amount = parseFloat(newState.win);
  const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.last_state);
  return res.status(200).json(dbReport);
}

// ? **************** EXTRA_DRAW/WHEEL_BONUS GAME PLAY ******************
async function postContinueKeno(req, res) {
  try {
    const currentState = req.body.state;
    let obj = {};

    //*************EXTRA DRAW*****************
    if (currentState == "EXTRA_DRAW") {
      obj = await gamePlay.processExtraDrawGamePlay(req);
      if (!obj.status) {
        return res.status(400).json(obj);
      }
      const newState = await keno.stateHandler(currentState, obj.payload);
      //TODO Be added in Update DataBase
      //Calculating Win
      const credit_amount = parseFloat(newState.win);
      const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.last_state);
      return res.status(200).json(dbReport);
    }
    //*************WHEEL BONUS*****************
    else if (currentState == "WHEEL_BONUS") {
      obj = await gamePlay.processBonusGamePlay(req);
      if (!obj.status) {
        return res.status(400).json(obj);
      }
      const newState = await keno.stateHandler(currentState, obj.payload);
      //TODO Be added in Update DataBase
      //Calculating Win
      const credit_amount = parseFloat(newState.win);
      let dbReport = {};

      //Check if BONUS State is left
      if (newState.nextStateDetails.states.at(-1) == "WHEEL_BONUS")
        dbReport = await gamePlay.updateBonusDatabase(newState, req, credit_amount, obj.last_state);
      else dbReport = await gamePlay.updateDatabase(newState, req, credit_amount, obj.last_state);
      return res.status(200).json(dbReport);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

// ? **************** EXTRA_DRAW/WHEEL_BONUS GAME PLAY ******************
async function postAcceptWheelKeno(req, res) {
  try {
    const currentState = req.body.state;
    if (currentState == "WHEEL_BONUS") {
      let obj = {};
      obj = await gamePlay.processBonusGamePlay(req);
      if (!obj.status) {
        return res.status(400).json(obj);
      }
      if (obj.last_state.current_state != "WHEEL_BONUS") {
        return res.status(400).json({ status: false, message: "Invalid Request" });
      }
      let credit_amount = obj.last_state.win;
      const dbReport = await gamePlay.addBonusBalance(req, obj.last_state, credit_amount);
      return res.status(200).json(dbReport);
    } else {
      return res.status(400).json({ status: false, message: "Invalid Request, Incorrect State" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

// ? **************** DONE REQUEST ******************
async function postGameDoneKeno(req, res) {
  await gamePlay.postDone(req, res);
}

// ? **************** RESUME REQUEST ******************
async function postGameResumeCowboyKeno(req, res) {
  await gamePlay.postResume(req, res);
}

module.exports = {
  postGamePlayKeno,
  postFreeKeno,
  postContinueKeno,
  postAcceptWheelKeno,
  postGameDoneKeno,
  postGameResumeCowboyKeno,
};
