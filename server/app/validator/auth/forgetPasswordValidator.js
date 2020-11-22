const { body } = require("express-validator");

module.exports = [
  body("email").not().isEmpty().withMessage("هذه الخانة مطلوبة"),
];
