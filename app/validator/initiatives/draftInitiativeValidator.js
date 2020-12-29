const { body } = require("express-validator");

module.exports = [
  body("title").not().isEmpty().withMessage("عنوان المبادرة مطلوب").trim(),
  body("category").not().isEmpty().withMessage("تصنيف المبادرة مطلوب").trim(),
];
