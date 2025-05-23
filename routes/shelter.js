const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authenticate.js");
const { validate } = require("../middleware/validate.js");
const { addShelter } = require("../controllers/shelterController.js");

router
    .post("/add",  addShelter)

module.exports = router;
