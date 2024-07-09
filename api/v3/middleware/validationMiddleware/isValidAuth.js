const validate = require("../../validations/auth.validation");
const statusCode = require("../../../../config/common/statusCode");
const CustomError = require("../../helpers/CustomError/customError");



function isValidLogin(req, res, next) {
  //Validation
  const { error } = validate.postLoginValidation.validate(req.body); //add validation check for BuyFeatureAlso
    if(error)
      return next(new CustomError(error.details[0].message ,statusCode.BAD_REQUEST));
  next();
}

function isValidCreateAccount(req, res, next) {
  //Validation
  const { error } = validate.postCreateAccountValidation.validate(req.body); //add validation check for BuyFeatureAlso
  if(error)
    return next(new CustomError(error.details[0].message ,statusCode.BAD_REQUEST));
  next();
}

function isValidPasswordChange(req,res,next){
  //validation
  const { error } = validate.changePasswordValidation.validate(req.body); 
  if(error)
    return next(new CustomError(error.details[0].message ,statusCode.BAD_REQUEST));
  
  next();


}

module.exports = { isValidLogin, isValidCreateAccount ,isValidPasswordChange };
