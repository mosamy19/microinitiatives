const router = require("express").Router();
const {
  getShares,
  makeShare,
  getAllShares,
} = require("../controllers/shareController");
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");

router.get("/get-all-shares", isAuthenticated, isAdmin, getAllShares);
router.get("/get-shares/:initiativeId", isAuthenticated, getShares);
router.post("/:initiativeId", isAuthenticated, makeShare);

module.exports = router;
