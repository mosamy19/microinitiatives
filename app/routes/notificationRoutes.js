const router = require("express").Router();
const {
  getNotifications,
  makeIsCheckedTrue,
} = require("../controllers/notificationController");
const isAuthenticated = require("../middlewares/authenticate");

router.get("/get-notifications", isAuthenticated, getNotifications);
router.get("/get-notifications/is-checked", isAuthenticated, makeIsCheckedTrue);

module.exports = router;
