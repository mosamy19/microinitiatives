const { body } = require("express-validator");
const User = require("../../models/User");

module.exports = [
  body("newPassword")
    .not()
    .isEmpty()
    .withMessage("هذه الخانة مطلوبة")
    .isLength({ min: 6 })
    .withMessage("يجب أن كلمة السر أن تكون ستة أحرف على الأقل"),
  body("confirmPassword")
    .not()
    .isEmpty()
    .withMessage("هذه الخانة مطلوبة")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.newPassword) {
        throw new Error("كلمة السر الذي أدخلتهاغير متطابقة");
      }
      return true;
    }),
];
