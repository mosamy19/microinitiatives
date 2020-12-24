const router = require("express").Router();
const {
  createComment,
  getComments,
  getAllComments,
} = require("../controllers/commentsController");
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");

router.post("/add-comment/:initiativeId", isAuthenticated, createComment);
router.get("/get-comments/:initiativeId", isAuthenticated, getComments);
router.get("/get-landing-page-comments/:initiativeId", getComments);

// Admin routes
router.get("/get-all-comments", isAuthenticated, isAdmin, getAllComments);

module.exports = router;
