require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const config = require("config");
const { port } = require("./config/config");
const passport = require("passport");
const connectDB = require("./app/db/db");
const setMiddlewares = require("./app/middlewares/middleware");
const setRoutes = require("./app/routes/routes");

const app = express();

// db connection
connectDB();

// Using middleware from middleware directory
setMiddlewares(app);
// passport jwt authentication
passport.initialize();
require("./app/middlewares/passport")(passport);

// Using routes from route directory
setRoutes(app);

app.listen(port, () => {
  console.log(
    chalk.yellowBright.inverse(
      `App is running in ${config.get("mode")} mode on port ${port}`
    )
  );
});
