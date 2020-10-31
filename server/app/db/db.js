const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("../../config/config");

const dbConfig = config.dbconfig;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbConfig.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log(
      chalk.greenBright.inverse(`MongoDB Connected to: ${conn.connection.host}`)
    );
  } catch (error) {
    console.error(chalk.redBright.inverse(error));
    process.exit(1);
  }
};

module.exports = connectDB;
