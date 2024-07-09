const WalletQueries = require("../../../../config/db/queries/wallet/WalletQueries");

async function addBalance(userId, walletId, credit_amount, clientIp) {
  const wallet_credit_response = await WalletQueries.addBalance(
    walletId,
    credit_amount,
    clientIp,
    userId,
    "USER_ADDED"
  );

  const response = {
    status: wallet_credit_response.status,
    message: wallet_credit_response.message,
    balance: wallet_credit_response.balance || "NA",
  };

  return response;
}

module.exports = { addBalance };
