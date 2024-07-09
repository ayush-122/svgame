const wallet = require("../services/wallet/wallet.service");

async function addBalance(req, res) {
  try {
    const userId = req.user.id;
    const walletId = req.user.wallet_id;
    const credit_amount = req.body.amount;
    const clientIp = req.clientIp;

    const wallet_response = await wallet.addBalance(userId, walletId, credit_amount, clientIp);

    if (!res.status) return res.status(400).json(wallet_response);

    return res.status(200).json(wallet_response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Sever Error",
    });
  }
}

module.exports = { addBalance };
