const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Player = require("../../../config/db/queries/player/PlayerQueries");
const Wallet = require("../../../config/db/queries/wallet/WalletQueries");
const statusCode = require("../../../config/common/statusCode");
const CustomError = require("../helpers/CustomError/customError.js");
const asyncErrorHandler = require("../helpers/asyncErrorHandler.js");

//NOTE - Handles the user login and provide JWT token to the user
async function postLogin(req, res, next) {
  const { username, password } = req.body;

  const player = await Player.findPlayerViaUsername(username);
   if(!player)
    return next(
      new CustomError("incorrect username/password", statusCode.UNAUTHORIZED)
    );
  // ******************************Player Logs to be Added

  let doesMatch = await bcrypt.compare(password, player.password);

  if (!doesMatch)
    return next(
      new CustomError("incorrect username/password", statusCode.UNAUTHORIZED)
    );

  const accessToken = jwt.sign(
    {
      id: player.player_id.toString(),
      wallet_id: player.wallet_id,
    },
    // eslint-disable-next-line no-undef
    process.env.JWT_PRIVATE_KEY,
    {
      // eslint-disable-next-line no-undef
      expiresIn: process.env.JWT_KEY_EXPIRES_IN,
    }
  );

  //Send balance
  const { balance } = await Wallet.findWallet(player.wallet_id);

  return res.status(statusCode.OK).json({
    status: true,
    message: "User Login Successful",
    balance,
    data: accessToken,
  });
}

//POST : Create account
async function postCreateAccount (req, res, next) {
  const { username, password, balance, fullname, email } = req.body;
  const hashPassword = await bcrypt.hash(password, 13);

  //check if player exist
  const user = await Player.findPlayerViaUsername(username);

  if (user)
    return next(new CustomError("Username already Exist", statusCode.CONFLICT));

  const player_wallet = await Wallet.createWallet(parseFloat(balance));

  //create new player
  let player = await Player.createPlayer(
    username,
    hashPassword,
    player_wallet.wallet_id,
    fullname,
    email
  );

  if (!player)
    return next(
      new CustomError(
        "Failed to create new record",
        statusCode.SERVICE_UNAVAILABLE
      )
    );

  return res
    .status(statusCode.CREATED)
    .json({ status: true, message: "Account has been created." });
}

async function changePassword(req, res, next){
  const { currentPassword, newPassword } = req.body;

  const playerId = req.user.id;

  const player = await Player.findPlayerViaUserId(playerId);
  // console.log(player);
  if (!player)
    return next(new CustomError("Player does not exist", statusCode.NOT_FOUND));

  //check if old/current password is correct
  const isMatch = await bcrypt.compare(currentPassword, player.password);
  if (!isMatch)
    return next(
      new CustomError("Incorrect current password", statusCode.BAD_REQUEST)
    );

  const hashPassword = await bcrypt.hash(newPassword, 13);

  //update player
  // console.log(playerId,hashPassword);
  await Player.updatePlayerViaUserID(playerId, hashPassword);
  res.status(statusCode.OK).json({
    message: "Password updated successfully",
  });
};

module.exports = {
  postLogin: asyncErrorHandler(postLogin),
  postCreateAccount: asyncErrorHandler(postCreateAccount),
  changePassword: asyncErrorHandler(changePassword),
};
