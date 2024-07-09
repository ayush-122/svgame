const Joi = require("joi");

const postGamePlayValidation = Joi.object({
  credits: Joi.number().min(0).required().messages({
    "number.base": "Credits must be a number",
    "number.min": "Credits must be at least 0",
    "any.required": "Credits is a required field",
  }),
  betNumbers: Joi.array().items(Joi.number().integer().min(0)).required().unique().messages({
    "any.required": "BetNumbers is a required field",
    "array.base": "BetNumbers must be an array",
    "array.includesRequiredUnknowns": "BetNumbers must contain only integers",
    "number.base": "Each element in BetNumbers must be a number",
    "number.integer": "Each element in BetNumbers must be an integer",
    "number.min": "Each element in BetNumbers must be at least 0",
  }),
  bet: Joi.number().min(0).required().messages({
    "number.base": "Bet must be a number",
    "number.min": "Bet must be at least 0",
    "any.required": "Bet is a required field",
  }),
  numberCount: Joi.number().min(2).max(10).required().messages({
    "number.base": "numberCount must be a number",
    "number.min": "numberCount must be at least 2",
    "any.required": "numberCount is a required field",
  }),

  // riskLevel: Joi.string()
  //   .valid("HIGH", "LOW", "MEDIUM", "CLASSIC")
  //   .required()
  //   .messages({
  //     "any.required": "RiskLevel is a required field",
  //     "any.only": "RiskLevel must be one of 'HIGH', 'LOW', 'MEDIUM', 'CLASSIC'"
  //   })
});
const postGameFreeValidation = Joi.object({
  betNumbers: Joi.array().items(Joi.number().integer().min(0)).required().unique().messages({
    "any.required": "BetNumbers is a required field",
    "array.base": "BetNumbers must be an array",
    "array.includesRequiredUnknowns": "BetNumbers must contain only integers",
    "number.base": "Each element in BetNumbers must be a number",
    "number.integer": "Each element in BetNumbers must be an integer",
    "number.min": "Each element in BetNumbers must be at least 0",
  }),
  numberCount: Joi.number().min(2).max(10).required().messages({
    "number.base": "numberCount must be a number",
    "number.min": "numberCount must be at least 2",
    "any.required": "numberCount is a required field",
  }),
});

const postGameContinueValidation = Joi.object({
  state: Joi.string().required(),
});

const putGameDoneValidation = Joi.object().keys({}).unknown(false);
const putGameResumeValidation = Joi.object().keys({}).unknown(false);

module.exports = {
  postGamePlayValidation,
  postGameFreeValidation,
  postGameContinueValidation,
  putGameDoneValidation,
  putGameResumeValidation,
};
