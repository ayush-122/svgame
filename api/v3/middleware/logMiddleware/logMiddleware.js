// logMiddleware.js

const {
  storeLogFields
} = require("../../../../config/db/queries/requestLog/requestLogQueries");

function logMiddleware(req, res, next) {
  const startTime = process.hrtime(); // Start time for measuring response time

  res.on("finish", () => {
    const elapsedTime = process.hrtime(startTime);
    const responseTimeInMs = elapsedTime[0] * 1000 + elapsedTime[1] / 1e6; // Convert to milliseconds

    const logFields = {
      client_ip: req.ip,
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      user_agent: req.headers["user-agent"],
      status_code: res.statusCode,
      content_length: parseInt(res.get("Content-Length")),
      response_time: responseTimeInMs,
      protocol: req.protocol,
      path: req.path,
      query: req.query,
      request_body: req.body,
      request_params: req.params,
      request_query: req.query
    };

    // Log the request details
    // console.log("Log Fields:", logFields);

    // Store log fields in the database
    storeLogFields(logFields);
  });

  next();
}

module.exports = logMiddleware;
