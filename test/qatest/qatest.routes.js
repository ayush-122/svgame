let express = require("express");
const path = require("path");
let router = express.Router();

const qatest = require("./qatest.controller");

//TESTING
const { getSlotNumbers } = require("../../api/v1/services/rng/slotRng.service");
router.get("/test", async (req, res) => {
  let result = await getSlotNumbers([
    {
      low: 1,
      high: 100,
    },
    {
      low: 0,
      high: 1000,
    },
    {
      low: 5,
      high: 12100,
    },
    {
      low: 90,
      high: 11000,
    },
  ]);
  res.json({ status: true, response: result });
});

//Common
router.post("/common", qatest.createQaTestData);
router.get("/common", qatest.getAllQaTestData);
router.get("/common/:id", qatest.getQaTestData);
router.delete("/common", qatest.deleteAllQaTestData);
router.delete("/common/:id", qatest.deleteQaTestData);
router.get("/dashboard", (req, res) => {
  // eslint-disable-next-line no-undef
  const filePath = path.join(__dirname, ".", "QA Dashboard", "index.html");
  const normalizedPath = path.normalize(filePath);
  res.sendFile(normalizedPath);
});

module.exports = router;
