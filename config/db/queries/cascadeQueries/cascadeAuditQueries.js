const prisma = require("../../db.config");

async function createCascadeAudit(cascadeAuditObj) {
  try {
    const cascadeAudit = await prisma.cascade_audits.create({
      data: cascadeAuditObj,
    });
    return cascadeAudit;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create cascade audit");
  }
}

async function findLastCascade(player_id, game_id) {
  const lastCascade = await prisma.cascade_audits.findFirst({
    orderBy: {
      created_at: "desc",
    },
    where: {
      game_id,
      player_id,
    },
  });
  return lastCascade;
}

async function checkLastCascades(player_id) {
  const lastCascade = await prisma.cascade_audits.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      player_id,
      isCompleted: false,
    },
  });
  return lastCascade;
}

async function updateCascadeRequestIdAndResponse(cascade_id, cascade_request_id) {
  await prisma.cascade_audits.update({
    where: {
      cascade_id,
    },
    data: {
      cascade_request_id,
    },
  });

  return;
}

async function updateCascadeProgress(cascade_id, current_cascade) {
  await prisma.cascade_audits.update({
    where: {
      cascade_id,
    },
    data: {
      current_cascade,
    },
  });

  return;
}

async function updateIsCompleted(cascade_id) {
  await prisma.cascade_audits.update({
    where: {
      cascade_id,
    },
    data: {
      isCompleted: true,
    },
  });

  return;
}

module.exports = {
  createCascadeAudit,
  findLastCascade,
  updateCascadeRequestIdAndResponse,
  updateCascadeProgress,
  checkLastCascades,
  updateIsCompleted,
};
