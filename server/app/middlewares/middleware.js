const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const config = require("config");
const passport = require("passport");

const middlewares = [
  morgan("dev"),

  // Add middleware for parsing JSON and urlencoded data and populating `req.body`
  express.urlencoded({ extended: true }),
  express.json(),

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
