// logService.js

const prisma = require("./../../db.config");

async function storeLogFields(logFields) {
  try {
    await prisma.request_log.create({
      data: {
        client_ip: logFields.client_ip,
        timestamp: new Date(logFields.timestamp),
        method: logFields.method,
        url: logFields.url,
        user_agent: logFields.user_agent,
        status_code: logFields.status_code,
        content_length: logFields.content_length,
        response_time: logFields.response_time,
        protocol: logFields.protocol,
        path: logFields.path,
        query: logFields.query,
        request_body: logFields.request_body,
        request_params: logFields.request_params,
        request_query: logFields.request_query,
      },
    });
  } catch (error) {
    console.error("Error storing log entry:", error);
  }
}

module.exports = { storeLogFields };
