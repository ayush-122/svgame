const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const Player = require("../../../../config/db/queries/player/PlayerQueries");

module.exports = async (req, res, next) => {
  try {
    //Track IP of client
    req.clientIp = requestIp.getClientIp(req);

    let accessToken = req.headers["authorization"];

    if (typeof accessToken !== "undefined") {
      const bearer = accessToken.split(" ");
      accessToken = bearer[1];

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

      if (!decode) {
        return res.status(401).json({
          success: false,
          message: "Login Expired !! Please login."
        });
      }
      // let row = await Player.findById(decode.id);
      const row = await Player.findPlayerWallet(decode.id);

      if (!row) {
        return res.status(400).json({
          success: false,
          message: "Bad Request, Invalid Token"
        });
      }
      req.user = {};
      req.user.id = row.player_id;
      req.user.wallet_id = row.wallet_id;
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "Bad Request, Invalid Token"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error"
    });
  }
};
