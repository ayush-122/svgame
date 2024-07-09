/* eslint-disable no-undef */
//REVIEW - Check This file
const Constants = require("./Constants"); // Import Constants module
const GameRTPLevel = require("./GameRTPLevel"); // Import GameRTPLevel module
// const ResponseResolution = require('./ResponseResolution'); // Import ResponseResolution module

class ValidateProfileParametersAction {
  constructor(jurisdiction) {
    this.VALID_RTP_LEVELS = Object.values(GameRTPLevel);
    this.VALID_COIN_VALUES = [];
    this.VALID_BET_MULTIPLIERS = [];
    this.coinValuePattern = /^([1-9]\d*|0)(\.\d\d)$/;
    this.betMultiplierPattern = /^([1-9]\d*)$/;
    this.validMultipliers = [1];
    this.jurisdiction = jurisdiction;
  }

  validateParams(params) {
    const paramRoot = parseXml(params); // You need to implement a function to parse XML in JavaScript
    const paramAttributes = paramRoot.children;

    const coinVR = [];
    const betmVR = [];
    const dfltVR = [];
    const levlVR = [];
    const buyfVR = [];

    for (const paramAttribute of paramAttributes) {
      const paramName = paramAttribute.getAttribute("name");
      if (paramName === "coinValue") {
        coinVR.push(...this.validateCoinValues(paramAttribute));
      } else if (paramName === "betMultiplier") {
        betmVR.push(...this.validateBetMultipliers(paramAttribute));
      } else if (paramName === "level") {
        levlVR.push(...this.validateLevel(paramAttribute));
      } else if (paramName === "buyFeature") {
        buyfVR.push(...this.validateBuyFeature(paramAttribute));
      }
    }

    for (const paramAttribute of paramAttributes) {
      if (paramAttribute.getAttribute("name") === "defaults") {
        dfltVR.push(...this.validateDefaults(paramAttribute));
      }
    }

    if (coinVR.length === 0)
      coinVR.push(
        new ValidationResult(false, null, "missing Coin Value parameter")
      );
    if (betmVR.length === 0)
      betmVR.push(
        new ValidationResult(false, null, "missing Bet Multiplier parameter")
      );
    if (dfltVR.length === 0)
      dfltVR.push(
        new ValidationResult(false, null, "missing Defaults parameter")
      );
    if (levlVR.length === 0)
      levlVR.push(new ValidationResult(false, null, "missing Level parameter"));
    if (buyfVR.length === 0)
      buyfVR.push(
        new ValidationResult(false, null, "missing Buy Feature parameter")
      );

    return this.buildValidationResponse(coinVR, betmVR, dfltVR, levlVR, buyfVR);
  }

  buildValidationResponse(coinVR, betmVR, dfltVR, levlVR, buyfVR) {
    const responseElement = new Element("response");
    let allValid = true;
    let coinValues = "";
    let betMultiplier = "";
    let defaults = "";
    let level = "";
    let buyFeature = "";
    let token = "";

    for (const result of coinVR) {
      if (!result.isValid) {
        allValid = false;
      } else {
        coinValues += token + result.getData();
        token = ",";
      }
    }
    token = "";
    for (const result of betmVR) {
      if (!result.isValid) {
        allValid = false;
      } else {
        betMultiplier += token + result.getData();
        token = ",";
      }
    }
    token = "";
    for (const result of dfltVR) {
      if (!result.isValid) {
        allValid = false;
      } else {
        defaults += token + result.getData();
        token = ",";
      }
    }
    for (const result of levlVR) {
      if (!result.isValid) {
        allValid = false;
      } else {
        level = result.getData();
      }
    }
    for (const result of buyfVR) {
      if (!result.isValid) {
        allValid = false;
      } else {
        buyFeature = result.getData();
      }
    }

    if (allValid) {
      const paramElement = new Element("param");
      paramElement.addAttribute(new Attribute("coinValue", "" + coinValues));
      paramElement.addAttribute(
        new Attribute("betMultiplier", "" + betMultiplier)
      );
      paramElement.addAttribute(new Attribute("defaults", "" + defaults));
      paramElement.addAttribute(new Attribute("level", level));
      paramElement.addAttribute(new Attribute("buyFeature", buyFeature));
      responseElement.addAttribute(new Attribute("status", "ok"));
      responseElement.appendChild(paramElement);
    } else {
      const errorsElement = new Element("errors");
      this.processResult(errorsElement, coinVR, "coinValue");
      this.processResult(errorsElement, betmVR, "betMultiplier");
      this.processResult(errorsElement, dfltVR, "defaults");
      this.processResult(errorsElement, levlVR, "level");
      this.processResult(errorsElement, buyfVR, "buyFeature");
      responseElement.addAttribute(new Attribute("status", "validationErrors"));
      responseElement.appendChild(errorsElement);
    }
    return responseElement.toXML();
  }

