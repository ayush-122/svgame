const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Player = require("../../../config/db/queries/player/PlayerQueries");
const Wallet = require("../../../config/db/queries/wallet/WalletQueries");
const { Prisma } = require("@prisma/client");

//NOTE - Handles the user login and provide JWT token to the user

async function postLogin(req, res) {
  try {
    const { username, password } = req.body;

    const record = await Player.findPlayerViaUsername(username);

    // ******************************Player Logs to be Added

    if (!record) {
      return res.status(401).json({
        status: false,
        message: "Incorrect username/password.",
      });
    }

    let doesMatch = await bcrypt.compare(password, record.password);

    if (!doesMatch) {
      return res.status(401).json({
        status: false,
        message: "Incorrect username/password.",
      });
    }

    const accessToken = jwt.sign(
      {
        id: record.player_id.toString(),
        wallet_id: record.wallet_id,
      },
      // eslint-disable-next-line no-undef
      process.env.JWT_PRIVATE_KEY,
      {
        // eslint-disable-next-line no-undef
        expiresIn: process.env.JWT_KEY_EXPIRES_IN,
      }
    );

    //Send balance
    const { balance } = await Wallet.findWallet(record.wallet_id);

    return res.status(200).json({
      status: true,
      message: "User Login Successful",
      balance,
      data: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Sever Error",
    });
  }
}
// POST : Create account
async function postCreateAccount(req, res) {
  try {
    const { username, password, balance, fullname, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 13);

    //check if player exist
    const user = await Player.findPlayerViaUsername(username);
    if (user)
      return res
        .status(409)
        .json({ status: false, message: "Username Already Exist" });

    const player_wallet = await Wallet.createWallet(parseFloat(balance));

    //create new player
    let newPlayer = await Player.createPlayer(
      username,
      hashPassword,
      player_wallet.wallet_id,
      fullname,
      email
    );

    if (!newPlayer) {
      return res.status(503).json({
        status: false,
        message: "Failed to create new record.",
      });
    }

    return res
      .status(201)
      .json({ status: true, message: "Account has been created." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Sever Error",
    });
  }
}

async function changePassword(req,res){
  try{


     const {currentPassword ,newPassword}=req.body;
    
         const playerId=req.user.id;
  


     const player =await Player.findPlayerViaUserId(playerId);
    // console.log(player);

     if(!player)
        return res.status(404).json({message:'Player does not exists'});


      
      //check if old/current password is correct
      const isMatch = await bcrypt.compare(currentPassword,player.password);
      if (!isMatch)
        return res.status(400).json({ message: 'Incorrect current password' });


      const hashPassword = await bcrypt.hash(newPassword, 13);
      
      
      //update player 
     // console.log(playerId,hashPassword);
       await Player.updatePlayerViaUserID(playerId,hashPassword);
       res.status(200).json({
        message:"Password updated successfully"
       });

     

  }catch(error)
  {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Sever Error",
    });
  }


}

module.exports = {
  postLogin,
  postCreateAccount,
  changePassword
};
