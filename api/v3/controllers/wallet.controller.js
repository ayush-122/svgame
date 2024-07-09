const wallet = require("../services/wallet/wallet.service");
const statusCode =require("../../../config/common/statusCode.js")
const asyncErrorHandler =require("../helpers/asyncErrorHandler.js");

async function addBalance(req, res,next) {
    const userId = req.user.id;
    const walletId = req.user.wallet_id;
    const credit_amount = req.body.amount;
    const clientIp = req.clientIp;

    const wallet_response = await wallet.addBalance(userId, walletId, credit_amount, clientIp);
  

    if (!wallet_response.status) return res.status(statusCode.BAD_REQUEST).json(wallet_response);

    return res.status(statusCode.OK).json(wallet_response);
  };

module.exports = { addBalance: asyncErrorHandler(addBalance) };
