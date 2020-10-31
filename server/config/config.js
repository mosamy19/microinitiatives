require("dotenv").config({ debug: true, override: true });

module.exports = {
  port: process.env.PORT || 5000,
  origin: process.env.ORIGIN || `http://localhost:${exports.port}`,
  dbconfig: {
    HOST: process.env.HOST,
    USER: process.env.DBUSER,
    PASSWORD: process.env.DBPASSWORD,
    PORT: process.env.DBPORT,
    DB: process.env.DB,
    DB_URI: `${process.env.DB_URI}/${process.env.DB}`,
  },
  //   authSecret: process.env.JWT_SECRET,
};
