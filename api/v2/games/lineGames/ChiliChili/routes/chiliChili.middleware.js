const { validateBet } = require("../validator/BetValidator");
const validate = require("../../../../validations/slotGame.validation");
const valueParser = require("../../../../helpers/request/valueParser");

async function gamePlayMiddlewareChiliChili(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGamePlayValidation.validate(req.body); //add validation check for BuyFeatureAlso

    //Parse values
    req.body.credits = parseFloat(req.body.credits);
    req.body.bet = parseInt(req.body.bet);
    req.body.isBuyFeature = valueParser.parseBool(req.body.isBuyFeature);

    const isValidBet = validateBet(req.body);
    req.body.gameId = "1004"; //NOTE - Hardcoded GameId

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
async function gameContinueMiddlewareChiliChili(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGameContinueValidation.validate(req.body);
    req.body.gameId = "1004"; //NOTE - Hardcoded GameId

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

async function gameDoneMiddlewareChiliChili(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameDoneValidation.validate(req.body);
    req.body.gameId = "1004"; //NOTE - Hardcoded GameId

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

async function gameResumeMiddlewareChiliChili(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameResumeValidation.validate(req.body);
    req.body.gameId = "1004"; //NOTE - Hardcoded GameId

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
  gamePlayMiddlewareChiliChili,
  gameContinueMiddlewareChiliChili,
  gameDoneMiddlewareChiliChili,
  gameResumeMiddlewareChiliChili,
};
