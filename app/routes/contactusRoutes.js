const { receiveEmail } = require("../controllers/contactusController");

const router = require("express").Router();

router.post('/receive-email', receiveEmail);

module.exports = router;
