const { validateBet } = require("../validator/BetValidator");
const validate = require("../../../../api/v1/validations/slotGame.validation");
const valueParser = require("../../../../api/v1/helpers/request/valueParser");

async function gamePlayMiddlewareFireShortInferno(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGamePlayValidation.validate(req.body); //add validation check for BuyFeatureAlso

    //Parse values
    req.body.credits = parseFloat(req.body.credits);
    req.body.bet = parseInt(req.body.bet);
    req.body.isBuyFeature = valueParser.parseBool(req.body.isBuyFeature);

    const isValidBet = validateBet(req.body);
    req.body.gameId = "1010"; //NOTE - Hardcoded GameId

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
async function gameContinueMiddlewareFireShortInferno(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGameContinueValidation.validate(req.body);
    req.body.gameId = "1010"; //NOTE - Hardcoded GameId

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

async function gameDoneMiddlewareFireShortInferno(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameDoneValidation.validate(req.body);
    req.body.gameId = "1010"; //NOTE - Hardcoded GameId

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

async function gameResumeMiddlewareFireShortInferno(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameResumeValidation.validate(req.body);
    req.body.gameId = "1010"; //NOTE - Hardcoded GameId

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
  gamePlayMiddlewareFireShortInferno,
  gameContinueMiddlewareFireShortInferno,
  gameDoneMiddlewareFireShortInferno,
  gameResumeMiddlewareFireShortInferno,
};
