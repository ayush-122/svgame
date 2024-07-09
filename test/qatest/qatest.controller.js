const QaTestQueries = require("./qatest.queries");
const QaTestUtils = require("./qatest.utils");

// ? ****************Common Controller***************************
async function createQaTestData(req, res) {
  try {
    // Extract parameters from the request body
    const { player_id, game_id, data } = req.body;
    const { base, free, wheel_bonus, respin, pickBonus } = QaTestUtils.parseDataToArrays(data);

    //check for empty entries
    if (
      free.length == 0 &&
      base.length == 0 &&
      wheel_bonus.length == 0 &&
      respin.length == 0 &&
      pickBonus.length == 0
    ) {
      return res.status(400).json({ status: true, message: "Empty Request" });
    }

    await QaTestQueries.createManyQaTestData(player_id, game_id, base, "BASE");
    await QaTestQueries.createManyQaTestData(player_id, game_id, free, "FREE");
    await QaTestQueries.createManyQaTestData(player_id, game_id, respin, "RESPIN");
    await QaTestQueries.createManyQaTestData(player_id, game_id, pickBonus, "PICK_BONUS");
    await QaTestQueries.createManyQaTestData(player_id, game_id, wheel_bonus, "WHEEL_BONUS");

    // Respond with success
    res.status(200).json({ message: "Data processed successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getAllQaTestData(req, res) {
  try {
    const { player_id, game_id } = req.query;
    const data = await QaTestQueries.getAllDataForPlayerGame(parseInt(player_id), parseInt(game_id));
    res.status(200).json({ status: true, message: "Data Fetched Successfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}
async function getQaTestData(req, res) {
  try {
    const qa_test_id = req.params.id;
    const data = await QaTestQueries.getQaTestDataViaId(qa_test_id);
    res.status(200).json({ status: true, message: "Data Fetched Successfully", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}
async function deleteAllQaTestData(req, res) {
  try {
    const { player_id, game_id } = req.body;
    await QaTestQueries.deleteAllQaTestData(player_id, game_id);
    res.status(200).json({ status: true, message: "Data Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}
async function deleteQaTestData(req, res) {
  try {
    const qa_test_id = req.params.id;
    await QaTestQueries.deleteQaTestDataById(parseInt(qa_test_id));
    res.status(200).json({ status: true, message: "Data Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
}

module.exports = {
  //common
  createQaTestData,
  getAllQaTestData,
  getQaTestData,
  deleteAllQaTestData,
  deleteQaTestData,
};
