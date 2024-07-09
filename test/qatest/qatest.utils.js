const qatestqueries = require("./qatest.queries");

async function checkAvailability(player_id, game_id, type) {
  // console.log("Check is Running");
  return await qatestqueries.checkQaTestAvailability(player_id, game_id, type);
}

async function getQaTestData(player_id, game_id, type) {
  console.log("***********QA TEST DATA RUNNING*********************");
  return await qatestqueries.getQaTestData(player_id, game_id, type);
}

async function deleteQaTestDataById(record) {
  return await qatestqueries.deleteQaTestDataById(record.qa_test_id);
}

function parseDataToArrays(data) {
  try {
    const base = [];
    const free = [];
    const wheel_bonus = [];
    const respin = [];
    const pickBonus = [];

    // Split data into lines
    const lines = data.split("\n");

    // Variables to keep track of current category
    let currentCategory = "";
    let currentArray = null;

    // Loop through lines and process data
    lines.forEach((line) => {
      if (line.startsWith("#")) {
        // If line starts with '#', it is a category indicator
        currentCategory = line.substring(1).trim().toUpperCase();
        switch (currentCategory) {
          case "BASE":
            currentArray = base;
            break;
          case "FREE":
            currentArray = free;
            break;
          case "WHEEL_BONUS":
            currentArray = wheel_bonus;
            break;
          case "RESPIN":
            currentArray = respin;
            break;
          case "PICK_BONUS":
            currentArray = pickBonus;
            break;
          default:
            // Handle unknown category if needed
            break;
        }
      } else if (currentArray) {
        // If a category is set, add the line to the corresponding array
        if (line.length > 0) currentArray.push(line.trim());
      }
    });

    return { base, free, wheel_bonus, respin, pickBonus };
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    throw error;
  }
}

// Validation function for data format
function validateDataFormat(data) {
  // Regular expression to check for 6 numbers separated by commas
  const dataFormatRegex = /^\d+,\d+,\d+,\d+,\d+,\d+$/;
  return dataFormatRegex.test(data);
}

module.exports = {
  checkAvailability,
  deleteQaTestDataById,
  getQaTestData,
  parseDataToArrays,
  validateDataFormat,
};
