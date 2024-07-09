const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const Player = require("../../../../config/db/queries/player/PlayerQueries");
const CustomError =require("../../helpers/CustomError/customError.js");
const statusCode =require("../../../../config/common/statusCode.js");
const asyncErrorHandler = require("../../helpers/asyncErrorHandler.js");



const authenticate = async (req, res, next) => {
    // Track IP of client
    req.clientIp = requestIp.getClientIp(req);

    // Get the authorization header
    let accessToken = req.headers["authorization"];

    if (typeof accessToken !== "undefined") {
      // Extract the token from the "Bearer <token>" format
      const bearer = accessToken.split(" ");
      accessToken = bearer[1];

      // Verify the token
      const decode = jwt.verify(
        accessToken,
        // eslint-disable-next-line no-undef
        process.env.JWT_PRIVATE_KEY,
        function (err, decoded) {
          if (err) return false;
          if (!decoded) return false;
          return decoded;
        }
      );

      // If token is not valid, send a 401 response
      if (!decode) 
         throw new CustomError("Login Expired !! Please login" ,statusCode.UNAUTHORIZED);

      // Find player details using the decoded token's id
      const player = await Player.findPlayerWallet(decode.id);

      // If player not found, send a 400 response
      if (!player) 
          throw new CustomError("Bad Request, Invalid Token" ,statusCode.BAD_REQUEST);

      // Attach user details to the request object
      req.user = {};
      req.user.id = player.player_id;
      req.user.wallet_id = player.wallet_id;
      
      // Proceed to the next middleware
      next();
    } else {
      // If authorization header is not present, send a 400 response
         throw new CustomError("Bad Request, Invalid Token",statusCode.BAD_REQUEST);
    }

}

module.exports = asyncErrorHandler(authenticate);