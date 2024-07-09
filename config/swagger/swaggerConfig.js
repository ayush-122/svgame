// swaggerConfig.js

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerResponses = require("./components/swaggerResponses");
const swaggerSchemas = require("./components/swaggerSchemas");

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Base Framework API Documentation",
      version: "2.5.2",
      description: "This is a Swagger Documentation for Slot Game Backend Framework",
    },
    servers: [
      // {
      //   url: `http://localhost:3002/v1`,
      // },
      {
        url: `http://localhost:3002/v2`,
      },
      {
        url: `http://localhost:3002/v3`,
      },
      // {
      //   url: `http://192.168.44.16:8001/v1`,
      // },
      {
        url: `http://192.168.44.16:8001/v2`,
      },
      // {
      //   url: `http://34.205.135.210/v1`,
      // },
      {
        url: `http://34.205.135.210/v2`,
      },
    ],
    components: {
      responses: swaggerResponses,
      schemas: swaggerSchemas,
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["server/api/v2/routes/*.js", "server/api/v2/games/*/*/routes/*.js" ,"server/api/v3/routes/*.js" ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
