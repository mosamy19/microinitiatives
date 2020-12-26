const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");

const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const upload = require("../middlewares/uploadMiddleware");

router.post(
  "/create-category",
  isAuthenticated,
  isAdmin,
  upload.single("icon"),
  createCategory
);
router.get("/get-all-categories", isAuthenticated, getAllCategories);

router.put(
  "/edit-category",
  isAuthenticated,
  isAdmin,
  upload.single("icon"),
  editCategory
);
router.delete(
  "/delete-category/:categoryId",
  isAuthenticated,
  isAdmin,
  deleteCategory
);
router.get(
  "/get-single-category/:categoryId",
  isAuthenticated,
  getSingleCategory
);

module.exports = router;
