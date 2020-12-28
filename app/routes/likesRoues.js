const {
  getLikes,
  createLike,
  createDisLike,
  getAllLikes,
} = require("../controllers/likesController");

const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");

router.get("/get-all-likes", isAuthenticated, isAdmin, getAllLikes);
router.get("/get-likes/:initiativeId", isAuthenticated, getLikes);
router.post("/like/:initiativeId", isAuthenticated, createLike);
router.delete("/unlike/:initiativeId", isAuthenticated, createDisLike);

module.exports = router;
