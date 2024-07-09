const prisma = require("../../db.config");

// **********Wallet**********
async function createWallet(balance) {
  const wallet = await prisma.wallets.create({
    data: {
      balance,
    },
  });
   console.log(wallet);
  return wallet;
}

async function findWallet(wallet_id) {
  const wallet = await prisma.wallets.findUnique({
    where: {
      wallet_id,
    },
  });
  return wallet;
}

async function updateBalance(wallet_id, balance) {
  await prisma.wallets.update({
    where: {
      wallet_id,
    },
    data: {
      balance, //Adding balance
    },
  });
  return;
}

//***********Block / Unblock************* */

async function blockWallet(wallet_id) {
  await prisma.wallets.update({
    where: {
      wallet_id,
    },
    data: {
      isBlocked: true,
    },
  });
}
async function unblockWallet(wallet_id) {
  await prisma.wallets.update({
    where: {
      wallet_id,
    },
    data: {
      isBlocked: false,
    },
  });
}

// **********Transactions**********

//Validate Transaction
async function validateTransaction(wallet_id, amount) {
  //Fetch wallet data
  const wallet = await findWallet(wallet_id);

  //Check Wallet Eligibility
  if (wallet.isBlocked) {
    return { status: false, message: "Wallet Blocked" };
  }
  if (wallet.balance - amount < 0) {
    return { status: false, message: "Insufficient Balance for Transaction" };
  }
  return {
    status: true,
    message: "Transaction Valid",
  };
}

// Function to Add balance
async function  addBalance(wallet_id, amount, client_ip_address, audit_id, audit_type) {
  //Fetch wallet data
  const wallet = await findWallet(wallet_id);

  //Check Wallet Eligibility
  if (wallet.isBlocked) {
    //log transaction
    await logTransaction(wallet_id, amount, wallet.balance, "credit", client_ip_address, false, audit_id, audit_type);
    return { status: false, message: "Wallet Blocked" };
  }

  //Updating the wallet Balance
  await updateBalance(wallet_id, wallet.balance + amount);

  await logTransaction(
    wallet_id,
    amount,
    wallet.balance + amount,
    "credit",
    client_ip_address,
    true,
    audit_id,
    audit_type
  );

  return {
    status: true,
    message: "Balance Added SuccessFully",
    balance: wallet.balance + amount,
  };
}

//Function to Deduct Balance
async function deductBalance(wallet_id, amount, client_ip_address, audit_id, audit_type) {
  //Fetch wallet data
  const wallet = await findWallet(wallet_id);

  //Check Wallet Eligibility
  if (wallet.isBlocked) {
    await logTransaction(wallet_id, amount, wallet.balance, "debit", client_ip_address, false, audit_id, audit_type);
    return { status: false, message: "Wallet Blocked" };
  }
  if (wallet.balance - amount < 0) {
    await logTransaction(wallet_id, amount, wallet.balance, "debit", client_ip_address, false, audit_id, audit_type);
    return { status: false, message: "Insufficient Balance for Transaction" };
  }

  //Updating the wallet Balance
  await updateBalance(wallet_id, wallet.balance - amount);

  await logTransaction(
    wallet_id,
    amount,
    wallet.balance - amount,
    "debit",
    client_ip_address,
    true,
    audit_id,
    audit_type
  );

  return {
    status: true,
    message: "Balance Deducted SuccessFully",
  };
}

async function logTransaction(wallet_id, amount, balance, type, client_ip_address, success, audit_id, audit_type) {
  //Create wallet transaction
  await prisma.wallet_transactions.create({
    data: {
      wallet_id,
      amount,
      current_balance: balance,
      transaction_type: type,
      client_ip_address,
      success,
      audit_id,
      audit_type,
    },
  });
  return;
}

module.exports = {
  validateTransaction,
  addBalance,
  deductBalance,
  createWallet,
  findWallet,
  updateBalance,
  blockWallet,
  unblockWallet,
};
