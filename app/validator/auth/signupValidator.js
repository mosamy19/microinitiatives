const { body } = require("express-validator");
const User = require("../../models/User");

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
  body("email")
    .not()
    .isEmpty()
    .withMessage("هذه الخانة مطلوبة")
    .isEmail()
    .withMessage(" البريد الإلكتروني الذي أدخلته غير صحيح ")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("البريد الإلكتروني الذي أدخلته مسجل مسبقا");
      }
    })
    .trim(),
  body("password")
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
      if (confirmPassword !== req.body.password) {
        throw new Error("كلمة السر الذي أدخلتها غير متطابقة");
      }
      return true;
    }),
];
