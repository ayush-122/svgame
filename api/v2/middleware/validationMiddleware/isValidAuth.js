const validate = require("../../validations/auth.validation");

function isValidLogin(req, res, next) {
  //Validation
  const { error } = validate.postLoginValidation.validate(req.body); //add validation check for BuyFeatureAlso
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  next();
}

function isValidCreateAccount(req, res, next) {
  //Validation
  const { error } = validate.postCreateAccountValidation.validate(req.body); //add validation check for BuyFeatureAlso
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  next();
}

function isValidPasswordChange(req,res,next){
  //validation
  const { error } = validate.changePasswordValidation.validate(req.body); 
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();


}

module.exports = { isValidLogin, isValidCreateAccount ,isValidPasswordChange };
