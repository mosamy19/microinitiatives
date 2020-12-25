const router = require("express").Router();
const {
  createComment,
  getComments,
  getAllComments,
  editComment,
  deleteComment,
  getSingleComment,
} = require("../controllers/commentsController");
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");

router.post("/add-comment/:initiativeId", isAuthenticated, createComment);
router.get("/get-comments/:initiativeId", isAuthenticated, getComments);
router.get("/get-landing-page-comments/:initiativeId", getComments);

// Admin routes
router.get("/get-all-comments", isAuthenticated, isAdmin, getAllComments);
router.put("/edit-comment/:commentId", isAuthenticated, isAdmin, editComment);
router.delete(
  "/delete-comment/:commentId",
  isAuthenticated,
  isAdmin,
  deleteComment
);
router.get(
  "/get-single-comment/:commentId",
  isAuthenticated,
  isAdmin,
  getSingleComment
);

module.exports = router;
