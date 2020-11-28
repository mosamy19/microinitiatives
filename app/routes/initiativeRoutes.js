const upload = require("../middlewares/uploadMiddleware");
const {
  getAllInitiatives,
  createInitiative,
  getSingleInitiative,
  editInitiative,
  deleteInitiative,
} = require("../controllers/initiativeController");

const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");

router.get("/", isAuthenticated, getAllInitiatives);
router.get("/:initiativeId", isAuthenticated, getSingleInitiative);
router.post("/", isAuthenticated, upload.array("thumbnail"), createInitiative);
router.put("/:initiativeId", isAuthenticated, editInitiative);
router.delete("/:initiativeId", isAuthenticated, deleteInitiative);

module.exports = router;
