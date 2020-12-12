const router = require("express").Router();
const {
  createComment,
  getComments,
} = require("../controllers/commentsController");
const isAuthenticated = require("../middlewares/authenticate");

router.post("/add-comment/:initiativeId", isAuthenticated, createComment);
router.get("/get-comments/:initiativeId", isAuthenticated, getComments);
router.get("/get-landing-page-comments/:initiativeId", getComments);

module.exports = router;
