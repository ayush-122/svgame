const prisma = require("../../../../db/db.config");

async function createLog(player_id, status, client_ip_address) {
  await prisma.player_logs.create({
    data: {
      player_id,
      status,
      client_ip_address
    }
  });

  return;
}

module.exports = { createLog };
