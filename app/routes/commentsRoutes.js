const router = require("express").Router();
const {
  createComment,
  getAllComments,
} = require("../controllers/commentsController");
const isAuthenticated = require("../middlewares/authenticate");

router.post("/add-comment/:initiativeId", isAuthenticated, createComment);
router.get("/get-comments", isAuthenticated, getAllComments);

module.exports = router;
