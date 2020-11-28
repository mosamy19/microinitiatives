const router = require("express").Router();
const signupValidator = require("../validator/auth/signupValidator");
const loginValidator = require("../validator/auth/loginValidator");
const forgetPasswordValidator = require("../validator/auth/forgetPasswordValidator");
const resetPasswordValidator = require("../validator/auth/resetPasswordValidator");
const changePasswordValidator = require("../validator/auth/changePasswordValidator");
const {
  signupController,
  activateAccountController,
  loginController,
  forgetPasswordController,
  resetPasswordController,
  changePasswordController,
  editUser,
} = require("../controllers/authController");

const isAuthenticated = require("../middlewares/authenticate");
const upload = require("../middlewares/uploadMiddleware");

router.post("/signup", signupValidator, signupController);
router.post("/activate-account", activateAccountController);
router.post("/login", loginValidator, loginController);
router.post(
  "/forget-password",
  forgetPasswordValidator,
  forgetPasswordController
);
router.post("/reset-password", resetPasswordValidator, resetPasswordController);
router.post(
  "/change-password",
  isAuthenticated,
  changePasswordValidator,
  changePasswordController
);
router.put("/edit-user", isAuthenticated, upload.single("avatar"), editUser);

module.exports = router;
