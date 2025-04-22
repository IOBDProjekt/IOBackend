const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authenticate.js");
const { validateLogin } = require("../middleware/validate.js");
const { login, info } = require("../controllers/shelterController.js");

router.post("/login", validateLogin, login).get("/info", authenticate, info);

module.exports = router;