  processResult(errorsElement, results, name) {
    for (const result of results) {
      if (!result.isValid) {
        const paramAttributeElement = new Element("paramAttribute");
        paramAttributeElement.addAttribute(new Attribute("name", name));
        paramAttributeElement.appendChild("ERROR: " + result.getError);
        errorsElement.appendChild(paramAttributeElement);
      }
    }
  }

  validateCoinValues(elem) {
    const validationResults = [];
    const coinValuesStr = elem.getFirstChildElement("value").getValue();
    const coinValues = coinValuesStr.split(",");
    if (coinValues.length === 0) {
      validationResults.push(
        new ValidationResult(false, null, "missing content for Coin Value")
      );
    } else {
      for (const coinValue of coinValues) {
        const trimmed = coinValue.trim();
        const matched = this.coinValuePattern.test(trimmed);
        validationResults.push(
          new ValidationResult(
            matched,
            trimmed,
            trimmed + " is not a valid Coin Value"
          )
        );
        if (matched) this.VALID_COIN_VALUES.push(trimmed);
      }
    }
    return validationResults;
  }

  validateBetMultipliers(elem) {
    const validationResults = [];
    const betMultipliersStr = elem.getFirstChildElement("value").getValue();
    const betMultipliers = betMultipliersStr.split(",");
    if (betMultipliers.length === 0) {
      validationResults.push(
        new ValidationResult(false, null, "missing content for Bet Multiplier")
      );
    } else {
      for (const betMultiplier of betMultipliers) {
        const trimmed = betMultiplier.trim();
        const matched =
          this.betMultiplierPattern.test(trimmed) &&
          this.validMultipliers.includes(parseInt(trimmed));
        validationResults.push(
          new ValidationResult(
            matched,
            trimmed,
            trimmed + " is not a valid Bet Multiplier"
          )
        );
        if (matched) this.VALID_BET_MULTIPLIERS.push(trimmed);
      }
    }
    return validationResults;
  }

  validateDefaults(elem) {
    const validationResults = [];
    const defaultsStr = elem.getFirstChildElement("value").getValue().trim();
    const defaults = defaultsStr.split(",");
    if (defaults.length === 0) {
      validationResults.push(
        new ValidationResult(false, null, "missing content for Defaults")
      );
    } else {
      let hasCV = false;
      let hasBM = false;
      for (const dflt of defaults) {
        const trimmed = dflt.trim();
        const content = trimmed.split(":");
        if (content.length !== 2) {
          validationResults.push(
            new ValidationResult(
              false,
              null,
              trimmed +
                ' is not a valid Defaults element (expected "ELEMENT:VALUE")'
            )
          );
        } else {
          const name = content[0].trim();
          const value = content[1].trim();
          const trimd = name + ":" + value;
          if (name === "coinValue") {
            validationResults.push(
              new ValidationResult(
                this.VALID_COIN_VALUES.includes(value),
                trimd,
                value + " is not a valid Defaults coinValue element"
              )
            );
            hasCV = true;
          } else if (name === "betMultiplier") {
            validationResults.push(
              new ValidationResult(
                this.VALID_BET_MULTIPLIERS.includes(value),
                trimd,
                value + " is not a valid Defaults betMultiplier element"
              )
            );
            hasBM = true;
          } else {
            validationResults.push(
              new ValidationResult(
                false,
                null,
                name +
                  ' is not a valid Defaults element name (expected "coinValue" or "betMultiplier")'
              )
            );
          }
        }
      }
      if (!hasCV) {
        validationResults.push(
          new ValidationResult(
            false,
            null,
            defaultsStr + " does not contain coinValue element (expected)"
          )
        );
      }
      if (!hasBM) {
        validationResults.push(
          new ValidationResult(
            false,
            null,
            defaultsStr + " does not contain betMultiplier element (expected)"
          )
        );
      }
    }
    return validationResults;
  }

  validateLevel(elem) {
    const validationResults = [];
    const trimmed = elem.getFirstChildElement("value").getValue().trim();
    if (trimmed === "") {
      validationResults.push(
        new ValidationResult(false, null, "missing content for Level")
      );
    } else {
      const level = parseInt(trimmed);
      const value = "" + level;
      if (this.VALID_RTP_LEVELS.includes(level)) {
        validationResults.push(
          new ValidationResult(
            !server_is_certified() || level_is_certified(level),
            value,
            value + " is not a certified Level"
          )
        );
      } else {
        validationResults.push(
          new ValidationResult(false, value, value + " is not a valid Level")
        );
      }
    }
    return validationResults;
  }

  validateBuyFeature(elem) {
    const validationResults = [];
    const trimmed = elem.getFirstChildElement("value").getValue().trim();
    if (trimmed === "") {
      validationResults.push(
        new ValidationResult(false, null, "missing content for Buy Feature")
      );
    } else {
      const buyFeature = parseInt(trimmed);
      const value = "" + buyFeature;
      validationResults.push(
        new ValidationResult(
          Constants.BUY_FEATURE === buyFeature,
          value,
          value + " is not a valid Buy Feature"
        )
      );
    }
    return validationResults;
  }
}

module.exports = ValidateProfileParametersAction;
