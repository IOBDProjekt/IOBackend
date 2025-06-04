const express = require("express");
const router = express.Router();

const { addAdvice, updateAdvice, getAdvices, getAdvice } = require("../controllers/adviceController");
const { authenticate, authorizeRole } = require("../middleware/authenticate");
const { validate } = require("../middleware/validate.js");

router
    .get("/", getAdvices)
    .get("/:id", getAdvice)
    .post("/", authenticate, authorizeRole("shelter"),  validate("advice"),  addAdvice)
    .put("/:id", authenticate, authorizeRole("shelter"), updateAdvice)

module.exports = router;
