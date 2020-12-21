const { body } = require("express-validator");

module.exports = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("الإسم الأول مطلوب")
    .isLength({ max: 15, min: 3 })
    .withMessage("يجب أن يكون الإسم بين ثلاثة و خمسة عشر حرفا")
    .trim(),
  body("familyName")
    .not()
    .isEmpty()
    .withMessage("اسم العائلة مطلوب")
    .isLength({ max: 15, min: 3 })
    .withMessage("يحب أن اسم العائلة أن يكون بين ثلاثة وخمسة حرفا")
    .trim(),
];
