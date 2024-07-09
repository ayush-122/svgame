const statusCode = require("../../../../config/common/statusCode.js");

function errorHandler(err, req, res, next) {
  console.error(err);  // Log the actual error for debugging purposes

  let status = statusCode.INTERNAL_SERVER_ERROR;
  let message = "Internal Server Error";
 if (err.statusCode) {
    // Handle other errors with custom status codes
    status = err.statusCode;
    message = err.message;
  }

  res.status(status).json({
    status: false,
    message
  });
}

module.exports = errorHandler;
