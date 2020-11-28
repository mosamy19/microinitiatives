const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const config = require("config");
const passport = require("passport");
const { static } = require("express");

const middlewares = [
  morgan("dev"),
  express.static("public"),
  // Add middleware for parsing JSON and urlencoded data and populating `req.body`
  bodyParser.json({ limit: "50mb" }),
  bodyParser.urlencoded({ limit: "50mb", extended: true }),

  // Add middleware for parsing URL encoded bodies (which are usually sent by browser)
  cors(),

  //   session({
  //     secret: config.get("secret-key") || "SECRET_KEY",
  //     resave: false,
  //     saveUninitialized: false,
  //     store: store,
  //   }),
  //   flash(),
  //   bindUserWithRequest(),
  //   setLocals(),
];

module.exports = (app) => {
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });
};
