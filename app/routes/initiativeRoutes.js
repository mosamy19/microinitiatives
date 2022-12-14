const upload = require("../middlewares/uploadMiddleware");
const initiativeValidator = require("../validator/initiatives/initiativeValidator");
const imageUploadValidator = require("../validator/initiatives/imageUploadValidator");

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
  editInitiativeByAdmin,
  get_admin_panel_initiatives,
  createDraftInitiative,
  pinInitiative,
  unpinInitiative,
  lovedInitiative,
  unlovedInitiative,
  getInitiativeChartDataDaily,
  getInitiativeChartDataMonthly,
  getClonedInitiativeChartDataDaily,
  getClonedInitiativeChartDataMonthly,
} = require("../controllers/initiativeController");

const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");
const draftImageUploadValidator = require("../validator/initiatives/draftImageUploadValidator");
const draftInitiativeValidator = require("../validator/initiatives/draftInitiativeValidator");

router.get("/get-initiatives/:sortBy", isAuthenticated, getAllInitiatives);
router.get("/get-landing-page-initiatives/:sortBy", getLandingPageInitiatives);
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

// admin routes
router.get(
  "/get-admin-panel-initiatives",
  isAuthenticated,
  isAdmin,
  get_admin_panel_initiatives
);
router.get(
  "/get-daily-chart-data",
  isAuthenticated,
  isAdmin,
  getInitiativeChartDataDaily
);
router.get(
  "/get-monthly-chart-data",
  isAuthenticated,
  isAdmin,
  getInitiativeChartDataMonthly
);
router.get(
  "/get-daily-cloned-chart-data",
  isAuthenticated,
  isAdmin,
  getClonedInitiativeChartDataDaily
);
router.get(
  "/get-monthly-cloned-chart-data",
  isAuthenticated,
  isAdmin,
  getClonedInitiativeChartDataMonthly
);
router.put("/pin-initiative", isAuthenticated, isAdmin, pinInitiative);
router.put("/unpin-initiative", isAuthenticated, isAdmin, unpinInitiative);
router.put("/loved-initiative", isAuthenticated, isAdmin, lovedInitiative);
router.put("/unloved-initiative", isAuthenticated, isAdmin, unlovedInitiative);

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
  imageUploadValidator,
  initiativeValidator,
  createInitiative
);

router.post(
  "/create-draft-initiative",
  isAuthenticated,
  upload.array("thumbnail"),
  draftImageUploadValidator,
  draftInitiativeValidator,
  createDraftInitiative
);

router.put(
  "/edit-initiative/:initiativeId",
  isAuthenticated,
  upload.array("thumbnail"),
  imageUploadValidator,
  initiativeValidator,
  editInitiative
);
router.put(
  "/edit-darft-initiative/:initiativeId",
  isAuthenticated,
  upload.array("thumbnail"),
  draftImageUploadValidator,
  draftInitiativeValidator,
  editInitiative
);

// Admin routes
router.put(
  "/edit-initiative-by-admin/:initiativeId",
  isAuthenticated,
  isAdmin,
  upload.array("thumbnail"),
  imageUploadValidator,
  initiativeValidator,
  editInitiativeByAdmin
);
router.delete(
  "/delete/:initiativeId",
  isAuthenticated,
  isAdmin,
  deleteInitiative
);

module.exports = router;
