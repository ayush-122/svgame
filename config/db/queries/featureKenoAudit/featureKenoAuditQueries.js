const prisma = require("../../db.config");

async function createFeatureKenoAudit(obj) {
  const featureKeno_audit = await prisma.feature_keno_audits.create({
    data: {
      client_ip_address: obj.client_ip_address,
      player: {
        connect: { player_id: obj.player_id },
      },
      current_state: obj.current_state,
      next_state: obj.next_state,
      number_count: obj.number_count,
      next_state_details: obj.next_state_details,
      game: {
        connect: { game_id: obj.game_id },
      },
      credits: obj.credits,
      bet: obj.bet,
      total_bet: obj.total_bet,
      bet_numbers: obj.bet_numbers,
      extra_draw_count: obj.extra_draw_count,
      drawn_numbers: obj.drawn_numbers,
      feature_symbols: obj.feature_symbols,
      feature_symbol_hit: obj.feature_symbol_hit,
      bonus_multiplier: obj.bonus_multiplier,
      win_numbers: obj.win_numbers,
      payout_multiplier: obj.payout_multiplier,
      win: obj.win,
      total_won: obj.total_won,
      isCompleted: process.env.FEATURE_DONE == "true" ? false : true, // change to false by default //TODO
    },
  });
  return featureKeno_audit;
}

async function findLastFeatureKeno(player_id, game_id) {
  const lastFeatureKeno = await prisma.feature_keno_audits.findFirst({
    orderBy: {
      created_at: "desc",
    },
    where: {
      game_id,
      player_id,
    },
  });
  return lastFeatureKeno;
}

async function checkLastFeatureKenos(player_id, game_id) {
  const lastFeatureKeno = await prisma.feature_keno_audits.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      player_id,
      game_id,
      isCompleted: false,
    },
  });
  return lastFeatureKeno;
}
async function updateRequestId(feature_keno_id, feature_keno_request_id) {
  await prisma.feature_keno_audits.update({
    where: {
      feature_keno_id,
    },
    data: {
      feature_keno_request_id,
    },
  });

  return;
}

async function updateIsCompleted(feature_keno_id) {
  await prisma.feature_keno_audits.update({
    where: {
      feature_keno_id,
    },
    data: {
      isCompleted: true,
    },
  });

  return;
}

async function updateNextState(feature_keno_id, next_state, next_state_details, total_won) {
  const updateData = {
    next_state,
    next_state_details,
  };

  // Conditionally add total_won to updateData if it is not undefined
  if (total_won !== undefined) {
    updateData.total_won = total_won;
  }

  await prisma.feature_keno_audits.update({
    where: {
      feature_keno_id,
    },
    data: updateData,
  });

  return;
}

module.exports = {
  createFeatureKenoAudit,
  findLastFeatureKeno,
  checkLastFeatureKenos,
  updateRequestId,
  updateIsCompleted,
  updateNextState,
};
