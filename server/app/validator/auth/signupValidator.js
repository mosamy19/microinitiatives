const { body } = require("express-validator");
const User = require("../../models/User");

module.exports = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First name can't be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("First name must be between 3 to 15 charecters")
    .trim(),
  body("familyName")
    .not()
    .isEmpty()
    .withMessage("Family name can't be empty")
    .isLength({ max: 15, min: 3 })
    .withMessage("Family name must be between 3 to 15 charecters")
    .trim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Please proivde a valid email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email already exists");
      }
    })
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 charecters"),
  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("Confirmpassword can't be empty")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password dsen't match");
      }
      return true;
    }),
];
