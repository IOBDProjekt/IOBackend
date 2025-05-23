const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validateLogin, validateShelter } = require("../middleware/validate.js");
const { test } = require("../controllers/petController.js");

router.get("/", test);

module.exports = router;
