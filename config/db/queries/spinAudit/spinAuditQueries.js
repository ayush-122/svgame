const prisma = require("../../db.config");

async function createSpinAudit(obj) {
  const spin_audit = await prisma.spin_audits.create({
    data: {
      client_ip_address: obj.client_ip_address,
      player_id: obj.player_id,
      game_id: obj.game_id,
      game_type: obj.game_type, //HARDCODED*******************
      current_state: obj.current_state,
      next_state: obj.next_state,
      current_free_spin: obj.current_free_spin,
      total_free_spin: obj.total_free_spin,
      raw_response: obj.raw_response,
      raw_request: obj.raw_request,
      isCompleted: obj.isCompleted || (process.env.FEATURE_DONE == "true" ? false : true), // change to false by default //TODO
    },
  });
  return spin_audit;
}

async function findLastSpin(player_id, game_id) {
  const lastSpin = await prisma.spin_audits.findFirst({
    orderBy: {
      created_at: "desc",
    },
    where: {
      game_id,
      player_id,
    },
  });
  return lastSpin;
}

async function checkLastSpins(player_id, game_id) {
  const lastSpin = await prisma.spin_audits.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      player_id,
      game_id,
      isCompleted: false,
    },
  });
  return lastSpin;
}

async function updateSpinRequestIdAndResponse(spin_id, spin_request_id, raw_response) {
  await prisma.spin_audits.update({
    where: {
      spin_id,
    },
    data: {
      spin_request_id,
      raw_response,
    },
  });

  return;
}

async function updateIsCompleted(spin_id) {
  await prisma.spin_audits.update({
    where: {
      spin_id,
    },
    data: {
      isCompleted: true,
    },
  });

  return;
}

module.exports = {
  createSpinAudit,
  findLastSpin,
  updateSpinRequestIdAndResponse,
  checkLastSpins,
  updateIsCompleted,
};
