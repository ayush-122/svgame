const express = require("express");
const morgan = require("morgan");

const app = express();
const logRequestMiddleware = require("./api/v1/middleware/logMiddleware/logMiddleware");
const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler =require("./api/v3/middleware/errorHandleMiddleWare/errorHandler.js");

//Swagger
const swaggerSpec = require("./config/swagger/swaggerConfig");
const swaggerUi = require("swagger-ui-express");
const options = {
  swaggerOptions: {
    validatorUrl: null,
  },
};
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));

//************* */

// Import Routes
let authRouter = require("./api/v1/routes/auth.routes");
let playerRouter = require("./api/v1/routes/player.routes");
let gamePlayRouter = require("./api/v1/routes/gamePlay.routes");
let gameRouter = require("./api/v1/routes/game.routes");

//Middlewares
app.use(cors("*"));
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(morgan("dev"));
app.use(logRequestMiddleware);

//Version
// ? Check Version and Connectivity
app.get("/v1", (req, res) => {
  res.send("Server Working \n Version 2.5.2");
});

// ! **********************QA TEST ROUTE******************************
const qaTestRouter = require("./test/qatest/qatest.routes");
app.use("/v1/qatest", qaTestRouter);
// ! **********************QA TEST ROUTE******************************
//Routes
app.use("/v1/auth", authRouter);
app.use("/v1/player", playerRouter);
app.use("/v1/game", gamePlayRouter);
app.use("/v1/admin/game", gameRouter);

// Import Routes
authRouter = require("./api/v2/routes/auth.routes");
playerRouter = require("./api/v2/routes/player.routes");
gamePlayRouter = require("./api/v2/routes/gamePlay.routes");
gameRouter = require("./api/v2/routes/game.routes");
let walletRouter = require("./api/v2/routes/wallet.routes");

//Routes V2
app.use("/v2/auth", authRouter);
app.use("/v2/player", playerRouter);
app.use("/v2/game", gamePlayRouter);
app.use("/v2/admin/game", gameRouter);
app.use("/v2/wallet", walletRouter);


// import routes
authRouter = require("./api/v3/routes/auth.routes");
playerRouter = require("./api/v3/routes/player.routes");
gamePlayRouter = require("./api/v3/routes/gamePlay.routes");
gameRouter = require("./api/v3/routes/game.routes");
walletRouter = require("./api/v3/routes/wallet.routes");
//Routes V3
app.use("/v3/auth", authRouter);
app.use("/v3/player", playerRouter);
app.use("/v3/game", gamePlayRouter);
app.use("/v3/admin/game", gameRouter);
app.use("/v3/wallet", walletRouter);

//Default Route
app.use((req, res) => {
  res
    .status(404)
    .send("Oops, seems like you are trying to access something that doesn't exist, please recheck your path");
});

app.use(errorHandler);

module.exports =app;