const router = require("express").Router();
const {
  getFavorites,
  setFavorite,
  setUnfavorite,
  getMyFavorites,
  getAllFavorites,
  getFavoritesChartDataDaily,
  getFavoritesChartDataMonthly,
} = require("../controllers/favoritesController");
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");

router.get("/get-all-favorites", isAuthenticated, isAdmin, getAllFavorites);
router.get(
  "/get-favorites-daily-chart-data",
  isAuthenticated,
  isAdmin,
  getFavoritesChartDataDaily
);
router.get(
  "/get-favorites-monthly-chart-data",
  isAuthenticated,
  isAdmin,
  getFavoritesChartDataMonthly
);
router.get("/get-favorites/:initiativeId", isAuthenticated, getFavorites);
router.get("/get-my-favorites", isAuthenticated, getMyFavorites);
router.post("/favorite/:initiativeId", isAuthenticated, setFavorite);
router.delete("/unfavorite/:initiativeId", isAuthenticated, setUnfavorite);

module.exports = router;
