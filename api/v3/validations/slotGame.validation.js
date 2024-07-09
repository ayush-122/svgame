const Joi = require("joi");

const postGamePlayValidation = Joi.object({
  // playerId: Joi.string().required().messages({
  //   "string.empty": "PlayerID cannot be an empty field",
  //   "any.required": "PlayerID is a required field"
  // }),
  // gameId: Joi.string().required().messages({
  //   "string.empty": `GameID cannot be an empty field`,
  //   "any.required": `GameID is a required field`
  // }),
  credits: Joi.number().min(0).required().messages({
    "number.min": "Credits must be at least 0",
    "any.required": "Credits is a required field",
  }),
  bet: Joi.number().min(0).required().messages({
    "number.min": "Bet must be at least 0",
    "any.required": "Bet is a required field",
  }),
  // numberOfLines: Joi.number().min(0).required().messages({
  //   "number.min": "NumberOfLines must be at least 0",
  //   "any.required": "NumberOfLines is a required field"
  // }),
  isBuyFeature: Joi.boolean().required().messages({
    "any.required": "isBuyFeature is a required field",
  }),
});

const postGameContinueValidation = Joi.object({
  state: Joi.string().required(),
});

const putGameDoneValidation = Joi.object().keys({}).unknown(false);
const putGameResumeValidation = Joi.object().keys({}).unknown(false);

module.exports = {
  postGamePlayValidation,
  postGameContinueValidation,
  putGameDoneValidation,
  putGameResumeValidation,
};
