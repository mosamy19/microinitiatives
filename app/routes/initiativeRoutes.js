const upload = require("../middlewares/uploadMiddleware");
const {
  getAllInitiatives,
  createInitiative,
  getSingleInitiative,
  editInitiative,
  deleteInitiative,
  getDraftInitiatives,
  getMyInitiatives,
  getClonedtInitiatives,
  getLandingPageInitiatives,
} = require("../controllers/initiativeController");

const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");

router.get("/get-initiatives", isAuthenticated, getAllInitiatives);
router.get("/get-landing-page-initiatives", getLandingPageInitiatives);
router.get("/drafts", isAuthenticated, getDraftInitiatives);
router.get("/cloned-initiatives", isAuthenticated, getClonedtInitiatives);
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
