const router = require("express").Router();
const { getShares, makeShare } = require("../controllers/shareController");
const isAuthenticated = require("../middlewares/authenticate");

router.get("/get-shares/:initiativeId", isAuthenticated, getShares);
router.post("/:initiativeId", isAuthenticated, makeShare);

module.exports = router;
