
const dotenv = require("dotenv");
dotenv.config({ path: "./../.env" });
const prisma = require("./config/db/db.config");
const app =require("./app.js")


prisma
  .$connect()
  .then(() => {
      // eslint-disable-next-line no-undef
      const PORT = process.env.PORT || 3002;
      app.listen(PORT, "0.0.0.0");
      console.log(`Application is running at PORT: ${PORT}`); // OR logger.log('info',`Application is running at PORT: ${PORT}`)
  })
  .catch((err) => {
    console.error(err);
  });
