const {
  getLikes,
  createLike,
  createDisLike,
} = require("../controllers/likesController");

const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");

router.get("/get-likes/:initiativeId", isAuthenticated, getLikes);
router.post("/like/:initiativeId", isAuthenticated, createLike);
router.delete("/unlike/:initiativeId", isAuthenticated, createDisLike);

module.exports = router;
