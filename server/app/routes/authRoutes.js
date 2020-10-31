const router = require("express").Router();
const {
  signupController,
  loginController,
  forgetPasswordController,
  changePasswordController,
  logoutController,
} = require("../controllers/authController");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/forget-password", forgetPasswordController);
router.post("/change-password", changePasswordController);
router.get("/logout", logoutController);

module.exports = router;
