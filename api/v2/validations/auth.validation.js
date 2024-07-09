const Joi = require("joi");

const postCreateAccountValidation = Joi.object({
  username: Joi.string()
    .pattern(/^[a-z][a-z0-9_.-]*$/)
    .required()
    .messages({
      "string.pattern.base":
        "username must start with a lowercase letter and can contain lowercase letters, numbers, hyphens, periods, and underscores",
      "string.empty": "username cannot be an empty field",
      "any.required": "username is a required field",
    }),
  password: Joi.string().required().messages({
    "string.empty": `password cannot be an empty field`,
    "any.required": `password is a required field`,
  }),
  balance: Joi.number().min(0).required().messages({
    "number.base": "balance must be a number",
    "number.min": "balance must be at least 0",
    "any.required": "balance is a required field",
  }),
});
const postLoginValidation = Joi.object({
  username: Joi.string()
    .pattern(/^[a-z][a-z0-9_.-]*$/)
    .required()
    .messages({
      "string.pattern.base":
        "username must start with a lowercase letter and can contain lowercase letters, numbers, hyphens, periods, and underscores",
      "string.empty": "username cannot be an empty field",
      "any.required": "username is a required field",
    }),
  password: Joi.string().required().messages({
    "string.empty": `password cannot be an empty field`,
    "any.required": `password is a required field`,
  }),
});

const changePasswordValidation = Joi.object({

  currentPassword: Joi.string().required().messages({
    "string.empty": `old password cannot be an empty field`,
    "any.required": `old Password is a required field`,
  }),

  newPassword: Joi.string().required().invalid(Joi.ref('currentPassword')).messages({
    "string.empty": `new password cannot be an empty field`,
    "any.required": `new password is a required field`,
    "any.invalid":`New password cannot be same as current account password`
  }),
});

module.exports = { postLoginValidation, postCreateAccountValidation ,changePasswordValidation};
