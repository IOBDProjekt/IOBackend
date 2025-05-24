const express = require("express");
const router = express.Router();

const { addAdvice, updateAdvice } = require("../controllers/adviceController");
const { authenticate, authorizeRole } = require("../middleware/authenticate");
const { validate } = require("../middleware/validate.js");

router
    .post("/", authenticate, authorizeRole("shelter"),  validate("advice"),  addAdvice)
    .put("/:id", authenticate, authorizeRole("shelter"), updateAdvice)

module.exports = router;
