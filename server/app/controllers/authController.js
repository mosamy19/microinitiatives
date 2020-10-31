const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { resourceError } = require("../utils/error");
const errorFormatter = require("../utils/errorFormatter");
const { status } = require("../utils/status");

module.exports = {
  signupController: async (req, res, next) => {
    let { firstName, familyName, email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let hashedPassword = await bcrypt.hash(password, 11);
      let newUser = new User({
        firstName,
        familyName,
        email,
        password: hashedPassword,
      });
      let user = await newUser.save();
      res.status(status.created).json({
        message: "You have registered successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  loginController: async (req, res, next) => {
    let { email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty) {
      return res.status(status.bad).json(errors.mapped());
    }

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return resourceError(res, "Please provide with valid credentials");
      }

      let match = await bcrypt.compare(password, user.password);
      if (!match) {
        return resourceError(res, "Please provide with valid credentials");
      }

      res
        .status(status.success)
        .json({ message: "You have logged in successfully" });
    } catch (error) {
      console.log(error);
    }
  },

  forgetPasswordController: (req, res, next) => {},
  changePasswordController: (req, res, next) => {},
  logoutController: (req, res, next) => {},
};
