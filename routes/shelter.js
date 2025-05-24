const express = require("express");
const router = express.Router();

const {
    authenticate,
    authorizeRole,
} = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const { addShelter } = require("../controllers/shelterController.js");

router.post("/add", authorizeRole("admin"), validate("shelter"), addShelter);

module.exports = router;
