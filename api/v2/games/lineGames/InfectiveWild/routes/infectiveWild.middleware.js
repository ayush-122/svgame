const { validateBet } = require("../validator/BetValidator");
const validate = require("../../../../validations/slotGame.validation");
const valueParser = require("../../../../helpers/request/valueParser");
const { GAME_ID } = require("../configuration/GameConstant");

async function gamePlayMiddlewareInfectiveWild(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGamePlayValidation.validate(req.body); //add validation check for BuyFeatureAlso

    //Parse values
    req.body.credits = parseFloat(req.body.credits);
    req.body.bet = parseInt(req.body.bet);
    req.body.isBuyFeature = valueParser.parseBool(req.body.isBuyFeature);

    const isValidBet = validateBet(req.body);
    req.body.gameId = GAME_ID;

    if (error || !isValidBet.status) {
      return res.status(400).json({
        status: false,
        message: isValidBet.message || error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
async function gameContinueMiddlewareInfectiveWild(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGameContinueValidation.validate(req.body);
    req.body.gameId = GAME_ID;

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
async function gameDoneMiddlewareInfectiveWild(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameDoneValidation.validate(req.body);
    req.body.gameId = GAME_ID;

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
async function gameResumeMiddlewareInfectiveWild(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameResumeValidation.validate(req.body);
    req.body.gameId = GAME_ID;

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  gamePlayMiddlewareInfectiveWild,
  gameContinueMiddlewareInfectiveWild,
  gameDoneMiddlewareInfectiveWild,
  gameResumeMiddlewareInfectiveWild,
};
