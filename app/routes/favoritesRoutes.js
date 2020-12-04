const router = require("express").Router();
const {
  getFavorites,
  setFavorite,
  setUnfavorite,
  getMyFavorites,
} = require("../controllers/favoritesController");
const isAuthenticated = require("../middlewares/authenticate");

router.get("/get-favorites/:initiativeId", isAuthenticated, getFavorites);
router.get("/get-my-favorites", isAuthenticated, getMyFavorites);
router.post("/favorite/:initiativeId", isAuthenticated, setFavorite);
router.delete("/unfavorite/:initiativeId", isAuthenticated, setUnfavorite);

module.exports = router;
