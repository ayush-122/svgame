const prisma = require("../../db.config");
const asyncErrorHandler = require("../../../../api/v3/helpers/asyncErrorHandler");



async function createPlayer(username, password, wallet_id, fullname, email) {
  try {
    const player = await prisma.players.create({
      data: {
        username,
        password,
        wallet_id,
        fullname: fullname || null,
        email: email || null,
      },
    });
    return player;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findPlayer(player_id) {
  try {
    const player = await prisma.players.findUnique({
      where: {
        player_id,
      },
      select: {
        player_id: true,
        username: true,
        fullname: true,
        email: true,
      },
    });
    return player;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//find player via playerId with password details

async function findPlayerViaUserId(player_id) {
  try {
    const player = await prisma.players.findUnique({
      where: {
        player_id,
      }
    });
    return player;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findPlayerWallet(player_id) {
  try {
    const player = await prisma.players.findUnique({
      where: {
        player_id,
      },
      select: {
        player_id: true,
        wallet_id: true,
        username: true,
        fullname: true,
        email: true,
      },
    });
    return player;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findPlayerViaUsername(username) {
  try {
    const player = await prisma.players.findUnique({
      where: {
        username,
      },
    });
    return player;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function updatePlayerViaUserID(playerId,newHashedPassword){
  try{
     
   const updatedPlayer= await prisma.players.update({
      where:{
        player_id:playerId,
      },
      data:{
        password:newHashedPassword
      }
    });
  //  console.log(updatedPlayer);
  }catch(error)
  {
     console.error(error);
     throw error;
  }
}
//Get Latest Entry for Player
async function getLatestAudit(player_id) {
  const tableNames = ["spin_audits", "keno_audits", "feature_keno_audits", "cascade_audits"]; // Add more table names as needed

  const latestEntries = await Promise.all(
    tableNames.map(async (tableName) => {
      return await prisma[tableName].findFirst({
        where: { player_id: player_id }, // Specify the player_id
        orderBy: { created_at: "desc" }, // Order by created_at in descending order
      });
    })
  );

  // Find the latest entry among all tables
  let latestOverallEntry = null;
  latestEntries.forEach((entry) => {
    if (!latestOverallEntry || (entry && entry.created_at > latestOverallEntry.created_at)) {
      latestOverallEntry = entry;
    }
  });

  return latestOverallEntry;
}

module.exports = {
  findPlayer,
  createPlayer,
  findPlayerViaUsername,
  findPlayerWallet,
  getLatestAudit,
  updatePlayerViaUserID,
  findPlayerViaUserId
};
