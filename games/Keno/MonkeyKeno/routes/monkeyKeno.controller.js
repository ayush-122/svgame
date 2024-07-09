const keno = require("../engine/requestHandler/StateManagement");
// const { validateBet } = require("../validator/BetValidator");
const gamePlay = require("../../../../api/v1/services/gamePlay/keno.gamePlay.service");
// const validate = require("../../../../api/v1/validations/slotGame.validation");

//  **************** BASE GAME PLAY ******************
async function postGamePlayKeno(req, res) {
  try {
    //Validation
    // const { error } = validate.postGamePlayValidation.validate(req.body); //add validation check for BuyFeatureAlso
    req.body.gameId = "2016"; // ! Hardcoded GameId

    // const isValidBet = validateBet(req.body);

    // if (error || !isValidBet.status) {
    //   return res.status(400).json({
    //     status: false,
    //     message: isValidBet.message || error.details[0].message
    //   });
    // }
    const obj = await gamePlay.processBaseGamePlay(req);
    if (!obj.status) {
      return res.status(400).json(obj);
    }
    const nextState = "BASE";
    const newState = await keno.stateHandler(nextState, obj.payload);

    //Calculating Win
    const credit_amount = parseFloat(newState.totalWon);

    const dbReport = await gamePlay.updateDatabase(newState, req, credit_amount);

    return res.status(200).json(dbReport);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}

// ? **************** DONE REQUEST ******************
async function postGameDoneKeno(req, res) {
  await gamePlay.postDone(req, res);
}

module.exports = {
  postGamePlayKeno,

  postGameDoneKeno,
};
