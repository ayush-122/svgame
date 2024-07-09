const prisma = require("../../config/db/db.config");

// Validation function for data format
function validateDataFormat(data) {
  // Regular expression to check for 6 numbers separated by commas
  const dataFormatRegex = /^(\d+,)*\d+$/;
  return dataFormatRegex.test(data);
}

// ?  **********************************************Common****************************************

//Check if qa data for the type exist
async function checkQaTestAvailability(player_id, game_id, type) {
  try {
    const records = await prisma.qa_test.findMany({
      where: {
        player_id,
        game_id,
        type,
      },
    });
    if (records.length <= 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createManyQaTestData(player_id, game_id, data, type) {
  try {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      await createQaTestData(player_id, game_id, element, type);
    }
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createQaTestData(player_id, game_id, data, type) {
  // Validation Checks on Data
  const isValidData = validateDataFormat(data);

  if (!isValidData) {
    throw new Error("Invalid data format. Please provide data in the format of 1,2,3,4,5,6");
  }

  try {
    await prisma.qa_test.create({
      data: {
        player_id,
        type,
        game_id,
        data,
      },
    });
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getQaTestDataViaId(qa_test_id) {
  try {
    const data = await prisma.qa_test.findUnique({
      where: {
        qa_test_id: parseInt(qa_test_id),
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllDataForPlayerGame(player_id, game_id) {
  try {
    const data = await prisma.qa_test.findMany({
      // by: ["type"],
      where: {
        player_id,
        game_id,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteQaTestDataById(qa_test_id) {
  try {
    const data = await prisma.qa_test.delete({
      where: {
        qa_test_id,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteAllQaTestData(player_id, game_id) {
  try {
    const data = await prisma.qa_test.deleteMany({
      where: {
        player_id,
        game_id,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Find Latest entry
async function getQaTestData(player_id, game_id, type) {
  try {
    const record = await prisma.qa_test.findFirst({
      orderBy: {
        qa_test_id: "asc",
      },
      where: {
        player_id: parseInt(player_id),
        game_id: parseInt(game_id),
        type,
      },
    });
    return record;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  checkQaTestAvailability,
  getQaTestDataViaId,
  getAllDataForPlayerGame,
  deleteQaTestDataById,
  deleteAllQaTestData,
  getQaTestData,
  createManyQaTestData,
};
