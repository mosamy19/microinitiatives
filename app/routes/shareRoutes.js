const router = require("express").Router();
const {
  getShares,
  makeShare,
  getAllShares,
  getSharesChartDataDaily,
  getSharesChartDataMonthly,
} = require("../controllers/shareController");
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");

router.get("/get-all-shares", isAuthenticated, isAdmin, getAllShares);
router.get(
  "/get-shares-daily-chart-data",
  isAuthenticated,
  isAdmin,
  getSharesChartDataDaily
);
router.get(
  "/get-shares-monthly-chart-data",
  isAuthenticated,
  isAdmin,
  getSharesChartDataMonthly
);
router.get("/get-shares/:initiativeId", isAuthenticated, getShares);
router.post("/:initiativeId", isAuthenticated, makeShare);

module.exports = router;
