const { CREDITVALUE } = require("../configuration/GameConstant");

class BetValidator {
  static creditValueValid(creditValue) {
    const validCreditValueList = CREDITVALUE;
    if (validCreditValueList.includes(creditValue)) return true;
    return false;
  }
  // static betValueValid(bet) {
  //   if (bet == BASE_CREDITS_BET) return true;
  //   return false;
  // }

  static async gameIdValid(gameId) {
    try {
      const gameData = require("../../../../../../config/common/GameData.json");
      if (Object.prototype.hasOwnProperty.call(gameData, gameId)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Invalid game Id :", error);
      return false;
    }
  }

  static validateBet(req) {
    let gameId = req.gameId;
    let creditValue = req.credits;

    // bet is null in request
    if (BetValidator.creditValueValid(creditValue) && BetValidator.gameIdValid(gameId)) {
      return { status: true }; // all good
    } else {
      return { status: false, message: "Invalid Values" };
    }
  }
}

// Export the BetValidator class
module.exports = BetValidator;
