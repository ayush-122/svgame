// utils/errorResponse.js

class CustomError extends Error {
    constructor(message, status) {
      super(message);
      this.statusCode = status;
      this.isOperational =true;
      Error.captureStackTrace(this,CustomError);
    }
  }
  
  module.exports = CustomError;
  