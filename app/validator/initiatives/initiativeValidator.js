const { body } = require("express-validator");
const Initiative = require("../../models/Initiative");

module.exports = [
  body("title").not().isEmpty().withMessage("عنوان المبادرة مطلوب").trim(),
  body("category").not().isEmpty().withMessage("تصنيف المبادرة مطلوب").trim(),
  body("description").not().isEmpty().withMessage("وصف المبادرة مطلوب").trim(),
  body("thumbnail").not().isEmpty().withMessage("هذه الخانة مطلوبة"),
];
