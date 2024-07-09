const prisma = require("../../db.config");

async function createKenoAudit(obj) {
  const keno_audit = await prisma.keno_audits.create({
    data: {
      client_ip_address: obj.client_ip_address,
      player_id: obj.player_id,
      game_id: obj.game_id,
      credits: obj.credits,
      bet: obj.bet,
      risk_level: obj.risk_level,
      bet_numbers: obj.bet_numbers,
      win_multiplier: obj.win_multiplier,
      total_won: obj.total_won,
      raw_response: obj.raw_response,
      isCompleted: obj.isCompleted || (process.env.FEATURE_DONE == "true" ? false : true), // change to false by default //TODO
    },
  });
  return keno_audit;
}

async function findLastKeno(player_id, game_id) {
  const lastKeno = await prisma.keno_audits.findFirst({
    orderBy: {
      created_at: "desc",
    },
    where: {
      game_id,
      player_id,
    },
  });
  return lastKeno;
}

async function checkLastKenos(player_id) {
  const lastKeno = await prisma.keno_audits.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      player_id,
      isCompleted: false,
    },
  });
  return lastKeno;
}
async function updateResponse(keno_id, raw_response) {
  await prisma.keno_audits.update({
    where: {
      keno_id,
    },
    data: {
      raw_response,
    },
  });

  return;
}

async function updateIsCompleted(keno_id) {
  await prisma.keno_audits.update({
    where: {
      keno_id,
    },
    data: {
      isCompleted: true,
    },
  });

  return;
}

module.exports = {
  createKenoAudit,
  findLastKeno,
  checkLastKenos,
  updateResponse,
  updateIsCompleted,
};
