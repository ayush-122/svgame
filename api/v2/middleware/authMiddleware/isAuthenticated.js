const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const Player = require("../../../../config/db/queries/player/PlayerQueries");

module.exports = async (req, res, next) => {
  try {
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
        return res.status(401).json({
          success: false,
          message: "Login Expired !! Please login."
        });

      // Find player details using the decoded token's id
      const player = await Player.findPlayerWallet(decode.id);

      // If player not found, send a 400 response
      if (!player) 
        return res.status(400).json({
          success: false,
          message: "Bad Request, Invalid Token"
        });

      // Attach user details to the request object
      req.user = {};
      req.user.id = player.player_id;
      req.user.wallet_id = player.wallet_id;
      
      // Proceed to the next middleware
      next();
    } else {
      // If authorization header is not present, send a 400 response
      return res.status(400).json({
        success: false,
        message: "Bad Request, Invalid Token"
      });
    }
  } catch (error) {
    // Log the error and send a 500 response in case of an internal server error
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error"
    });
  }
};
