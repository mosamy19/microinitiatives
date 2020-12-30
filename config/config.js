require("dotenv").config({ debug: true, override: true });

module.exports = {
  port: process.env.PORT || 5000,
  origin: process.env.ORIGIN || `http://localhost:${exports.port}`,
  clientUri: process.env.CLIENT_URL,
  dbconfig: {
    // HOST: process.env.HOST,
    // USER: process.env.DBUSER,
    // PASSWORD: process.env.DBPASSWORD,
    // PORT: process.env.DBPORT,
    // DB: process.env.DB,
    // DB_URI: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@simon.syoxf.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
    DB_URI: process.env.DB_URI,
  },
  mailgunDomain: process.env.MAILGUN_DOMAIN,
  mailgunApiKey: process.env.MAILGUN_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  //   authSecret: process.env.JWT_SECRET,
};
