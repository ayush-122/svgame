const validate = require("../../../../api/v1/validations/featureKenoGame.validation");

async function gamePlayMiddlewareCowboyKeno(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGamePlayValidation.validate(req.body); //add validation check for BuyFeatureAlso

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    req.body.gameId = 2010; // ! Hardcoded GameId
    if (req.body.betNumbers.length !== req.body.numberCount)
      return res.status(400).json({
        status: false,
        message: "Invalid Values",
      });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function gameContinueMiddlewareCowboyKeno(req, res, next) {
  try {
    //Validation
    const { error } = validate.postGameContinueValidation.validate(req.body); //add validation check for BuyFeatureAlso

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }
    req.body.gameId = 2010; // ! Hardcoded GameId
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function gameDoneMiddlewareCowboyKeno(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameDoneValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    req.body.gameId = 2010; // ! Hardcoded GameId
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

async function gameResumeMiddlewareCowboyKeno(req, res, next) {
  try {
    //Validation
    const { error } = validate.putGameResumeValidation.validate(req.body);
    req.body.gameId = 2010; //NOTE - Hardcoded GameId

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
  gamePlayMiddlewareCowboyKeno,
  gameContinueMiddlewareCowboyKeno,
  gameDoneMiddlewareCowboyKeno,
  gameResumeMiddlewareCowboyKeno,
};
