const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  // log: ["query"]
});

module.exports = prisma;

// async function test() {
//   const tableNames = ["spin_audits", "keno_audits", "feature_keno_audits"]; // Add more table names as needed

//   const latestEntries = await Promise.all(
//     tableNames.map(async (tableName) => {
//       return await prisma[tableName].findFirst({
//         where: { player_id: 4 }, // Specify the player_id
//         orderBy: { created_at: "desc" }, // Order by created_at in descending order
//       });
//     })
//   );

//   // Find the latest entry among all tables
//   let latestOverallEntry = null;
//   latestEntries.forEach((entry) => {
//     if (!latestOverallEntry || (entry && entry.created_at > latestOverallEntry.created_at)) {
//       latestOverallEntry = entry;
//     }
//   });

//   console.log(latestOverallEntry);
// }

// test();
