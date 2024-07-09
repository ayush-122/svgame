/**
 * Module providing a map of error codes to their corresponding messages.
 * @module ErrorMessages
 */

const ERROR_MAP = {
  200: "Valid Request",
  404: "Invalid User",
  400: "Not Enough Credits",
  401: "Invalid Request Type",
  500: "Internal Server Error"
};

// Additional logging/reporting functionality can be added here

module.exports = { ERROR_MAP };
