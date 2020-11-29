const upload = require("../middlewares/uploadMiddleware");
const {
  getAllInitiatives,
  createInitiative,
  getSingleInitiative,
  editInitiative,
  deleteInitiative,
  getDraftInitiatives,
  getMyInitiatives,
} = require("../controllers/initiativeController");

const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");

router.get("/get-initiatives", isAuthenticated, getAllInitiatives);
router.get("/drafts", isAuthenticated, getDraftInitiatives);
router.get("/my-initiatives", isAuthenticated, getMyInitiatives);
router.get("/:initiativeId", isAuthenticated, getSingleInitiative);
router.post(
  "/create-initiatives",
  isAuthenticated,
  upload.array("thumbnail"),
  createInitiative
);
router.put("/:initiativeId", isAuthenticated, editInitiative);
router.delete("/:initiativeId", isAuthenticated, deleteInitiative);

module.exports = router;
