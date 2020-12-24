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
  getLoggedinUser,
  getPublicProfileUser,
  getAllUsers,
} = require("../controllers/authController");

const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");
const upload = require("../middlewares/uploadMiddleware");
const edituserValidator = require("../validator/auth/edituserValidator");
const editProfilePicValidator = require("../validator/auth/editProfilePicValidator");


// public routes
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

// private routes
router.put(
  "/edit-user",
  isAuthenticated,
  upload.single("avatar"),
  editProfilePicValidator,
  edituserValidator,
  editUser
);
router.get("/get-loggedin-user", isAuthenticated, getLoggedinUser);
router.get(
  "/get-public-profile-user/:userId",
  isAuthenticated,
  getPublicProfileUser
);

// admin routes
router.get("/get-all-users", isAuthenticated, isAdmin, getAllUsers);

module.exports = router;
