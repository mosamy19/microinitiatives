const upload = require("../middlewares/uploadMiddleware");
const initiativeValidator = require("../validator/initiatives/initiativeValidator");

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
  getPublicProfileInitiatives,
  getLandingPageSingleInitiative,
  getLandingPageClonedtInitiatives,
} = require("../controllers/initiativeController");

const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");

router.get("/get-initiatives", isAuthenticated, getAllInitiatives);
router.get("/get-landing-page-initiatives", getLandingPageInitiatives);
router.get(
  "/get-landing-page-single-initiative/:initiativeId",
  getLandingPageSingleInitiative
);
router.get(
  "/get-landing-page-cloned-initiative/:clonedInitiativeId",
  getLandingPageClonedtInitiatives
);
router.get(
  "/get-public-profile-initiatives/:userId",
  getPublicProfileInitiatives
);
router.get("/drafts", isAuthenticated, getDraftInitiatives);
router.get(
  "/cloned-initiatives/:clonedInitiativeId",
  isAuthenticated,
  getClonedtInitiatives
);
router.get("/my-initiatives", isAuthenticated, getMyInitiatives);
router.get("/:initiativeId", isAuthenticated, getSingleInitiative);
router.post(
  "/create-initiatives",
  isAuthenticated,
  upload.array("thumbnail"),
  initiativeValidator,
  createInitiative
);
router.put(
  "/edit-initiative/:initiativeId",
  isAuthenticated,
  upload.array("thumbnail"),
  editInitiative
);
router.delete("/:initiativeId", isAuthenticated, deleteInitiative);

module.exports = router;
