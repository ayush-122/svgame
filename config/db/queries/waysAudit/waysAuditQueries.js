const prisma = require("../../db.config");

async function createWaysAudit(obj) {
  const ways_audit = await prisma.ways_audits.create({
    data: {
      client_ip_address: obj.client_ip_address,
      player_id: obj.player_id,
      game_id: obj.game_id,
      game_type: obj.game_type, //HARDCODED*******************
      current_state: obj.current_state,
      next_state: obj.next_state,
      current_free_ways: obj.current_free_ways,
      total_free_ways: obj.total_free_ways,
      raw_response: obj.raw_response,
      raw_request: obj.raw_request,
      isCompleted: obj.isCompleted || (process.env.FEATURE_DONE == "true" ? false : true), // change to false by default //TODO
    },
  });
  return ways_audit;
}

async function findLastWays(player_id, game_id) {
  const lastWays = await prisma.ways_audits.findFirst({
    orderBy: {
      created_at: "desc",
    },
    where: {
      game_id,
      player_id,
    },
  });
  return lastWays;
}

async function checkLastWays(player_id, game_id) {
  const lastWays = await prisma.ways_audits.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      player_id,
      game_id,
      isCompleted: false,
    },
  });
  return lastWays;
}

async function updateWaysRequestIdAndResponse(ways_id, ways_request_id, raw_response) {
  await prisma.ways_audits.update({
    where: {
      ways_id,
    },
    data: {
      ways_request_id,
      raw_response,
    },
  });

  return;
}

async function updateIsCompleted(ways_id) {
  await prisma.ways_audits.update({
    where: {
      ways_id,
    },
    data: {
      isCompleted: true,
    },
  });

  return;
}

module.exports = {
  createWaysAudit,
  findLastWays,
  updateWaysRequestIdAndResponse,
  checkLastWays,
  updateIsCompleted,
};
