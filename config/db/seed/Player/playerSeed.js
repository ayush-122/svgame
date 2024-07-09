const bcrypt = require("bcrypt");
const playerData = require("./playerSeedData.json");
const Player = require("../../queries/player/PlayerQueries");
const Wallet = require("../../queries/wallet/WalletQueries");

async function seedPlayerAccounts() {
  try {
    for (const account of playerData) {
      // Check if player exists
      const existingPlayer = await Player.findPlayerViaUsername(account.username);
      if (existingPlayer) {
        console.log(`Player with username ${account.username} already exists. Skipping seeding.`);
        continue;
      }

      // Hash password (using username as password)
      const hashPassword = await bcrypt.hash(account.password, 13);

      // Create wallet for player
      const playerWallet = await Wallet.createWallet(parseFloat(account.balance));

      // Create player account
      await Player.createPlayer(
        account.username,
        hashPassword,
        playerWallet.wallet_id,
        account.fullname,
        account.email
      );

      console.log(`Player account for ${account.username} seeded successfully.`);
    }

    console.log("Player Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding player accounts:", error);
  }
}

module.exports = seedPlayerAccounts;
