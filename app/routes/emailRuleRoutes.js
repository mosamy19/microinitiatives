const router = require("express").Router();
const isAuthenticated = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/admin");
const {
  createRule,
  getRules,
  editRule,
  deleteRule,
  getSingleRule,
} = require("../controllers/emailRuleController");

router.post("/create-rule", isAuthenticated, isAdmin, createRule);
router.get("/get-rules", isAuthenticated, isAdmin, getRules);
router.get("/get-single-rule/:ruleId", isAuthenticated, isAdmin, getSingleRule);
router.put("/edit-rule", isAuthenticated, isAdmin, editRule);
router.delete("/delete-rule/:ruleId", isAuthenticated, isAdmin, deleteRule);

module.exports = router;
