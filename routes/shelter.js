const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authenticate.js");
const { validateLogin } = require("../middleware/validate.js");
const {
	login,
	info,
	listing,
	listings,
} = require("../controllers/shelterController.js");

router.post("/login", validateLogin, login).get("/info", authenticate, info);
router.post("/listing", listing).get("/listings", listings);

module.exports = router;
