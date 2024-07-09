// swaggerResponses.js

module.exports = {
  BadRequest: {
    description: "Bad Request",
    content: {
      "application/json": {
        example: {
          status: false,
          message: "Bad Request, Invalid Token"
        }
      }
    }
  },
  SpinNotFound: {
    description: "Not Found",
    content: {
      "application/json": {
        example: {
          status: "completed",
          message: "No pending spins found"
        }
      }
    }
  },
  NotFound: {
    description: "Not Found",
    content: {
      "application/json": {
        example: {
          status: "false",
          message: "Not Found"
        }
      }
    }
  },
  IncorrectParameters: {
    description: "Incorrect Parameters",
    content: {
      "application/json": {
        example: {
          status: false,
          message: "Parameter_Error_is_displayed"
        }
      }
    }
  },
  Unauthorized: {
    description: "Login Expired",
    content: {
      "application/json": {
        example: {
          status: false,
          message: "Login Expired !! Please login."
        }
      }
    }
  },
  InternalServerError: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        example: {
          status: false,
          message: "Internal Server Error"
        }
      }
    }
  }
};
