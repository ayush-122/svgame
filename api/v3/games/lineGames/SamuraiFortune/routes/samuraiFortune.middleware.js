const { validateBet } = require("../validator/BetValidator");
const validate = require("../../../../validations/slotGame.validation");
const valueParser = require("../../../../helpers/request/valueParser");
const { GAME_ID } = require("../configuration/GameConstant");
const statusCode = require("../../../../../../config/common/statusCode");
const asyncErrorHandler = require("../../../../helpers/asyncErrorHandler");


async function gamePlayMiddlewareSamuraiFortune(req, res, next) {
  
    //Validation
    const { error } = validate.postGamePlayValidation.validate(req.body); //add validation check for BuyFeatureAlso

    //Parse values
    req.body.credits = parseFloat(req.body.credits);
    req.body.bet = parseInt(req.body.bet);
    req.body.isBuyFeature = valueParser.parseBool(req.body.isBuyFeature);

    const isValidBet = validateBet(req.body);
    req.body.gameId = GAME_ID;

    if (error || !isValidBet.status) {
      return res.status(statusCode.BAD_REQUEST).json({
        status: false,
        message: isValidBet.message || error.details[0].message,
      });
    }
    next();
}
async function gameContinueMiddlewareSamuraiFortune(req, res, next) {

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
  }

async function gameDoneMiddlewareSamuraiFortune(req, res, next) {

    //Validation
    const { error } = validate.putGameDoneValidation.validate(req.body);
    req.body.gameId = GAME_ID;

    if (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  }

async function gameResumeMiddlewareSamuraiFortune(req, res, next) {
  
    //Validation
    const { error } = validate.putGameResumeValidation.validate(req.body);
    req.body.gameId = GAME_ID;

    if (error) {
      return res.status(statusCode.BAD_REQUEST).json({
        status: false,
        message: error.details[0].message,
      });
    }
    next();
  } 


module.exports = {
  gamePlayMiddlewareSamuraiFortune:asyncErrorHandler(gamePlayMiddlewareSamuraiFortune),
  gameContinueMiddlewareSamuraiFortune:asyncErrorHandler(gameContinueMiddlewareSamuraiFortune),
  gameDoneMiddlewareSamuraiFortune,
  gameResumeMiddlewareSamuraiFortune,
};
